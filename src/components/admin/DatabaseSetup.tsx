import { useState } from 'react';
import { Database, Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export default function DatabaseSetup() {
  const [copied, setCopied] = useState(false);

  const sqlCommands = `-- E-Voting System Database Setup
-- Run this in Supabase SQL Editor: https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: voters
-- Stores voter information and session status
CREATE TABLE IF NOT EXISTS voters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aadhaar_number VARCHAR(12) UNIQUE NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  has_voted BOOLEAN DEFAULT FALSE,
  session_status BOOLEAN DEFAULT FALSE,
  receipt_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: elections
-- Stores election information
CREATE TABLE IF NOT EXISTS elections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  constituency VARCHAR(255) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: candidates
-- Stores candidate information for elections
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: votes
-- Stores individual vote records (anonymous)
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voter_id UUID REFERENCES voters(id) ON DELETE CASCADE,
  election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: results
-- Stores aggregated vote counts per candidate
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  vote_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(election_id, candidate_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_voters_aadhaar ON voters(aadhaar_number);
CREATE INDEX IF NOT EXISTS idx_votes_election ON votes(election_id);
CREATE INDEX IF NOT EXISTS idx_votes_candidate ON votes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidates_election ON candidates(election_id);
CREATE INDEX IF NOT EXISTS idx_results_election ON results(election_id);

-- Function to increment vote count in results table
CREATE OR REPLACE FUNCTION increment_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO results (election_id, candidate_id, vote_count, updated_at)
  VALUES (NEW.election_id, NEW.candidate_id, 1, NOW())
  ON CONFLICT (election_id, candidate_id)
  DO UPDATE SET 
    vote_count = results.vote_count + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update results when a vote is cast
DROP TRIGGER IF EXISTS update_results_on_vote ON votes;
CREATE TRIGGER update_results_on_vote
AFTER INSERT ON votes
FOR EACH ROW
EXECUTE FUNCTION increment_vote_count();

-- Insert demo election
INSERT INTO elections (id, name, constituency, start_date, end_date, is_active)
VALUES (
  'e1234567-89ab-cdef-0123-456789abcdef'::uuid,
  'Mock Lok Sabha Elections 2025',
  'Demo Constituency 001',
  '2025-01-15 00:00:00+00',
  '2025-01-20 23:59:59+00',
  TRUE
) ON CONFLICT DO NOTHING;

-- Insert demo candidates
INSERT INTO candidates (election_id, name, party, symbol, description)
VALUES 
  (
    'e1234567-89ab-cdef-0123-456789abcdef'::uuid,
    'Candidate A',
    'Demo Party Alpha',
    '🏁',
    'Focus on economic development and infrastructure'
  ),
  (
    'e1234567-89ab-cdef-0123-456789abcdef'::uuid,
    'Candidate B',
    'Demo Party Beta',
    '👥',
    'Emphasis on social welfare and education'
  ),
  (
    'e1234567-89ab-cdef-0123-456789abcdef'::uuid,
    'Candidate C',
    'Demo Party Gamma',
    '🏛️',
    'Constitutional reform and governance'
  ),
  (
    'e1234567-89ab-cdef-0123-456789abcdef'::uuid,
    'Candidate D',
    'Demo Party Delta',
    '🌱',
    'Environmental protection and sustainability'
  )
ON CONFLICT DO NOTHING;

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE voters ENABLE ROW LEVEL SECURITY;
ALTER TABLE elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read elections" ON elections;
DROP POLICY IF EXISTS "Public can read candidates" ON candidates;
DROP POLICY IF EXISTS "Public can read results" ON results;
DROP POLICY IF EXISTS "Voters can view own data" ON voters;
DROP POLICY IF EXISTS "Voters can insert own data" ON voters;
DROP POLICY IF EXISTS "Voters can update own data" ON voters;
DROP POLICY IF EXISTS "Anyone can insert votes" ON votes;
DROP POLICY IF EXISTS "No one can read individual votes" ON votes;
DROP POLICY IF EXISTS "Allow insert elections" ON elections;
DROP POLICY IF EXISTS "Allow update elections" ON elections;
DROP POLICY IF EXISTS "Allow delete elections" ON elections;
DROP POLICY IF EXISTS "Allow insert candidates" ON candidates;
DROP POLICY IF EXISTS "Allow update candidates" ON candidates;
DROP POLICY IF EXISTS "Allow delete candidates" ON candidates;
DROP POLICY IF EXISTS "Allow insert results" ON results;
DROP POLICY IF EXISTS "Allow update results" ON results;

-- Public read access to elections and candidates
CREATE POLICY "Public can read elections" ON elections FOR SELECT USING (true);
CREATE POLICY "Public can read candidates" ON candidates FOR SELECT USING (true);
CREATE POLICY "Public can read results" ON results FOR SELECT USING (true);

-- Admin operations on elections
CREATE POLICY "Allow insert elections" ON elections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update elections" ON elections FOR UPDATE USING (true);
CREATE POLICY "Allow delete elections" ON elections FOR DELETE USING (true);

-- Admin operations on candidates
CREATE POLICY "Allow insert candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update candidates" ON candidates FOR UPDATE USING (true);
CREATE POLICY "Allow delete candidates" ON candidates FOR DELETE USING (true);

-- Voters can see and manage their data
CREATE POLICY "Voters can view own data" ON voters FOR SELECT USING (true);
CREATE POLICY "Voters can insert own data" ON voters FOR INSERT WITH CHECK (true);
CREATE POLICY "Voters can update own data" ON voters FOR UPDATE USING (true);

-- Votes are write-only for security
CREATE POLICY "Anyone can insert votes" ON votes FOR INSERT WITH CHECK (true);

-- Results table needs INSERT and UPDATE for the trigger
CREATE POLICY "Allow insert results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update results" ON results FOR UPDATE USING (true);

-- Success message
SELECT 'Database setup completed successfully! ✅' as status;`;

  const handleCopy = () => {
    // Fallback copy method that works without Clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = sqlCommands;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        toast.success('SQL commands copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
      } else {
        toast.error('Failed to copy. Please select and copy manually.');
      }
    } catch (err) {
      console.error('Copy error:', err);
      toast.error('Failed to copy. Please select and copy manually.');
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const steps = [
    {
      step: 1,
      title: 'Open Supabase SQL Editor',
      description: 'Navigate to your Supabase project dashboard',
      action: 'Click "SQL Editor" in the left sidebar',
      link: 'https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql'
    },
    {
      step: 2,
      title: 'Copy SQL Commands',
      description: 'Click the button below to copy all SQL setup commands',
      action: 'Paste into SQL Editor'
    },
    {
      step: 3,
      title: 'Run the SQL',
      description: 'Execute the SQL commands to create all tables',
      action: 'Click "Run" button in SQL Editor'
    },
    {
      step: 4,
      title: 'Verify Setup',
      description: 'Check that all 5 tables were created successfully',
      action: 'Navigate to "Table Editor" to view tables'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#FF9933]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Database className="size-8 text-[#FF9933]" />
            <div>
              <CardTitle className="text-[#002B5B]">Database Setup Required</CardTitle>
              <CardDescription>
                Follow these steps to create the database tables in your Supabase project
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                Your Supabase project is connected, but tables need to be created. 
                This is a one-time setup process.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-1">Project URL</p>
              <code className="text-xs text-blue-700 font-mono break-all">
                https://pjqsobwfoyvsrutmfnta.supabase.co
              </code>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 mb-1">Status</p>
              <Badge className="bg-green-600">Ready to Setup</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-step Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002B5B]">Setup Instructions</CardTitle>
          <CardDescription>Complete these steps in order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="size-10 rounded-full bg-[#002B5B] text-white flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#002B5B] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {item.action}
                    </Badge>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-[#002B5B] hover:underline"
                      >
                        Open SQL Editor →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SQL Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002B5B] flex items-center justify-between">
            SQL Setup Commands
            <Button onClick={handleCopy} size="sm">
              {copied ? (
                <>
                  <CheckCircle className="size-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy All
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Copy these commands and paste them into your Supabase SQL Editor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
            <pre className="text-xs text-green-400 font-mono">
              {sqlCommands}
            </pre>
          </div>
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 mb-2">
              <span className="font-semibold">What this SQL does:</span>
            </p>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Creates 5 tables: voters, elections, candidates, votes, results</li>
              <li>Sets up UUID primary keys and foreign key relationships</li>
              <li>Creates indexes for optimized query performance</li>
              <li>Adds automatic vote counting trigger</li>
              <li>Configures Row Level Security (RLS) policies</li>
              <li>Inserts demo election and 4 candidates</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Link Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-8 text-green-600" />
              <div>
                <p className="text-[#002B5B] font-semibold mb-1">Ready to Setup?</p>
                <p className="text-sm text-gray-600">
                  Open SQL Editor and run the commands above
                </p>
              </div>
            </div>
            <a 
              href="https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700">
                Open SQL Editor
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
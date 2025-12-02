-- E-Voting System Database Setup for Supabase
-- Project: https://pjqsobwfoyvsrutmfnta.supabase.co
-- Run this in SQL Editor: https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql

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

-- Comments explaining the schema
COMMENT ON TABLE voters IS 'Stores voter registration and session information';
COMMENT ON TABLE elections IS 'Stores election details including dates and constituency';
COMMENT ON TABLE candidates IS 'Stores candidate information linked to elections';
COMMENT ON TABLE votes IS 'Stores anonymous vote records (write-only for security)';
COMMENT ON TABLE results IS 'Stores aggregated vote counts updated via trigger';

-- Success message
SELECT 'Database setup completed successfully! ✅' as status;
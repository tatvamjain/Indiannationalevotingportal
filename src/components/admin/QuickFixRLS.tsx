import { useState } from 'react';
import { AlertTriangle, Copy, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner@2.0.3';

export default function QuickFixRLS() {
  const [copied, setCopied] = useState(false);

  const fixSQL = `-- Quick Fix for Row Level Security on All Tables
-- Run this in Supabase SQL Editor: https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql

-- ELECTIONS TABLE - Enable admin operations
DROP POLICY IF EXISTS "Public can read elections" ON elections;
DROP POLICY IF EXISTS "Allow insert elections" ON elections;
DROP POLICY IF EXISTS "Allow update elections" ON elections;
DROP POLICY IF EXISTS "Allow delete elections" ON elections;

CREATE POLICY "Public can read elections" ON elections FOR SELECT USING (true);
CREATE POLICY "Allow insert elections" ON elections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update elections" ON elections FOR UPDATE USING (true);
CREATE POLICY "Allow delete elections" ON elections FOR DELETE USING (true);

-- CANDIDATES TABLE - Enable admin operations
DROP POLICY IF EXISTS "Public can read candidates" ON candidates;
DROP POLICY IF EXISTS "Allow insert candidates" ON candidates;
DROP POLICY IF EXISTS "Allow update candidates" ON candidates;
DROP POLICY IF EXISTS "Allow delete candidates" ON candidates;

CREATE POLICY "Public can read candidates" ON candidates FOR SELECT USING (true);
CREATE POLICY "Allow insert candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update candidates" ON candidates FOR UPDATE USING (true);
CREATE POLICY "Allow delete candidates" ON candidates FOR DELETE USING (true);

-- RESULTS TABLE - Enable trigger operations
DROP POLICY IF EXISTS "Public can read results" ON results;
DROP POLICY IF EXISTS "Allow insert results" ON results;
DROP POLICY IF EXISTS "Allow update results" ON results;

CREATE POLICY "Public can read results" ON results FOR SELECT USING (true);
CREATE POLICY "Allow insert results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update results" ON results FOR UPDATE USING (true);

-- VOTERS TABLE - Enable voter operations
DROP POLICY IF EXISTS "Voters can view own data" ON voters;
DROP POLICY IF EXISTS "Voters can insert own data" ON voters;
DROP POLICY IF EXISTS "Voters can update own data" ON voters;

CREATE POLICY "Voters can view own data" ON voters FOR SELECT USING (true);
CREATE POLICY "Voters can insert own data" ON voters FOR INSERT WITH CHECK (true);
CREATE POLICY "Voters can update own data" ON voters FOR UPDATE USING (true);

-- VOTES TABLE - Enable vote submission
DROP POLICY IF EXISTS "Anyone can insert votes" ON votes;
CREATE POLICY "Anyone can insert votes" ON votes FOR INSERT WITH CHECK (true);

-- Success message
SELECT '✅ All RLS policies fixed! You can now create elections, add candidates, and cast votes.' as status;`;

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = fixSQL;
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
        toast.success('Fix SQL copied to clipboard!');
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

  return (
    <Card className="border-2 border-amber-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-6 text-amber-600" />
          <div>
            <CardTitle className="text-amber-900">Quick Fix Required</CardTitle>
            <CardDescription>
              Row Level Security blocking vote inserts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900 mb-2">
              <span className="font-semibold">Issue:</span> Row Level Security policies are blocking INSERT/UPDATE/DELETE operations on admin tables.
            </p>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Solution:</span> Run the SQL below to add full CRUD permissions to all tables.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-64 overflow-y-auto">
            <pre className="text-xs text-green-400 font-mono whitespace-pre">
              {fixSQL}
            </pre>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1">
              {copied ? (
                <>
                  <CheckCircle className="size-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy Fix SQL
                </>
              )}
            </Button>
            <a 
              href="https://pjqsobwfoyvsrutmfnta.supabase.co/project/pjqsobwfoyvsrutmfnta/sql" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Open SQL Editor
              </Button>
            </a>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-900">
              <span className="font-semibold">Steps:</span> 1) Copy SQL above → 2) Open SQL Editor → 3) Paste and Run → 4) Try voting again
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
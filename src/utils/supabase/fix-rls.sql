-- Fix Row Level Security for Results Table
-- Run this in your Supabase SQL Editor to fix the voting error

-- Drop existing policies on results table
DROP POLICY IF EXISTS "Public can read results" ON results;
DROP POLICY IF EXISTS "Allow insert results" ON results;
DROP POLICY IF EXISTS "Allow update results" ON results;

-- Recreate policies with proper permissions
CREATE POLICY "Public can read results" 
ON results FOR SELECT 
USING (true);

CREATE POLICY "Allow insert results" 
ON results FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update results" 
ON results FOR UPDATE 
USING (true);

-- Also ensure votes table has proper policy
DROP POLICY IF EXISTS "Anyone can insert votes" ON votes;

CREATE POLICY "Anyone can insert votes" 
ON votes FOR INSERT 
WITH CHECK (true);

-- Success message
SELECT 'RLS policies updated successfully! ✅ You can now cast votes.' as status;

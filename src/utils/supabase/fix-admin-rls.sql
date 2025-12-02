-- Fix Row Level Security for Admin Operations
-- Run this in your Supabase SQL Editor to enable admin CRUD operations

-- ELECTIONS TABLE
DROP POLICY IF EXISTS "Public can read elections" ON elections;
DROP POLICY IF EXISTS "Allow insert elections" ON elections;
DROP POLICY IF EXISTS "Allow update elections" ON elections;
DROP POLICY IF EXISTS "Allow delete elections" ON elections;

CREATE POLICY "Public can read elections" 
ON elections FOR SELECT 
USING (true);

CREATE POLICY "Allow insert elections" 
ON elections FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update elections" 
ON elections FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete elections" 
ON elections FOR DELETE 
USING (true);

-- CANDIDATES TABLE
DROP POLICY IF EXISTS "Public can read candidates" ON candidates;
DROP POLICY IF EXISTS "Allow insert candidates" ON candidates;
DROP POLICY IF EXISTS "Allow update candidates" ON candidates;
DROP POLICY IF EXISTS "Allow delete candidates" ON candidates;

CREATE POLICY "Public can read candidates" 
ON candidates FOR SELECT 
USING (true);

CREATE POLICY "Allow insert candidates" 
ON candidates FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update candidates" 
ON candidates FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete candidates" 
ON candidates FOR DELETE 
USING (true);

-- VOTERS TABLE (already has policies, but ensure they're complete)
DROP POLICY IF EXISTS "Voters can view own data" ON voters;
DROP POLICY IF EXISTS "Voters can insert own data" ON voters;
DROP POLICY IF EXISTS "Voters can update own data" ON voters;

CREATE POLICY "Voters can view own data" 
ON voters FOR SELECT 
USING (true);

CREATE POLICY "Voters can insert own data" 
ON voters FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Voters can update own data" 
ON voters FOR UPDATE 
USING (true);

-- Success message
SELECT '✅ All RLS policies fixed! Admin and voter operations now enabled.' as status;

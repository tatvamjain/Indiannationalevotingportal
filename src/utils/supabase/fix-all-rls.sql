-- Comprehensive RLS Fix for All Tables
-- Run this in your Supabase SQL Editor at: https://supabase.com/dashboard/project/pjqsobwfoyvsrutmfnta/sql
-- This will fix "Failed to fetch" errors by allowing public access to all tables

-- ========================================
-- 1. VOTERS TABLE
-- ========================================
DROP POLICY IF EXISTS "Public can read voters" ON voters;
DROP POLICY IF EXISTS "Allow insert voters" ON voters;
DROP POLICY IF EXISTS "Allow update voters" ON voters;

CREATE POLICY "Public can read voters" 
ON voters FOR SELECT 
USING (true);

CREATE POLICY "Allow insert voters" 
ON voters FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update voters" 
ON voters FOR UPDATE 
USING (true);

-- ========================================
-- 2. ELECTIONS TABLE
-- ========================================
DROP POLICY IF EXISTS "Public can read elections" ON elections;
DROP POLICY IF EXISTS "Allow insert elections" ON elections;
DROP POLICY IF EXISTS "Allow update elections" ON elections;

CREATE POLICY "Public can read elections" 
ON elections FOR SELECT 
USING (true);

CREATE POLICY "Allow insert elections" 
ON elections FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update elections" 
ON elections FOR UPDATE 
USING (true);

-- ========================================
-- 3. CANDIDATES TABLE
-- ========================================
DROP POLICY IF EXISTS "Public can read candidates" ON candidates;
DROP POLICY IF EXISTS "Allow insert candidates" ON candidates;
DROP POLICY IF EXISTS "Allow update candidates" ON candidates;

CREATE POLICY "Public can read candidates" 
ON candidates FOR SELECT 
USING (true);

CREATE POLICY "Allow insert candidates" 
ON candidates FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update candidates" 
ON candidates FOR UPDATE 
USING (true);

-- ========================================
-- 4. VOTES TABLE
-- ========================================
DROP POLICY IF EXISTS "Public can read votes" ON votes;
DROP POLICY IF EXISTS "Allow insert votes" ON votes;
DROP POLICY IF EXISTS "Allow update votes" ON votes;

CREATE POLICY "Public can read votes" 
ON votes FOR SELECT 
USING (true);

CREATE POLICY "Allow insert votes" 
ON votes FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update votes" 
ON votes FOR UPDATE 
USING (true);

-- ========================================
-- 5. RESULTS TABLE
-- ========================================
DROP POLICY IF EXISTS "Public can read results" ON results;
DROP POLICY IF EXISTS "Allow insert results" ON results;
DROP POLICY IF EXISTS "Allow update results" ON results;

CREATE POLICY "Public can read results" 
ON results FOR SELECT 
USING (true);

CREATE POLICY "Allow insert results" 
ON results FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update results" 
ON results FOR UPDATE 
USING (true);

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
SELECT '✅ All RLS policies updated successfully! You can now use the e-Voting Portal.' as status;

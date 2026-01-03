-- Fix Row Level Security for Voters Table
-- Run this in your Supabase SQL Editor to fix the registration error

-- Drop existing policies on voters table
DROP POLICY IF EXISTS "Public can read voters" ON voters;
DROP POLICY IF EXISTS "Allow insert voters" ON voters;
DROP POLICY IF EXISTS "Allow update voters" ON voters;

-- Recreate policies with proper permissions
CREATE POLICY "Public can read voters" 
ON voters FOR SELECT 
USING (true);

CREATE POLICY "Allow insert voters" 
ON voters FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update voters" 
ON voters FOR UPDATE 
USING (true);

-- Success message
SELECT 'Voters RLS policies updated successfully! ✅ You can now register.' as status;

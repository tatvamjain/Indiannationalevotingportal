# Troubleshooting Guide - Indian National e-Voting Portal

## Common Errors and Solutions

### ❌ Error: "TypeError: Failed to fetch"

**What it means:** This error indicates that the Supabase database is rejecting requests due to Row Level Security (RLS) policies not being configured.

**How to fix:**

#### Step 1: Access Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/pjqsobwfoyvsrutmfnta/sql
2. Log in to your Supabase account

#### Step 2: Run RLS Fix SQL
1. Open the file `/utils/supabase/fix-all-rls.sql` in your code
2. Copy the entire contents
3. Paste it into the Supabase SQL Editor
4. Click the **"Run"** button (or press Ctrl+Enter)
5. Wait for the success message: "✅ All RLS policies updated successfully!"

#### Step 3: Test the Application
1. Refresh your e-Voting Portal
2. Try registering a new voter
3. The error should now be resolved

---

### ❌ Error: "permission denied for table voters"

**What it means:** Row Level Security is enabled but no policies allow public access.

**How to fix:** Follow the same steps as "Failed to fetch" above.

---

### ❌ Error: "Database connection error"

**Possible causes:**
1. Supabase project is paused (free tier)
2. Internet connection issue
3. Invalid Supabase credentials

**How to fix:**

1. **Check if project is active:**
   - Go to: https://supabase.com/dashboard/project/pjqsobwfoyvsrutmfnta
   - Look for "Project is paused" message
   - Click "Restore project" if paused

2. **Verify credentials:**
   - Check `/utils/supabase/info.tsx`
   - Ensure `projectId` and `publicAnonKey` are correct

3. **Check internet connection:**
   - Ensure you're connected to the internet
   - Try accessing supabase.com in a browser

---

### ❌ Error: "No active elections available"

**What it means:** No elections have been created in the database.

**How to fix:**

#### Option 1: Use Admin Portal (Recommended)
1. Navigate to `/admin` in the portal
2. Go to "Database Setup"
3. Click "Initialize All Tables"
4. Go to "Election Setup"
5. Create a new election
6. Add candidates to the election

#### Option 2: Manual SQL Insert
Run this SQL in Supabase SQL Editor:

```sql
-- Create a sample election
INSERT INTO elections (name, constituency, start_date, end_date, is_active)
VALUES ('Maharashtra Assembly 2024', 'Mumbai Central', NOW(), NOW() + INTERVAL '7 days', true);

-- Get the election ID (will be displayed in results)
-- Then insert candidates using that ID

INSERT INTO candidates (election_id, name, party, symbol, description)
VALUES 
  ('YOUR_ELECTION_ID', 'Rajesh Kumar', 'Indian National Congress', '✋', 'Experienced leader'),
  ('YOUR_ELECTION_ID', 'Priya Sharma', 'Bharatiya Janata Party', '🪷', 'Youth representative'),
  ('YOUR_ELECTION_ID', 'Mohammed Ali', 'Aam Aadmi Party', '🧹', 'Anti-corruption activist');
```

---

### ❌ Voice Voting: "Voice voting is not supported"

**What it means:** Your browser doesn't support the Web Speech API.

**How to fix:**

**Supported browsers:**
- ✅ Google Chrome (Desktop & Android)
- ✅ Microsoft Edge (Desktop)
- ✅ Safari (Desktop & iOS)
- ❌ Firefox (limited support)

**Solution:** Switch to Chrome, Edge, or Safari

---

### ❌ Voice Voting: "No speech detected"

**Possible causes:**
1. Microphone not connected
2. Microphone permissions denied
3. Background noise
4. Browser settings

**How to fix:**

1. **Check microphone:**
   - Ensure a microphone is connected
   - Test it in another app

2. **Grant permissions:**
   - Click the 🔒 icon in address bar
   - Allow microphone access
   - Reload the page

3. **Reduce background noise:**
   - Use in a quiet environment
   - Use headphones with microphone

4. **Browser settings:**
   - Chrome: Settings → Privacy → Site Settings → Microphone
   - Enable microphone for this site

---

### ❌ Error: "You have already cast your vote"

**What it means:** The global `has_voted` flag is set to true (this is a known limitation).

**How to fix:**

#### Temporary Fix (Demo purposes):
Run this SQL in Supabase to reset your vote status:

```sql
-- Reset a specific voter (replace with your Aadhaar)
UPDATE voters 
SET has_voted = false 
WHERE aadhaar_number = 'YOUR_AADHAAR_NUMBER';

-- Delete your previous votes
DELETE FROM votes 
WHERE voter_id = (SELECT id FROM voters WHERE aadhaar_number = 'YOUR_AADHAAR_NUMBER');
```

#### Permanent Fix:
The application needs to be updated to check `votes` table per election instead of global flag. This is documented in the background context.

---

## Database Setup Checklist

Use this checklist to ensure your database is properly configured:

- [ ] Supabase project is active (not paused)
- [ ] RLS policies are configured (`fix-all-rls.sql` executed)
- [ ] All 5 tables exist: `voters`, `elections`, `candidates`, `votes`, `results`
- [ ] At least one active election exists
- [ ] Election has candidates added
- [ ] Can register a new voter successfully
- [ ] Can view elections on dashboard

---

## Quick Setup Commands

### Complete Fresh Setup

Run these SQL commands in order in Supabase SQL Editor:

```sql
-- 1. Create all tables (if not exists)
-- See /utils/supabase/setup.sql

-- 2. Fix RLS policies
-- See /utils/supabase/fix-all-rls.sql

-- 3. Create sample data
INSERT INTO elections (name, constituency, start_date, end_date, is_active)
VALUES ('Demo Election 2024', 'Demo Constituency', NOW(), NOW() + INTERVAL '30 days', true)
RETURNING id;

-- Use the returned ID in next query
INSERT INTO candidates (election_id, name, party, symbol, description)
VALUES 
  ('PASTE_ELECTION_ID_HERE', 'Candidate One', 'Party A', '🔵', 'First candidate'),
  ('PASTE_ELECTION_ID_HERE', 'Candidate Two', 'Party B', '🔴', 'Second candidate'),
  ('PASTE_ELECTION_ID_HERE', 'Candidate Three', 'Party C', '🟢', 'Third candidate');
```

---

## Getting Help

### Console Logs
Always check browser console (F12) for detailed error messages. The application provides helpful debugging information.

### Key Log Patterns

**Success:**
```
✅ Found active election: {...}
✅ Found candidates: 3
📊 Loaded election: {...}
```

**RLS Error:**
```
❌ Error creating voter: {message: "Failed to fetch"}
💡 FIX: Run /utils/supabase/fix-all-rls.sql
```

**No Data:**
```
⚠️ No active election found
⚠️ No candidates found
```

---

## Developer Notes

### Important Files

- `/utils/supabase/setup.sql` - Creates all tables
- `/utils/supabase/fix-all-rls.sql` - Fixes permissions
- `/DATABASE_SETUP.md` - Complete setup guide
- `/components/admin/DatabaseSetup.tsx` - Admin UI for setup

### Common Development Issues

1. **Local Storage**: Session data is stored in `sessionStorage`, cleared on tab close
2. **RLS Policies**: Must allow public access for demo (not production-ready)
3. **Voice Voting**: Requires HTTPS in production
4. **Browser Cache**: Clear cache if seeing stale data

---

## Still Having Issues?

1. Check browser console (F12) for detailed errors
2. Verify Supabase project status
3. Ensure all SQL scripts have been run
4. Try clearing browser cache and cookies
5. Test in incognito/private browsing mode

---

**Last Updated:** December 24, 2024
**Portal Version:** 2.0 with Voice Voting

# Quick Start Guide - Indian National e-Voting Portal

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- ✅ Supabase account and project created
- ✅ Browser console open (Press F12) to see helpful messages
- ✅ Modern browser (Chrome, Edge, or Safari recommended)

---

## Step 1: Fix Database Permissions (REQUIRED)

If you see **"Failed to fetch"** or **"Authentication Denied"** errors:

### Quick Fix:
1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/pjqsobwfoyvsrutmfnta/sql

2. **Copy the RLS Fix SQL:**
   - Open file: `/utils/supabase/fix-all-rls.sql`
   - Copy all contents (104 lines)

3. **Run the SQL:**
   - Paste into Supabase SQL Editor
   - Click **"Run"** button
   - Wait for success message: "✅ All RLS policies updated successfully!"

4. **Refresh your portal**
   - The error should now be fixed

---

## Step 2: Create Sample Election (Optional)

### Option A: Using Admin Portal (Easiest)
1. Navigate to `/admin` in the portal
2. Click **"Database Setup"**
3. Click **"Initialize All Tables"**
4. Go to **"Election Setup"**
5. Fill in election details and click **"Create Election"**
6. Add candidates (minimum 2)

### Option B: Using SQL (Faster)
Run this in Supabase SQL Editor:

```sql
-- Create election
INSERT INTO elections (name, constituency, start_date, end_date, is_active)
VALUES ('Demo Election 2024', 'Demo Constituency', NOW(), NOW() + INTERVAL '30 days', true)
RETURNING id;

-- Copy the returned ID, then run (replace YOUR_ELECTION_ID):
INSERT INTO candidates (election_id, name, party, symbol, description)
VALUES 
  ('YOUR_ELECTION_ID', 'Rajesh Kumar', 'Indian National Congress', '✋', 'Experienced leader'),
  ('YOUR_ELECTION_ID', 'Priya Sharma', 'Bharatiya Janata Party', '🪷', 'Youth representative'),
  ('YOUR_ELECTION_ID', 'Mohammed Ali', 'Aam Aadmi Party', '🧹', 'Anti-corruption activist');
```

---

## Step 3: Test the System

### Register as a Voter:
1. Go to `/register`
2. Enter any demo Aadhaar (12 digits): `123456789012`
3. Enter name: `Test Voter`
4. Enter phone (10 digits): `9876543210`
5. Click **"Register Now"**
6. Enter OTP: `123456` (any 6 digits work in demo)
7. You should see "Authentication Granted" ✅

### Cast a Vote:
1. On the dashboard, click **"Proceed to Vote"**
2. You'll see the ballot with candidates
3. **Try Voice Voting** (optional):
   - Click "Start Voice Voting"
   - Say "One" or "Two" to select a candidate
   - Say "Confirm" to confirm
4. Or click a candidate manually
5. Click **"Cast Vote"**
6. Download your receipt

### View Results:
1. Click **"Results"** in header
2. Select your election from dropdown
3. See live vote counts

---

## 🎤 Voice Voting Quick Test

### Requirements:
- ✅ Chrome, Edge, or Safari browser
- ✅ Microphone connected
- ✅ Microphone permissions granted

### Test Commands:
1. On ballot page, click **"Start Voice Voting"**
2. Wait for the system to read candidates
3. Try saying:
   - "One" or "Two" (to select)
   - "Confirm" (to confirm selection)
   - "Help" (for instructions)
   - "Cancel" (to stop)

### Supported Languages:
- English: "One", "Two", "Three", "Confirm"
- Hindi: "एक", "दो", "तीन", "पुष्टि करें"
- Tamil: "ஒன்று", "இரண்டு", "மூன்று", "உறுதிப்படுத்து"
- Telugu: "ఒకటి", "రెండు", "మూడు", "నిర్ధారించు"
- Bengali: "এক", "দুই", "তিন", "নিশ্চিত করুন"

---

## 🔧 Common Issues

### ❌ "Failed to fetch"
**Solution:** Run `/utils/supabase/fix-all-rls.sql` (See Step 1 above)

### ❌ "No active elections"
**Solution:** Create an election (See Step 2 above)

### ❌ "Voice voting not supported"
**Solution:** Use Chrome, Edge, or Safari browser

### ❌ "No speech detected"
**Solution:** Grant microphone permissions in browser settings

---

## 📚 Documentation Files

- **`/DATABASE_SETUP.md`** - Complete database setup guide
- **`/TROUBLESHOOTING.md`** - Detailed error solutions
- **`/VOICE_VOTING_GUIDE.md`** - Voice voting feature guide
- **`/QUICK_START.md`** - This file

---

## ✅ Setup Checklist

Use this to verify your setup:

- [ ] Supabase project is active (not paused)
- [ ] RLS policies configured (`fix-all-rls.sql` executed)
- [ ] Can access Supabase dashboard
- [ ] All 5 tables exist in database
- [ ] At least one active election created
- [ ] Election has 2+ candidates
- [ ] Can register a new voter
- [ ] Can login with OTP
- [ ] Can view dashboard
- [ ] Can cast a vote
- [ ] Can view results
- [ ] Voice voting works (optional)

---

## 🎯 Feature Overview

### Core Features:
- ✅ Aadhaar-based registration
- ✅ OTP verification (demo mode)
- ✅ Electronic ballot
- ✅ Vote confirmation receipts
- ✅ Real-time results
- ✅ Admin portal for setup
- ✅ **NEW: Voice voting in 5 languages**

### Multilingual Support:
- 🇮🇳 English
- 🇮🇳 हिंदी (Hindi)
- 🇮🇳 தமிழ் (Tamil)
- 🇮🇳 తెలుగు (Telugu)
- 🇮🇳 বাংলা (Bengali)

### Security Features:
- One vote per Aadhaar
- Session-based authentication
- Receipt verification
- Audit trail in database

---

## 🎥 Demo Flow

**Complete voting flow (2 minutes):**
1. Register → 2. Verify OTP → 3. Dashboard → 4. Vote → 5. Receipt → 6. Results

**Voice voting flow (3 minutes):**
1. Navigate to ballot → 2. Start voice voting → 3. Listen to candidates → 4. Say candidate number → 5. Confirm → 6. Cast vote

---

## 🆘 Need Help?

### Console Messages
The app provides helpful debug messages in console (F12):
- ✅ Green checkmarks = Success
- ⚠️ Yellow warnings = Caution
- ❌ Red errors = Problem + solution

### Getting Support
1. Check console for specific error
2. Review `/TROUBLESHOOTING.md`
3. Verify setup checklist above
4. Check Supabase project status

---

## 🎓 Educational Purpose Disclaimer

This is a **demonstration e-Voting Portal** for educational purposes only:
- ❌ Not affiliated with UIDAI or Election Commission of India
- ❌ Not for use in real elections
- ❌ Not production-ready (uses simplified security)
- ✅ For learning and demonstration only
- ✅ Shows e-voting concepts and UX

---

## 🚀 Ready to Go!

If you've completed Step 1 (RLS fix), you're ready to use the portal!

**Start here:** `/register`

**Quick test account:**
- Aadhaar: `123456789012`
- Phone: `9876543210`
- OTP: `123456`

Enjoy exploring the Indian National e-Voting Portal with Voice Voting! 🗳️🎤

---

**Version:** 2.0 with Voice Voting  
**Last Updated:** December 24, 2024  
**Features:** Complete voting flow + Voice assistance in 5 languages

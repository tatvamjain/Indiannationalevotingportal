# 🗄️ Database Setup Instructions

## ⚠️ IMPORTANT: Fix "Failed to fetch" Error

If you're seeing **"Failed to fetch"** errors when trying to register or vote, it means the **Row Level Security (RLS)** policies need to be configured in your Supabase database.

---

## 🚀 Quick Fix (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/pjqsobwfoyvsrutmfnta/sql
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Step 2: Run the Fix Script

1. Open the file `/utils/supabase/fix-all-rls.sql` in this project
2. Copy the ENTIRE contents of that file
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** button
5. You should see: ✅ "All RLS policies updated successfully!"

### Step 3: Test the Application

1. Refresh your e-Voting Portal application
2. Try registering a new voter
3. The "Failed to fetch" error should now be gone! 🎉

---

## 📋 What This Fixes

The RLS fix script enables **public access** to all required tables:

| Table | Permissions Enabled |
|-------|-------------------|
| `voters` | SELECT, INSERT, UPDATE |
| `elections` | SELECT, INSERT, UPDATE |
| `candidates` | SELECT, INSERT, UPDATE |
| `votes` | SELECT, INSERT, UPDATE |
| `results` | SELECT, INSERT, UPDATE |

---

## 🔍 Troubleshooting

### Error: "relation does not exist"
**Solution:** You need to run the main setup script first:
1. Open `/utils/supabase/setup.sql`
2. Run it in the Supabase SQL Editor
3. Then run `/utils/supabase/fix-all-rls.sql`

### Error: "permission denied for table"
**Solution:** Run the RLS fix again:
```sql
-- Run this in Supabase SQL Editor
\i /utils/supabase/fix-all-rls.sql
```

### Still Getting "Failed to fetch"?
**Check:**
1. ✅ Supabase project ID matches: `pjqsobwfoyvsrutmfnta`
2. ✅ All SQL scripts ran successfully without errors
3. ✅ Browser console shows detailed error (press F12)
4. ✅ Network tab shows 403/401 errors (indicates RLS issue)

---

## 📊 Database Schema

The application uses 5 main tables:

```
voters
├─ id (uuid, primary key)
├─ aadhaar_number (text, unique)
├─ phone_number (text)
├─ has_voted (boolean) ← Global voting flag
├─ session_status (boolean)
├─ receipt_id (text)
└─ created_at (timestamp)

elections
├─ id (uuid, primary key)
├─ name (text)
├─ constituency (text)
├─ start_date (date)
├─ end_date (date)
├─ is_active (boolean)
└─ created_at (timestamp)

candidates
├─ id (uuid, primary key)
├─ election_id (uuid, foreign key)
├─ name (text)
├─ party (text)
├─ symbol (text)
├─ description (text)
└─ created_at (timestamp)

votes
├─ id (uuid, primary key)
├─ voter_id (uuid, foreign key)
├─ election_id (uuid, foreign key)
├─ candidate_id (uuid, foreign key)
└─ timestamp (timestamp)

results
├─ id (uuid, primary key)
├─ election_id (uuid, foreign key)
├─ candidate_id (uuid, foreign key)
├─ vote_count (integer)
└─ updated_at (timestamp)
```

---

## 🎯 System Features

### ✅ One Vote Per Aadhaar
- **Global enforcement**: `voters.has_voted` flag
- **Database validation**: Checked before ballot access
- **Receipt tracking**: Unique receipt ID stored

### ✅ Real-time Updates
- Dashboard auto-refreshes after voting
- Status badge updates immediately
- Receipt displayed in sidebar

### ✅ Security
- Row Level Security (RLS) enabled
- Public access for demo purposes
- Session-based authentication

---

## 📞 Need Help?

1. Check browser console (F12) for detailed errors
2. Verify Supabase SQL Editor shows no errors
3. Ensure all migration scripts ran successfully
4. Check Network tab for API response codes

**Common Error Codes:**
- `403 Forbidden` → RLS policy blocking access
- `401 Unauthorized` → Authentication issue
- `404 Not Found` → Table doesn't exist
- `500 Internal Server Error` → Server/database error

---

## ✨ Success Checklist

- [ ] Supabase project created
- [ ] `/utils/supabase/setup.sql` executed successfully
- [ ] `/utils/supabase/fix-all-rls.sql` executed successfully  
- [ ] Registration works without "Failed to fetch" error
- [ ] Login/OTP verification works
- [ ] Voting flow completes successfully
- [ ] Dashboard shows updated voting status
- [ ] Receipt is generated and displayed

**Once all checkboxes are complete, your e-Voting Portal is ready!** 🚀🎉

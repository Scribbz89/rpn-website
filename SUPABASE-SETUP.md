# Supabase Setup — RPN Beta Signups

## 1. Create a free Supabase account
Go to https://supabase.com and sign up. Create a new project.

## 2. Run this SQL in the Supabase SQL Editor
(Dashboard → SQL Editor → New Query — paste and run)

```sql
CREATE TABLE beta_signups (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name            text,
  email           text        UNIQUE NOT NULL,
  token           uuid        DEFAULT gen_random_uuid() UNIQUE NOT NULL,
  signed_up_at    timestamptz DEFAULT now(),
  download_count  integer     DEFAULT 0,
  last_downloaded_at timestamptz,
  ip_address      text,
  notified_v1     boolean     DEFAULT false,
  notified_update boolean     DEFAULT false
);

ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert"  ON beta_signups FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "allow_select"  ON beta_signups FOR SELECT TO anon USING (true);
CREATE POLICY "allow_update"  ON beta_signups FOR UPDATE TO anon USING (true);
```

## 3. Get your API keys
Go to Project Settings → API

- **Project URL** — looks like: https://abcdefgh.supabase.co
- **anon/public key** — long string starting with "eyJ..."
- **service_role key** — a different long string (keep this secret)

## 4. Fill in the config in each page

**beta.html** and **download.html** — paste your Project URL and anon key:
```js
const SUPABASE_URL  = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON = 'eyJ...your anon key...';
```

**admin-beta.html** — paste your Project URL and service_role key:
```js
const SUPABASE_URL         = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJ...your service_role key...';
```

Also change the admin password in admin-beta.html:
```js
const ADMIN_PASSWORD = 'YourNewPasswordHere';
```

## 5. Push to GitHub — done.

---

## Future: emailing beta testers
The `notified_v1` and `notified_update` columns are there for future email campaigns.
When you're ready to email all testers, export the CSV from admin-beta.html
and import into Mailchimp, Resend, or any email platform.

Or connect Supabase to Resend/Postmark via Edge Functions for automated emails.

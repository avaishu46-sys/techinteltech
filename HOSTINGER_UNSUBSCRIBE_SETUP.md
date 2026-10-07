# Connect newsletter and unsubscribe pages to Hostinger MySQL

The contact form posts to `/api/contact.php`, which verifies reCAPTCHA and
saves messages in `contact_queries`. The newsletter form posts email addresses
to `/api/subscribe.php` and inserts new addresses into `subscribers`. The
unsubscribe page posts to `/api/unsubscribe.php`.

## Test from the local development website

The local Vite website runs on a different origin from Hostinger. For local
testing only, `.env.development.local` points the frontend at the Hostinger API endpoint,
and the PHP endpoint allows the local Vite origins
`http://localhost:5173` and `http://127.0.0.1:5173`.

After changing `.env.development.local`, restart the Vite dev server. Test with a mailbox
you control, then verify the row in phpMyAdmin. The request will insert the
email into the Hostinger database even though the React website is still local.

When the frontend is deployed on the same Hostinger domain, remove
`VITE_UNSUBSCRIBE_API_URL` from the production environment so the default
same-domain `/api/unsubscribe.php` URL is used.

## Add the private database config

In Hostinger File Manager, preferably create `private` beside `public_html`.
The endpoint also supports `public_html/private/techintel-config.php` if that
is where you already uploaded the file. Add `techintel-config.php` there with
the following contents, replacing the values with the database credentials
from hPanel:

```php
<?php
return [
    'host' => 'localhost',
    'database' => 'YOUR_DATABASE_NAME',
    'username' => 'YOUR_DATABASE_USER',
    'password' => 'YOUR_DATABASE_PASSWORD',
];
```

Keep this file private and do not put database credentials in React code or
Vite environment variables. If the config is inside `public_html`, keep the
`hostinger/private/.htaccess` file uploaded into the `private` directory to
block web access, or move the config outside `public_html`.

## Upload the endpoint

Upload the contents of `hostinger/api/` into `public_html/api/`. The resulting
files should include:

```text
public_html/api/.htaccess
public_html/api/contact.php
public_html/api/subscribe.php
public_html/api/unsubscribe.php
```

Do not put `techintel-config.php` or other private config files in `public_html/api/`.
Keep the database config in `public_html/private/` (protected by `.htaccess`)
or outside `public_html`.

The expected account layout is:

```text
account/
└── public_html/
    ├── private/techintel-config.php
    ├── private/recaptcha-config.php
    ├── private/.htaccess
    ├── index.html
    └── api/
        ├── contact.php
        ├── subscribe.php
        └── unsubscribe.php
```

The contact endpoint uses the existing `contact_queries` table with columns
`first_name`, `last_name`, `email`, `company_name`, `phone`, `message`,
`ip_address`, and `created_at`, matching the schema provided. Upload
`contact.php` and the updated `.htaccess` from `hostinger/api/`.

For local contact-form testing, set
`VITE_CONTACT_API_URL=https://techintel.tech/api/contact.php` in
`.env.development.local` and restart Vite. The endpoint only reports success
after reCAPTCHA verification and insertion into `contact_queries`.

The safer layout puts `private/techintel-config.php` beside `public_html`
instead of inside it.

Build the site with `npm run build` and upload the contents of `dist/` to
`public_html/`. Use HTTPS, then submit a test unsubscribe request and check
phpMyAdmin's `Unsubscribe` table for the new email.

This endpoint records unsubscribe requests only. It does not remove addresses
from any separate newsletter or email-marketing platform.

## Newsletter subscriber table

The subscribe endpoint uses the existing `subscribers` table with the
`email`, `ip_address`, and `created_at` columns shown in your phpMyAdmin
structure. The endpoint checks for a `cadence` column and saves the
weekly/monthly choice only if that optional column exists. The database config
above is shared with both endpoints.

If you want to save the weekly/monthly choice, optionally add a cadence column
in phpMyAdmin:

```sql
ALTER TABLE `subscribers`
ADD COLUMN `cadence` ENUM('weekly', 'monthly') NOT NULL DEFAULT 'weekly'
AFTER `email`;
```

To reliably prevent duplicate email addresses (including simultaneous
requests), ensure `email` has a unique index in phpMyAdmin's **Structure**
tab. First check for existing duplicates; remove or merge any duplicates
before adding the index. Then run:

```sql
ALTER TABLE `subscribers`
ADD UNIQUE KEY `uq_subscribers_email` (`email`);
```

If phpMyAdmin reports that the index already exists, no change is needed.
For local Vite testing, add
`VITE_NEWSLETTER_API_URL=https://techintel.tech/api/subscribe.php` to
`.env.development.local` and restart Vite. The API allows local development
origins and the TechIntel domain. Test with a mailbox you control, then check
the `subscribers` table in phpMyAdmin. New and existing subscriptions show
different popups.

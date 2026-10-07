# Google reCAPTCHA v2 setup

The contact page uses Google's official reCAPTCHA v2 checkbox. The browser
site key is public; the secret key must stay on the server. The contact
endpoint verifies the CAPTCHA and saves messages to the `contact_queries`
MySQL table.

## Create the keys

1. Register the website in the Google reCAPTCHA Admin Console.
2. Choose **reCAPTCHA v2** and **"I'm not a robot" Checkbox**.
3. Add every production hostname, plus `localhost` and `127.0.0.1` if you will
   test locally.
4. Copy the site key and secret key.

## Configure the frontend

The supplied public site key is configured as the frontend fallback. You can
override it with `VITE_RECAPTCHA_SITE_KEY` before building if you rotate the
key. The secret-key config has been created locally at
`hostinger/private/recaptcha-config.php`; it is ignored by Git and must be
uploaded separately to a private server directory. `VITE_CONTACT_API_URL`
defaults to `/api/contact.php`; set it to the full HTTPS endpoint URL for
local development when the PHP API is hosted on Hostinger.

Vite embeds the public site key in the built JavaScript. Never put the secret
key in a `VITE_` variable or any frontend file.

## Configure the Hostinger endpoint

Upload `hostinger/api/contact.php` to `public_html/api/`. If you need to
replace the secret, edit the local `hostinger/private/recaptcha-config.php`.
Upload that file to a private directory outside `public_html` (or to
`public_html/private/`, with `hostinger/private/.htaccess` uploaded to deny
web access):

```php
<?php
return [
    'secret' => 'YOUR_GOOGLE_RECAPTCHA_SECRET_KEY',
    'allowed_origins' => [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    'allowed_hosts' => [
        'yourdomain.com',
        'www.yourdomain.com',
        'localhost',
        '127.0.0.1',
    ],
];
```

Replace the example domains with the actual origins and hostnames. Origins
include the scheme and, for local development, the port; hostnames do not.
Keep the secret config file out of source control and ensure PHP cURL is
enabled on the hosting account.

For local development, set the endpoint's full URL in `.env.development.local`
as `VITE_CONTACT_API_URL`, ensure the local Vite origins are in
`allowed_origins`, and restart Vite. Never commit `.env.development.local`.

The endpoint also reads `techintel-config.php` from the private directory for
its MySQL credentials. It inserts into the existing `contact_queries` table
using `first_name`, `last_name`, `email`, `company_name`, `phone`, `message`,
`ip_address`, and `created_at`. Optional company and phone inputs are stored
as empty strings.

Build and deploy the frontend with the configured site key and upload the PHP
endpoint. The form displays success only after CAPTCHA verification and
database insertion both succeed.

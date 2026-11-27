# www.lambda-cro.com/CDMOtest: how the test site runs and how to deploy

Address: **https://www.lambda-cro.com/CDMOtest** (admin: `/CDMOtest/admin`, `/CDMOtest/admin/login` redirects there).
The earlier address cdmotest.lambda-cro.com is retired: its folder only redirects to the new address.

Server: Ubuntu 24.04, Apache 2 (with PHP 8.3 and mod_rewrite; no proxy module), Node 20, pm2. Sucuri (firewall/CDN)
sits in front of www.lambda-cro.com. Account `anronix` (no sudo), home folder `/var/www/cdmotest.lambda-cro.com`.
We log in with the deploy key `~/.ssh/lambda_cdmo_deploy` (SSH and SFTP); no password is needed.

## How it works

```
Browser ──https──> Sucuri ──> Apache (www.lambda-cro.com, DocumentRoot /var/www/lambda-cro.com = WordPress)
                               │  WordPress's rules skip existing folders, so /CDMOtest is ours:
                               │  /var/www/lambda-cro.com/CDMOtest/.htaccess
                               ├─ /CDMOtest/virtualtour/...  → files on disk (CDMOtest/virtualtour/)
                               └─ everything else            → __node_bridge.php ──http──> Node app on 127.0.0.1:3107 (pm2)
```

```
/var/www/lambda-cro.com/CDMOtest/          public entry (inside the main site's folder; nothing else there is ours)
├── .htaccess            routing above; hidden files 404; bare /CDMOtest handed to the bridge (ErrorDocument 403)
├── __node_bridge.php    passes requests to the app (Apache's proxy module is not enabled here); trusts Sucuri's
│                        X-Sucuri-ClientIP / X-Forwarded-Proto for the visitor's IP and https
└── virtualtour/         the virtual tour (static files)

/var/www/cdmotest.lambda-cro.com/          the account's home (not served: its .htaccess redirects to the new address)
├── .htaccess            301 to https://www.lambda-cro.com/CDMOtest
├── app/                 the website (Next.js standalone build, basePath /CDMOtest), pm2 process "lambda-cdmotest"
│   ├── server.js
│   ├── start.cjs              loads .env.production, then starts server.js
│   ├── ecosystem.config.cjs   pm2 config (port 3107, restarts when restart.txt changes)
│   ├── .env.production        ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET (chmod 600)
│   ├── src/data/stored*.json  CMS content, edited through /CDMOtest/admin on this server
│   └── public/uploads/        files uploaded through the admin on this server
├── app.prev/            the previous release (after a deploy), for rollback
├── app.lambdaadmin-backup/  the app folder as the server account "lambdaadmin" left it on 26 Nov (it no longer
│                        started); kept in case they need it, owned by lambdaadmin, we cannot delete it
└── .pm2/                pm2's own files and logs
```

- The package is built with `NEXT_BASE_PATH=/CDMOtest`. Next.js prefixes page links, redirects and `/_next`;
  everything else (images, videos, fetch calls, plain links) goes through `withBase()` in `src/lib/basePath.ts`,
  and the build script prefixes `url(/...)` in the built CSS. CMS content keeps plain `/images/...` paths.
  Local development and Render are unaffected (no base path there).
- Virtual Tour links go to `/CDMOtest/virtualtour/...` (built with `VIRTUAL_TOUR_URL=/virtualtour`).
- After a server reboot, the account's crontab (`@reboot pm2 resurrect`) starts the site again.
- Sources in this repository: `server/cdmotest-subfolder/` (public entry), `server/cdmotest/.htaccess` (redirect).

## Deploying an update

```bash
node scripts/build_server_package.mjs   # builds deploy/server-package (about 370 MB, mostly images)
node scripts/deploy_cdmotest.mjs        # uploads it as one archive, swaps it in, restarts, checks
```

The deploy keeps the server's own CMS content (`src/data/stored*.json`), admin uploads (`public/uploads/`) and
`.env.production`, so edits made in this server's admin are never overwritten. Content changed locally does
NOT reach the server this way; change it in the server's admin instead.

Rollback (one step):

```bash
ssh -i ~/.ssh/lambda_cdmo_deploy anronix@68.178.172.196
cd ~ && mv app app.bad && mv app.prev app && pm2 restart lambda-cdmotest
```

The virtual tour is not part of a deploy; re-upload `CDMOtest/virtualtour/` only when the tour itself changes.

## Admin sign-in

`app/.env.production` holds the admin user name and password (and the key that signs session cookies); our local
copy is the git-ignored `deploy/cdmotest.env.production`. To change the password: edit the file on the server
(readable by `anronix` only), then `pm2 restart lambda-cdmotest`. Everyone is signed out when the password changes.

## Useful commands (over SSH)

```bash
pm2 ls                                              # status
pm2 logs lambda-cdmotest --lines 50 --nostream      # recent logs
pm2 restart lambda-cdmotest                         # restart
curl -sI http://127.0.0.1:3107/CDMOtest | head -1   # the app itself
```

## Optional: faster setup with Apache's proxy module (needs root, server team)

The PHP bridge works, but Apache's own reverse proxy is faster (no PHP process per request, streaming responses).
If the server team runs `sudo a2enmod proxy proxy_http headers`, adds this inside the www.lambda-cro.com `*:443`
VirtualHost and reloads Apache, `__node_bridge.php` and the bridge rules in `CDMOtest/.htaccess` can go:

```apache
ProxyRequests Off
ProxyPreserveHost On
RequestHeader set X-Forwarded-Proto "https"
ProxyPass /CDMOtest/virtualtour !
ProxyPass /CDMOtest http://127.0.0.1:3107/CDMOtest timeout=120
ProxyPassReverse /CDMOtest http://127.0.0.1:3107/CDMOtest
```

# cdmotest.lambda-cro.com: how the site runs and how to deploy

Server: Ubuntu 24.04, Apache 2 (with PHP 8.3 and mod_rewrite; no proxy module), Node 20, pm2.
Account `anronix` (no sudo). Its home folder is the site folder `/var/www/cdmotest.lambda-cro.com`, which is also
Apache's DocumentRoot for the site. We log in with the deploy key `~/.ssh/lambda_cdmo_deploy` (SSH and SFTP);
no password is needed.

## How it works

```
Browser ──https──> Apache (vhost cdmotest.lambda-cro.com, DocumentRoot = site folder)
                     │  .htaccess
                     ├─ /virtualtour/...  → files on disk (virtualtour/)
                     └─ everything else   → __node_bridge.php ──http──> Node app on 127.0.0.1:3107 (pm2)
```

```
/var/www/cdmotest.lambda-cro.com/
├── .htaccess            routing above; hides app/ and hidden files; HTTP -> HTTPS
├── __node_bridge.php    passes requests to the app (Apache's proxy module is not enabled here)
├── app/                 the website (Next.js standalone build), pm2 process "lambda-cdmotest"
│   ├── server.js
│   ├── start.cjs              loads .env.production, then starts server.js
│   ├── ecosystem.config.cjs   pm2 config (port 3107, restarts when restart.txt changes)
│   ├── .env.production        ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET (chmod 600)
│   ├── src/data/stored*.json  CMS content, edited through /admin on this server
│   └── public/uploads/        files uploaded through /admin on this server
├── app.prev/            the previous release (after a deploy), for rollback
├── virtualtour/         the virtual tour (static files)
├── .pm2/                pm2's own files and logs
└── index.html, .cache   were there before; unused, left alone
```

- The site's Virtual Tour links (`/virtual-tour/...`) redirect to `/virtualtour/...` on the same domain (the
  package is built with `VIRTUAL_TOUR_URL=/virtualtour`).
- After a server reboot, the account's crontab (`@reboot pm2 resurrect`) starts the site again.
- The source of `.htaccess` and `__node_bridge.php` is `server/cdmotest/` in this repository.

## Deploying an update

```bash
node scripts/build_server_package.mjs   # builds deploy/server-package (about 370 MB, mostly images)
node scripts/deploy_cdmotest.mjs        # uploads it as one archive, swaps it in, restarts, checks
```

The deploy keeps the server's own CMS content (`src/data/stored*.json`), admin uploads (`public/uploads/`) and
`.env.production`, so edits made in this server's /admin are never overwritten. Content changed locally does
NOT reach the server this way; change it in the server's /admin instead.

Rollback (one step):

```bash
ssh -i ~/.ssh/lambda_cdmo_deploy anronix@68.178.172.196
cd ~ && mv app app.bad && mv app.prev app && pm2 restart lambda-cdmotest
```

The virtual tour is not part of a deploy; re-upload `virtualtour/` only when the tour itself changes.

## Admin sign-in

`app/.env.production` holds the admin user name and password (and the key that signs session cookies). To change
the password: edit the file on the server (it is readable by `anronix` only), then `pm2 restart lambda-cdmotest`.
Everyone is signed out when the password changes.

## Useful commands (over SSH)

```bash
pm2 ls                                              # status
pm2 logs lambda-cdmotest --lines 50 --nostream      # recent logs
pm2 restart lambda-cdmotest                         # restart
curl -sI http://127.0.0.1:3107/ | head -1           # the app itself
```

## Optional: faster setup with Apache's proxy module (needs root, server team)

The PHP bridge works, but Apache's own reverse proxy is faster (no PHP process per request, streaming responses).
If the server team runs `sudo a2enmod proxy proxy_http headers`, adds this inside the `*:443` VirtualHost and
reloads Apache, delete `__node_bridge.php` and the last rewrite rule in `.htaccess`:

```apache
ProxyRequests Off
ProxyPreserveHost On
RequestHeader set X-Forwarded-Proto "https"
ProxyPass /virtualtour !
ProxyPass / http://127.0.0.1:3107/ timeout=120
ProxyPassReverse / http://127.0.0.1:3107/
```

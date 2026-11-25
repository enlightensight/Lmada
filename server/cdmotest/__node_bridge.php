<?php
/**
 * cdmotest.lambda-cro.com: hands every request (except /virtualtour, served from disk) to the Next.js app that
 * pm2 runs on 127.0.0.1:3107, and returns its response unchanged.
 *
 * Used because Apache's proxy module is not enabled on this server and we have no root access. If the server
 * team enables it (a2enmod proxy proxy_http headers + ProxyPass in the vhost, see docs/DEPLOY_CDMOTEST.md),
 * this file and the rewrite rules in .htaccess can simply be removed.
 */
const NODE_ORIGIN = 'http://127.0.0.1:3107';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';
if ($uri === '' || $uri[0] !== '/') $uri = '/' . $uri;

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? 'cdmotest.lambda-cro.com';

// Request headers: everything the browser sent, minus hop-by-hop ones and anything a client could use to
// pretend to be the proxy. The forwarded headers are set here, from what Apache actually saw.
$skip = ['host', 'connection', 'keep-alive', 'proxy-connection', 'te', 'trailer', 'transfer-encoding', 'upgrade',
         'content-length', 'expect', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto', 'x-real-ip'];
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (in_array(strtolower($name), $skip, true)) continue;
    $headers[] = $name . ': ' . $value;
}
$headers[] = 'Host: ' . $host;
$headers[] = 'X-Forwarded-Host: ' . $host;
$headers[] = 'X-Forwarded-Proto: ' . ($https ? 'https' : 'http');
$headers[] = 'X-Forwarded-For: ' . $clientIp;
$headers[] = 'X-Real-IP: ' . $clientIp;
$headers[] = 'Expect:'; // no "100-continue" round trip

$ch = curl_init(NODE_ORIGIN . $uri);
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => false,  // redirects go back to the browser as they are
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 180,
    CURLOPT_ENCODING => null,         // pass compressed bodies through untouched
]);
if (!in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
    // Raw body, including multipart uploads (.htaccess turns off PHP's own form parsing for this)
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}
if ($method === 'HEAD') curl_setopt($ch, CURLOPT_NOBODY, true);

$responseHeaders = [];
curl_setopt($ch, CURLOPT_HEADERFUNCTION, function ($ch, $line) use (&$responseHeaders) {
    $trimmed = trim($line);
    if ($trimmed === '' || stripos($trimmed, 'HTTP/') === 0) {
        if (stripos($trimmed, 'HTTP/') === 0) $responseHeaders = []; // keep only the final response's headers
        return strlen($line);
    }
    $responseHeaders[] = $trimmed;
    return strlen($line);
});

$body = curl_exec($ch);
if ($body === false) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    header('Retry-After: 10');
    echo "The site is starting or temporarily unavailable. Please try again in a moment.";
    error_log('cdmotest node bridge: ' . curl_error($ch));
    exit;
}
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

http_response_code($status);
header_remove('X-Powered-By');
header_remove('Content-Type'); // PHP's default text/html must not override the app's own
foreach ($responseHeaders as $h) {
    $name = strtolower(strtok($h, ':'));
    if (in_array($name, ['transfer-encoding', 'connection', 'keep-alive', 'content-length'], true)) continue;
    header($h, false); // false: keep repeated headers such as Set-Cookie
}
header('Content-Length: ' . strlen($body));
echo $body;

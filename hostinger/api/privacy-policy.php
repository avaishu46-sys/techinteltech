<?php
declare(strict_types=1);

function respond(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

$allowedOrigins = [
    'https://techintel.tech',
    'https://www.techintel.tech',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['message' => 'This website is not allowed to load the policy.']);
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    header('Vary: Origin');
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
    header('Allow: GET, OPTIONS');
    respond(204, []);
}

if ($method !== 'GET') {
    header('Allow: GET');
    respond(405, ['message' => 'Only GET requests are accepted.']);
}

if (!function_exists('curl_init')) {
    error_log('Termly privacy policy endpoint requires the PHP cURL extension.');
    respond(503, ['message' => 'The privacy policy service is unavailable.']);
}

$policyUrl = 'https://app.termly.io/api/v1/consumer/policies/d57b5309-8c31-4c47-9b42-9752e9504c41/content';
$curl = curl_init($policyUrl);
if ($curl === false) {
    error_log('Could not initialize the Termly privacy policy request.');
    respond(502, ['message' => 'The privacy policy could not be loaded.']);
}

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_MAXFILESIZE => 1048576,
]);

$body = curl_exec($curl);
$curlError = curl_error($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
curl_close($curl);

if ($body === false || $status !== 200) {
    error_log('Termly privacy policy request failed: ' . ($curlError ?: 'HTTP ' . $status));
    respond(502, ['message' => 'The privacy policy could not be loaded.']);
}

$result = json_decode($body, true);
if (
    !is_array($result) ||
    !isset($result['content']) ||
    !is_string($result['content']) ||
    $result['content'] === '' ||
    strlen($result['content']) > 1048576
) {
    error_log('Termly returned an invalid privacy policy response.');
    respond(502, ['message' => 'The privacy policy could not be loaded.']);
}

header('Cache-Control: public, max-age=300');
respond(200, ['content' => $result['content']]);

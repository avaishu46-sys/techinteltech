<?php
declare(strict_types=1);

function respond(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

$configPaths = [
    dirname(__DIR__) . '/private/recaptcha-config.php',
    dirname(__DIR__, 2) . '/private/recaptcha-config.php',
    dirname(__DIR__, 3) . '/private/recaptcha-config.php',
];
$configPath = null;
foreach ($configPaths as $candidatePath) {
    if (is_file($candidatePath)) {
        $configPath = $candidatePath;
        break;
    }
}

if ($configPath === null) {
    error_log('TechIntel reCAPTCHA API configuration file is missing.');
    respond(503, ['message' => 'Human verification is not configured yet.']);
}

$config = require $configPath;
if (
    !is_array($config) ||
    !isset($config['secret'], $config['allowed_origins'], $config['allowed_hosts']) ||
    !is_string($config['secret']) ||
    !is_array($config['allowed_origins']) ||
    !is_array($config['allowed_hosts'])
) {
    error_log('TechIntel reCAPTCHA API configuration is incomplete.');
    respond(503, ['message' => 'Human verification is not configured correctly.']);
}

$allowedOrigins = $config['allowed_origins'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['message' => 'This website is not allowed to verify requests.']);
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    header('Vary: Origin');
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
    header('Allow: POST, OPTIONS');
    respond(204, []);
}

if ($method !== 'POST') {
    header('Allow: POST');
    respond(405, ['message' => 'Only POST requests are accepted.']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 4096) {
    respond(413, ['message' => 'The submitted verification data is too large.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data) || !isset($data['token']) || !is_string($data['token'])) {
    respond(400, ['message' => 'Please complete the human verification.']);
}

$token = trim($data['token']);
if ($token === '' || strlen($token) > 4096) {
    respond(422, ['message' => 'Please complete the human verification.']);
}

if (!function_exists('curl_init')) {
    error_log('TechIntel reCAPTCHA API requires the PHP cURL extension.');
    respond(503, ['message' => 'Human verification is temporarily unavailable.']);
}

$verificationFields = [
    'secret' => $config['secret'],
    'response' => $token,
];
if (!empty($_SERVER['REMOTE_ADDR'])) {
    $verificationFields['remoteip'] = $_SERVER['REMOTE_ADDR'];
}

$curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($verificationFields),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
]);
$responseBody = curl_exec($curl);
$curlError = curl_error($curl);
$httpStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
curl_close($curl);

if ($responseBody === false || $httpStatus !== 200) {
    error_log('TechIntel reCAPTCHA verification request failed: ' . $curlError);
    respond(502, ['message' => 'Human verification is temporarily unavailable.']);
}

$verification = json_decode($responseBody, true);
if (
    !is_array($verification) ||
    ($verification['success'] ?? false) !== true ||
    !isset($verification['hostname']) ||
    !is_string($verification['hostname'])
) {
    respond(422, ['message' => 'Human verification failed. Please try again.']);
}

$hostname = strtolower($verification['hostname']);
$allowedHosts = array_map('strtolower', $config['allowed_hosts']);
if (!in_array($hostname, $allowedHosts, true)) {
    error_log('TechIntel reCAPTCHA token hostname did not match the allowlist.');
    respond(422, ['message' => 'Human verification failed. Please try again.']);
}

respond(200, ['verified' => true]);

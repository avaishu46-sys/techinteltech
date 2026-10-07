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

$allowedOrigins = [
    'https://techintel.tech',
    'https://www.techintel.tech',
    'http://techintel.tech',
    'http://www.techintel.tech',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['message' => 'This website is not allowed to submit contact requests.']);
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
if ($rawBody === false || strlen($rawBody) > 20000) {
    respond(413, ['message' => 'The submitted contact details are too large.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data)) {
    respond(400, ['message' => 'Please provide valid contact details.']);
}

$requiredStrings = ['first_name', 'last_name', 'email', 'token'];
foreach ($requiredStrings as $field) {
    if (!isset($data[$field]) || !is_string($data[$field])) {
        respond(400, ['message' => 'Please complete all required contact fields.']);
    }
}

$firstName = trim($data['first_name']);
$lastName = trim($data['last_name']);
$email = strtolower(trim($data['email']));
$companyName = isset($data['company']) && is_string($data['company'])
    ? trim($data['company'])
    : '';
$phone = isset($data['phone']) && is_string($data['phone'])
    ? trim($data['phone'])
    : '';
$message = isset($data['message']) && is_string($data['message'])
    ? trim($data['message'])
    : '';
$token = trim($data['token']);

if ($firstName === '' || strlen($firstName) > 100 || $lastName === '' || strlen($lastName) > 100) {
    respond(422, ['message' => 'Please provide first and last names within 100 characters.']);
}
if (strlen($email) > 255 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, ['message' => 'Please provide a valid email address.']);
}
if (strlen($companyName) > 255 || strlen($phone) > 50 || strlen($message) > 10000) {
    respond(422, ['message' => 'One or more contact fields are too long.']);
}
if ($message === '') {
    respond(422, ['message' => 'Please enter a message.']);
}
if ($token === '' || strlen($token) > 4096) {
    respond(422, ['message' => 'Please complete the human verification.']);
}

$recaptchaConfigPath = null;
foreach ([
    dirname(__DIR__) . '/private/recaptcha-config.php',
    dirname(__DIR__, 2) . '/private/recaptcha-config.php',
    dirname(__DIR__, 3) . '/private/recaptcha-config.php',
] as $candidatePath) {
    if (is_file($candidatePath)) {
        $recaptchaConfigPath = $candidatePath;
        break;
    }
}

if ($recaptchaConfigPath === null) {
    error_log('TechIntel contact API reCAPTCHA configuration file is missing.');
    respond(503, ['message' => 'Human verification is not configured yet.']);
}

$recaptchaConfig = require $recaptchaConfigPath;
if (
    !is_array($recaptchaConfig) ||
    !isset($recaptchaConfig['secret'], $recaptchaConfig['allowed_hosts']) ||
    !is_string($recaptchaConfig['secret']) ||
    !is_array($recaptchaConfig['allowed_hosts'])
) {
    error_log('TechIntel contact API reCAPTCHA configuration is incomplete.');
    respond(503, ['message' => 'Human verification is not configured correctly.']);
}

if (!function_exists('curl_init')) {
    error_log('TechIntel contact API requires the PHP cURL extension.');
    respond(503, ['message' => 'Human verification is temporarily unavailable.']);
}

$verificationFields = [
    'secret' => $recaptchaConfig['secret'],
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
$verificationBody = curl_exec($curl);
$curlError = curl_error($curl);
$verificationStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
curl_close($curl);

if ($verificationBody === false || $verificationStatus !== 200) {
    error_log('TechIntel contact reCAPTCHA request failed: ' . $curlError);
    respond(502, ['message' => 'Human verification is temporarily unavailable.']);
}

$verification = json_decode($verificationBody, true);
if (
    !is_array($verification) ||
    ($verification['success'] ?? false) !== true ||
    !isset($verification['hostname']) ||
    !is_string($verification['hostname'])
) {
    respond(422, ['message' => 'Human verification failed. Please try again.']);
}

$hostname = strtolower($verification['hostname']);
$allowedHosts = array_map('strtolower', $recaptchaConfig['allowed_hosts']);
if (!in_array($hostname, $allowedHosts, true)) {
    error_log('TechIntel contact reCAPTCHA token hostname did not match the allowlist.');
    respond(422, ['message' => 'Human verification failed. Please try again.']);
}

$databaseConfigPath = null;
foreach ([
    dirname(__DIR__) . '/private/techintel-config.php',
    dirname(__DIR__, 2) . '/private/techintel-config.php',
    dirname(__DIR__, 3) . '/private/techintel-config.php',
] as $candidatePath) {
    if (is_file($candidatePath)) {
        $databaseConfigPath = $candidatePath;
        break;
    }
}

if ($databaseConfigPath === null) {
    error_log('TechIntel contact API database configuration file is missing.');
    respond(503, ['message' => 'The contact service is not configured yet.']);
}

$databaseConfig = require $databaseConfigPath;
if (
    !is_array($databaseConfig) ||
    !isset(
        $databaseConfig['host'],
        $databaseConfig['database'],
        $databaseConfig['username'],
        $databaseConfig['password']
    )
) {
    error_log('TechIntel contact API database configuration is incomplete.');
    respond(503, ['message' => 'The contact service is not configured correctly.']);
}

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
if (strlen($ipAddress) > 50) {
    $ipAddress = '';
}

try {
    $pdo = new PDO(
        'mysql:host=' . $databaseConfig['host'] . ';dbname=' . $databaseConfig['database'] . ';charset=utf8mb4',
        $databaseConfig['username'],
        $databaseConfig['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    $statement = $pdo->prepare(
        'INSERT INTO `contact_queries`
            (`first_name`, `last_name`, `email`, `company_name`, `phone`, `message`, `ip_address`, `created_at`)
         VALUES
            (:first_name, :last_name, :email, :company_name, :phone, :message, :ip_address, CURRENT_TIMESTAMP)'
    );
    $statement->execute([
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':company_name' => $companyName,
        ':phone' => $phone,
        ':message' => $message,
        ':ip_address' => $ipAddress,
    ]);
} catch (PDOException $error) {
    error_log('TechIntel contact database request failed: ' . $error->getMessage());
    respond(500, ['message' => 'We could not save your message. Please try again later.']);
}

respond(201, [
    'submitted' => true,
    'message' => 'Your message has been received. Our team will get back to you shortly.',
]);

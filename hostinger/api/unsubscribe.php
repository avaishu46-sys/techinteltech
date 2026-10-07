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
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['error' => 'This website is not allowed to submit unsubscribe requests.']);
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
    respond(405, ['error' => 'Only POST requests are accepted.']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 4096) {
    respond(413, ['error' => 'The submitted data is too large.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data) || !isset($data['email']) || !is_string($data['email'])) {
    respond(400, ['error' => 'Please provide a valid email address.']);
}

$email = strtolower(trim($data['email']));
if (
    strlen($email) > 250 ||
    filter_var($email, FILTER_VALIDATE_EMAIL) === false
) {
    respond(422, ['error' => 'Please provide a valid email address.']);
}

$configPaths = [
    dirname(__DIR__) . '/private/techintel-config.php',
    dirname(__DIR__, 2) . '/private/techintel-config.php',
    dirname(__DIR__, 3) . '/private/techintel-config.php',
];
$configPath = null;
foreach ($configPaths as $candidatePath) {
    if (is_file($candidatePath)) {
        $configPath = $candidatePath;
        break;
    }
}

if ($configPath === null) {
    error_log('TechIntel unsubscribe API configuration file is missing.');
    respond(503, ['error' => 'The unsubscribe service is not configured yet.']);
}

$config = require $configPath;
if (
    !is_array($config) ||
    !isset($config['host'], $config['database'], $config['username'], $config['password'])
) {
    error_log('TechIntel unsubscribe API configuration is incomplete.');
    respond(503, ['error' => 'The unsubscribe service is not configured correctly.']);
}

try {
    $pdo = new PDO(
        'mysql:host=' . $config['host'] . ';dbname=' . $config['database'] . ';charset=utf8mb4',
        $config['username'],
        $config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    $statement = $pdo->prepare('INSERT INTO `Unsubscribe` (`email`) VALUES (:email)');
    $statement->execute([':email' => $email]);
} catch (PDOException $error) {
    error_log('TechIntel unsubscribe database request failed: ' . $error->getMessage());
    respond(500, ['error' => 'We could not record your request. Please try again later.']);
}

respond(201, ['message' => 'Your unsubscribe request has been recorded.']);

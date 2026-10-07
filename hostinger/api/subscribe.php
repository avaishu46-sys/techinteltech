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
    'http://techintel.tech',
    'http://www.techintel.tech',
    'https://techintel.tech',
    'https://www.techintel.tech',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['message' => 'This website is not allowed to subscribe.']);
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
    respond(413, ['message' => 'The submitted data is too large.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data) || !isset($data['email']) || !is_string($data['email'])) {
    respond(400, ['message' => 'Please provide a valid email address.']);
}

$email = strtolower(trim($data['email']));
if (strlen($email) > 250 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, ['message' => 'Please provide a valid email address.']);
}

$cadence = $data['cadence'] ?? 'weekly';
if (!is_string($cadence) || !in_array($cadence, ['weekly', 'monthly'], true)) {
    respond(422, ['message' => 'Please choose a valid email cadence.']);
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
    error_log('TechIntel newsletter API database configuration file is missing.');
    respond(503, ['message' => 'The subscription service is not configured yet.']);
}

$config = require $configPath;
if (
    !is_array($config) ||
    !isset($config['host'], $config['database'], $config['username'], $config['password'])
) {
    error_log('TechIntel newsletter API database configuration is incomplete.');
    respond(503, ['message' => 'The subscription service is not configured correctly.']);
}

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
if (strlen($ipAddress) > 45) {
    $ipAddress = '';
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

    $lookup = $pdo->prepare(
        'SELECT 1 FROM `subscribers` WHERE LOWER(`email`) = :email LIMIT 1'
    );
    $lookup->execute([':email' => $email]);
    if ($lookup->fetchColumn() !== false) {
        respond(200, [
            'status' => 'already_subscribed',
            'message' => 'This email address is already subscribed.',
        ]);
    }

    $hasCadenceColumn = $pdo
        ->query("SHOW COLUMNS FROM `subscribers` LIKE 'cadence'")
        ->fetch(PDO::FETCH_ASSOC) !== false;

    if ($hasCadenceColumn) {
        $insert = $pdo->prepare(
            'INSERT INTO `subscribers` (`email`, `cadence`, `ip_address`, `created_at`)
             VALUES (:email, :cadence, :ip_address, CURRENT_TIMESTAMP)'
        );
        $insert->execute([
            ':email' => $email,
            ':cadence' => $cadence,
            ':ip_address' => $ipAddress,
        ]);
    } else {
        $insert = $pdo->prepare(
            'INSERT INTO `subscribers` (`email`, `ip_address`, `created_at`)
             VALUES (:email, :ip_address, CURRENT_TIMESTAMP)'
        );
        $insert->execute([
            ':email' => $email,
            ':ip_address' => $ipAddress,
        ]);
    }
} catch (PDOException $error) {
    if ($error->getCode() === '23000') {
        respond(200, [
            'status' => 'already_subscribed',
            'message' => 'This email address is already subscribed.',
        ]);
    }

    error_log('TechIntel newsletter subscription failed: ' . $error->getMessage());
    respond(500, ['message' => 'We could not save your subscription. Please try again later.']);
}

respond(201, [
    'status' => 'subscribed',
    'message' => 'You have been subscribed successfully!',
]);

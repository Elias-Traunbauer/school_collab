<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__, 2) . "/database/identification.php";
apiStart();

$config = json_decode(file_get_contents(dirname(__FILE__, 2) . "/database/credentials.php"));

require_once dirname(__FILE__, 2) . "/database/repositories/user_repository.php";

$requestBody = file_get_contents("php://input");
$requestJson = json_decode($requestBody);

if (!isset($requestJson->email) || !isset($requestJson->password)) {
    http_response_code(400);
    die();
}

$res = UserRepository::login($requestJson->email, $requestJson->password);

if ($res === false) {
    http_response_code(401);
    die();
}

$header = json_encode(['typ' => 'JWT', 'alg' => 'HS512', 'issuer' => $config->jwt->issuer]);

$payload = json_encode([
    'username' => $res->username,
    'email' => $res->email,
    'firstName' => $res->firstName,
    'lastName' => $res->lastName,
    'permissions' => $res->permissions,
    'exp' => time() + 60 * 15,
    'anti_csrf_token' => $_SERVER["HTTP_ANTI_CSRF_TOKEN"]
    ]);

$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
$signature = hash_hmac('sha512', $base64UrlHeader . "." . $base64UrlPayload, $config->jwt->key, true);
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

setcookie("jwt", $jwt, 0, "/", "", false, true);
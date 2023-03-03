<?php

require_once 'credentials.php';

function authenticate_and_authorize($terminateOnUnAuthenticated = true) : void
{
    // authentication not possible without csrf token, ONLY occurs in the first request
    if (!isset($_SERVER["HTTP_ANTI_CSRF_TOKEN"])) {
        $_REQUEST["authenticated"] = false;
        return;
    }

    $jwt_config_json = json_decode(Credential_Data::$jwt_config);

    if (!isset($_COOKIE["jwt"])) {
        if ($terminateOnUnAuthenticated) {
            http_response_code(401);
            die();
        }

        $_REQUEST["authenticated"] = false;
        return;
    }

    $jwt = $_COOKIE["jwt"];

    $tokenParts = explode('.', $jwt);
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signatureProvided = $tokenParts[2];

    $payload_json = json_decode($payload);

    // check timestamp
    $valid_until = $payload_json->exp;
    if ($valid_until < time()) {
        // expired
        if ($terminateOnUnAuthenticated) {
            http_response_code(401);
            die();
        }
        $_REQUEST["authenticated"] = false;
        return;
    }
    // payload that claims to be valid in regard to expiry time
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha512', $base64UrlHeader . "." . $base64UrlPayload, $jwt_config_json->key, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    if ($base64UrlSignature != $signatureProvided) {
        // invalid token
        http_response_code(401);
        die();
    }

    if ($_SERVER['HTTP_ANTI_CSRF_TOKEN'] !== $payload_json->anti_csrf_token) {
        // request forgery
        http_response_code(401);
        die();
    }

    $_REQUEST["authenticated"] = true;
    $_REQUEST["user"] = $payload_json;
}

function apiStart() : void
{
    header('Access-Control-Allow-Origin: http://localhost');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    if (!isset($_SERVER["HTTP_ANTI_CSRF_TOKEN"])) {
        $anti_csrf_token = bin2hex(random_bytes(32));
        $_SERVER["HTTP_ANTI_CSRF_TOKEN"] = $anti_csrf_token;
        setcookie("anti_csrf_token", $anti_csrf_token, time() + 3600 * 24 * 356, '/6df6131a8dd4632dba3634e04462bd79b772f0858cc4025813fd3995d59e29d8');
    }
    if (strtoupper($_SERVER["REQUEST_METHOD"]) === "OPTIONS") {
        http_response_code(200);
        die();
    }
    if (strtoupper($_SERVER["REQUEST_METHOD"]) !== "POST") {
        http_response_code(405);
        die();
    }
    header("Content-Type: application/json");
}

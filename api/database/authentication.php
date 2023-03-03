<?php

require_once 'credentials.php';

function authenticate_and_authorize($terminateOnUnAuthenticated = true) : void
{
    $jwt_config_json = json_decode(Credential_Data::$jwt_config);

    if (!isset($_COOKIE["jwt"])) {
        $_REQUEST["authenticated"] = false;

        if ($terminateOnUnAuthenticated) {
            http_response_code(401);
            die();
        }
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
        $_REQUEST["authenticated"] = false;
        if ($terminateOnUnAuthenticated) {
            http_response_code(401);
            die();
        }
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

    $_REQUEST["authenticated"] = true;
    $_REQUEST["user"] = $payload_json;
}

function apiStart(): void
{
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

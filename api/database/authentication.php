<?php

require_once 'credentials.php';

function authentificate(): void
{
    $jwt_config_json = json_decode(Credential_Data::$jwt_config);

    if (!isset($_COOKIE["jwt"])) {
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
    $valid_until = $payload_json->valid_until;
    if ($valid_until < time()) {
        // expired
        $_REQUEST["authenticated"] = false;
        return;
    }
    // claims to be valid in regard to time
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha512', $base64UrlHeader . "." . $base64UrlPayload, $jwt_config_json->key, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    if ($base64UrlSignature !== $signatureProvided) {
        // invalid token
        http_response_code(418);
        die();
    }

    $_REQUEST["authenticated"] = true;
    $_REQUEST["user"] = $payload_json;
}


<?php

require_once dirname(__FILE__, 2) . "/database/identification.php";
apiStart();

require_once dirname(__FILE__, 2) . "/database/credentials.php";
require_once dirname(__FILE__, 2) . "/database/repositories/user_repository.php";

$requestBody = file_get_contents("php://input");
$requestJson = json_decode($requestBody);

if (!isset($requestJson->username) || !isset($requestJson->first_name) || !isset($requestJson->last_name) || !isset($requestJson->email) || !isset($requestJson->password)) {
    http_response_code(400);
    die();
}

$res = UserRepository::register($requestJson->username, $requestJson->first_name, $requestJson->last_name, $requestJson->email, $requestJson->password);

if ($res !== true) {
    http_response_code(401);
    $response = new stdClass();
    $response->errors = $res;
    echo(json_encode($response));
    die();
}

http_response_code(200);
<?php
require "credentials.php";

Database::createPDOConnection();
class Database {

    public static string $hashAlgo = "sha256";

    public static function createPDOConnection() : PDO {
        $credentials = Credentials::loadConfig(Credential_Data::$credential_string);
        return new PDO("mysql:host=" . $credentials->ip . ";dbname=" . $credentials->db, $credentials->name, $credentials->pw);
    }
}

class Credentials {

    public string $name;
    public string $pw;
    public string $ip;
    public string $db;

    public static function loadConfig($string) : Credentials {
        $data = json_decode($string);

        $newCredentials = new Credentials();
        $newCredentials->name = $data->name;
        $newCredentials->pw = $data->pw;
        $newCredentials->ip = $data->ip;
        $newCredentials->db = $data->db;

        return $newCredentials;
    }

}
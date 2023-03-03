<?php
require_once "credentials.php";

Database::createPDOConnection();
class Database
{

    public static string $hashAlgo = "sha512";

    /// <summary>
    /// Creates a PDO connection to the database.
    /// </summary>
    /// <returns>A PDO connection to the database.</returns>
    public static function createPDOConnection(): PDO
    {
        $credentials = Credentials::loadConfig(Credential_Data::$credential_string);
        return new PDO("mysql:host=" . $credentials->ip . ";dbname=" . $credentials->db, $credentials->name, $credentials->pw);
    }
}

class Credentials
{

    public string $name;
    public string $pw;
    public string $ip;
    public string $db;

    /// <summary>
    /// Loads the credentials from a JSON string.
    /// </summary>
    /// <param name="string">The JSON string to load the credentials from.</param>
    /// <returns>The credentials loaded from the JSON string.</returns>
    public static function loadConfig($string): Credentials
    {
        $data = json_decode($string);

        $newCredentials = new Credentials();
        $newCredentials->name = $data->name;
        $newCredentials->pw = $data->pw;
        $newCredentials->ip = $data->ip;
        $newCredentials->db = $data->db;

        return $newCredentials;
    }
}

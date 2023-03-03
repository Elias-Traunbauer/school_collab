<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__, 2) . "/database/authentication.php";
apiStart();
authenticate_and_authorize();

echo '
{
    "data": [
        {
            "subject": "DBI",
            "title": "JPA Lab 1: Generieren der IDs",
            "description": "Generieren Sie die IDs für die Klassen \"Kunde\" und \"Bestellung\". Die IDs sollen in der Datenbank automatisch generiert werden. Die IDs sollen vom Typ \"Long\" sein.",
            "deadline": "2023-01-22T23:59:59.999Z"
        },
        {
            "subject": "DBI",
            "title": "JPA Lab 2: Erstellen der Datenbank",
            "description": "Generieren Sie die IDs für die Klassen \"Kunde\" und \"Bestellung\". Die IDs sollen in der Datenbank automatisch generiert werden. Die IDs sollen vom Typ \"Long\" sein.",
            "deadline": "2024-01-22T23:59:59.999Z"
        }
    ]
}
';

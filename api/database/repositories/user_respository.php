<?php
require "../db.php";
require "../entities/user.php";

class UserRepository {

    public static function login($email, $pw) : User | bool {
        $pdo = Database::createPDOConnection();
        $pdo->beginTransaction();

        $pw_hash = self::getPwHash($pw, $email);

        $stmt = $pdo->prepare("select * from users where email = ? and pw_hash = ?");
        $stmt->execute([ $email, $pw_hash ]);

        if ($row = $stmt->fetch()) {

        }
        else {
            return false;
        }

        $pdo->commit();

        return new User();
    }

    public static function getPwHash($pw, $salt) : string {
        return hash(Database::$hashAlgo, hash(Database::$hashAlgo, $salt) . $pw);
    }
}
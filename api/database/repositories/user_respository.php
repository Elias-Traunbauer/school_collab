<?php
require "../db.php";
require "../entities/user.php";

echo (UserRepository::login("e", "l")->firstName);

class UserRepository {

    public static function login($email, $pw) : User | bool {
        $pdo = Database::createPDOConnection();

        $pw_hash = self::getPwHash($pw, $email);

        $stmt = $pdo->prepare("select username, first_name, last_name, email, permissions from users where email = ? and pw_hash = ?");
        $stmt->execute([ $email, $pw_hash ]);

        if ($row = $stmt->fetch()) {
            $user = new User();
            $user->username = $row->username;
            $user->firstName = $row->first_name;
            $user->lastName = $row->last_name;
            $user->email = $row->email;
            $user->permissions = $row->permissions;
            $stmt->closeCursor();
            return $user;
        }
        else {
            $stmt->closeCursor();
            return false;
        }
    }

    public static function register($username, $firstName, $lastName, $email, $pw) : bool|array
    {
        $pdo = Database::createPDOConnection();

        $pw_hash = self::getPwHash($pw, $email);

        $user = new User();
        $user->username = $username;
        $user->firstName = $firstName;
        $user->lastName = $lastName;
        $user->email = $email;

        $user_valid = $user->validate();
        $pw_valid = User::validatePassword($pw);
        if (!($user_valid === true && $pw_valid === true)) {
            $errors = array();
            if ($user_valid !== true)
                array_push($errors, $user_valid);
            if ($pw_valid !== true)
                array_push($errors, $pw_valid);
            return $errors;
        }

        $stmt = $pdo->prepare("insert into users (username, first_name, last_name, email, pw_hash) values (?, ?, ?, ?, ?)");
        $stmt->execute([ $username, $firstName, $lastName, $email, $pw_hash ]);

        return true;
    }

    public static function getPwHash($pw, $salt) : string {
        return hash(Database::$hashAlgo, hash(Database::$hashAlgo, $salt) . $pw);
    }
}
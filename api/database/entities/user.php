<?php

require "IValidateable.php";

class User implements IValidateable
{
    public string $username;
    public string $firstName;
    public string $lastName;
    public string $email;
    public string $permissions;

    public function validate(): array|bool
    {
        $errors = array();

        if (strlen($this->username) < 5) {
            $errors[] = "Username has to have a minimum length of 5 characters";
        }
        if (strlen($this->firstName) < 1) {
            $errors[] = "First name is required";
        }
        if (strlen($this->lastName) < 1) {
            $errors[] = "Last name is required";
        }
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Email has to be a valid email address";
        }

        return count($errors) == 0 ? true : $errors;
    }

    public static function validatePassword($pw): array|bool
    {
        $errors = array();

        if (strlen($pw) < 6) {
            $errors[] = "Password has to have a minimum length of 6 characters";
        }
        if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/", $pw)) {
            $errors[] = "Password has to contain one uppercase letter, one number and one special character";
        }

        return count($errors) == 0 ? true : $errors;
    }
}

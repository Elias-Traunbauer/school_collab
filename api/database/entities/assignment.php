<?php

require "IValidateable.php";

class Assignment implements IValidateable {
    
    public string $title;
    public string $summary;
    public string $description;
    public array $instructionFiles;
    public array $solutionFiles;

	/**
	 * @return array|bool
	 */
	public function validate() : array|bool {

        $validationConditions = [
            self::$title != "", "Title cannot be empty",
            self::$summary != "", "Summary cannot be empty",
            self::$description != "", "Description cannot be empty",
            self::$title != "", "Title cannot be empty",
            self::$title != "", "Title cannot be empty",
        ];

		return true;
	}
}
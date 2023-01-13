<?php

interface IValidateable {
    public function validate() : array|bool;
}
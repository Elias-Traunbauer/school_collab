import react from 'react'
import Datepicker from '../components/Datepicker'
import React from 'react'
export default function DatepickerTest() {

    function nothing() {
        console.log("nothing");
    }
    return (
        <Datepicker OnInput={nothing}></Datepicker>
    )
}
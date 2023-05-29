import react from 'react'
import Datepicker from '../components/Datepicker'
import React from 'react'
export default function DatepickerTest() {

    function nothing(e) {
        console.log(e);
    }
    return (
        <Datepicker inputChanged={nothing} ></Datepicker>
    )
}
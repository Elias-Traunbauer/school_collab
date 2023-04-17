import styles from '../styles/Datetimepicker.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { func } from 'prop-types';

export default function Datepicker({ title = 'date', dateParam = new Date() }) {

    const [displayDatesArray, setDisplayDatesArray] = useState([]);
    //const displayDatesArray = [];
    const [date, setDate] = useState(initDate(dateParam));
    const monthNames = getMonths();
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    function initDate(dateParam) {
        let tmpDate = new Date(dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate(), dateParam.getHours(), dateParam.getMinutes());
        tmpDate.setHours(23, 59, 0, 0);
        return tmpDate;
    }

    useEffect(() => {
        calc();
        (document.getElementById('monthInput') as HTMLInputElement).value = monthNames[date.getMonth()];
        (document.getElementById('yearInput') as HTMLInputElement).value = date.getFullYear() + "";
        (document.getElementById('datetimeInput') as HTMLInputElement).value = PrintDateTime();
    }, [date]);

    function getMonths() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    function changeToNextMonth() {
        setDate(GetNextMonth());
    }

    function changeToPreviousMonth() {
        setDate(GetPreviusMonth());
    }

    function handleDateClicked(day, currmonth) {
        let tmpDate = new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
        if (currmonth) {
        }
        else if (day >= 20) {
            tmpDate = GetPreviusMonth()
        }
        else {
            tmpDate = GetNextMonth()
        }
        setDate(new Date(tmpDate.getFullYear(), tmpDate.getMonth(), day, date.getHours(), date.getMinutes()));
    }

    function PrintDateTime() {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    function GetMaxDaysOfPreviousMonth() {
        let preMonth = GetPreviusMonth();
        return new Date(preMonth.getFullYear(), preMonth.getMonth() + 1, 0).getDate();
    }
    function calc() {
        let daysOfPreviousMonth = GetMaxDaysOfPreviousMonth();
        console.log('maxdays ' + daysOfPreviousMonth);
        const daysOfCurrentMonth = GetDaysOfCurrentMonth();
        let previousdays = GetWeekdayOfFirstDay();
        const tmpArray = [];
        previousdays == 0 ? previousdays = 7 : "";
        let cnt = daysOfPreviousMonth - previousdays + 2;

        for (let i = 0; i < previousdays - 1; i++) {
            tmpArray.push({
                day: cnt,
                currMonth: false
            });
            cnt++;
        }
        for (let i = 1; i <= daysOfCurrentMonth; i++) {
            tmpArray.push({
                day: i,
                currMonth: true
            });
        }

        const daysLeft = 43 - tmpArray.length;

        for (let i = 1; i < daysLeft; i++) {
            tmpArray.push({
                day: i,
                currMonth: false
            });
        }

        setDisplayDatesArray(tmpArray);
    }

    function GetWeekdayOfFirstDay() {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    function GetPreviusMonth() {
        var tempDateObj = new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());

        if (tempDateObj.getMonth() == 0) {
            tempDateObj.setFullYear(tempDateObj.getFullYear() - 1);
            tempDateObj.setMonth(11);
        } else {
            tempDateObj.setMonth(tempDateObj.getMonth() - 1);
        }

        var maxDaysOfNextMonth = new Date(tempDateObj.getFullYear(), tempDateObj.getMonth() + 1, 0).getDate();
        if (date.getDate() > maxDaysOfNextMonth)
            tempDateObj.setDate(maxDaysOfNextMonth);
        else
            tempDateObj.setDate(date.getDate());

        return tempDateObj;
    }

    function GetNextMonth() {
        if (date.getMonth() == 11) {
            var nextMonth = new Date(date.getFullYear() + 1, 0, 1, date.getHours(), date.getMinutes());
        } else {
            var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
        }

        var maxDaysOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
        console.log(maxDaysOfNextMonth + "-->" + date.getDate());

        if (date.getDate() > maxDaysOfNextMonth)
            nextMonth.setDate(maxDaysOfNextMonth);

        else
            nextMonth.setDate(date.getDate());

        return nextMonth;
    }

    function GetDaysOfCurrentMonth() {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function handleFocus(e) {
        setTimeout(function () {
            e.target.setSelectionRange(e.target.value.length, e.target.value.length)
        }, 1);

        e.target.classList.remove(styles.unfocusedInput);
        e.target.classList.add(styles.focusedInput);
    }

    function handleFocusoutMonth(e) {
        e.target.classList.add(styles.unfocusedInput);
        e.target.classList.remove(styles.focusedInput);
        let found = false;
        for (const iterator of monthNames) {
            if (iterator.toLowerCase().includes(e.target.value.toLowerCase())) {
                e.target.value = iterator;
                found = true;
                break;
            }
        }

        if (found) {
            date.setMonth(monthNames.indexOf(e.target.value));
            calc();
        }
        else {
            e.target.value = monthNames[date.getMonth()];
        }
        setDate(date);
    }

    function handleFocusoutYear(e) {
        e.target.classList.add(styles.unfocusedInput);
        e.target.classList.remove(styles.focusedInput);
        if (e.target.value.length == 4) {
            date.setFullYear(e.target.value);
            calc();
        }
        else {
            e.target.value = date.getFullYear();
        }
        setDate(date);
    }

    function handleYearChange(e) {
        var newYear = e.target.value;
        if (newYear.length == 4) {
            date.setFullYear(newYear);
            setDate(date);
        }
    }
    var handleMonthChange = function (e) {
        var newMonth = monthNames.find((element) => element.toLowerCase() == e.target.value.toLowerCase());
        if (newMonth != undefined)
            date.setMonth(monthNames.indexOf(newMonth));
        setDate(date);
    };

    function handleEnterKeyPressed(e) {
        if (e.key == "Enter") {
            e.target.blur();
        }
    }

    function showDatepicker() {
        const datepickerContainer = document.getElementById('datepickerContainer');

        if (datepickerContainer.classList.contains(styles.hidden)) {
            datepickerContainer.classList.remove(styles.hidden);
        }
        else {
            datepickerContainer.classList.add(styles.hidden);
        }
    }

    function handleInputChange(e, input) {
        if (input && e.key != 'Enter') {
            return;
        }
        const datetimeSplit = e.target.value.split(' ');
        const dateSplit = datetimeSplit[0].split('.');
        const timeSplit = datetimeSplit[1].split(':');
        const matches = e.target.value.match(/^^(\d{1,2}).(\d{1,2}).(\d{2,4}) (\d{2}):(\d{2})$/);
        if (matches == null) {
            return;
        }
        const tmpdate = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0], timeSplit[0], timeSplit[1]);

        if (tmpdate.getMonth() != dateSplit[1] - 1 || tmpdate.getFullYear() != dateSplit[2]) {
            e.target.classList.add(styles.errorInput);

            //optional
            e.target.value = PrintDateTime();

            console.log("invalid date");
            return;
        }

        e.target.classList.remove(styles.errorInput);
        console.log("set date");
        setDate(tmpdate);
    }

    return (
        <>
            <div className={styles.overviewContainer}>
                <div className={styles.inputContainer}>
                    <label>{title}</label>
                    <input onBlur={(e) => handleInputChange(e, false)} onKeyDown={(e) => handleInputChange(e, true)} id='datetimeInput'></input>
                </div>
                <div className={styles.inputContainer}>
                    <label> </label>
                    <button onClick={showDatepicker} id='pickerPopup Button'>Picker</button>
                </div>


                <div id='datepickerContainer' className={`${styles.container} ${styles.hidden}`}>
                    <div className={styles.dateHeaderContainer}>
                        <div className={styles.dateHeader}>
                            <svg onClick={changeToPreviousMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" /></svg>
                            <div>
                                <input className={styles.unfocusedInput} onKeyUp={(e) => handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutMonth(e)} type='text' onChange={handleMonthChange} id='monthInput' />
                                <input className={styles.unfocusedInput} onKeyUp={(e) => handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutYear(e)} type='text' onChange={handleYearChange} id='yearInput' />
                            </div>
                            <svg onClick={changeToNextMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" /></svg>
                        </div>
                    </div>

                    <div className={styles.dateWrapper}>
                        <div className={styles.weekdayContainer}>
                            {weekdays.map((name, i) => {
                                return <div key={i} className={styles.weekdayItem}> <p>{name}</p> </div>
                            })}
                        </div>
                        <div className={styles.dateGridContainer}>
                            {displayDatesArray.map(({ day, currMonth }, i) => {
                                return <div onClick={() => handleDateClicked(day, currMonth)} key={i} className={`${styles.datepickerItem} ${!currMonth ? styles.otherMonth : ""} ${currMonth && day == date.getDate() ? styles.currMonth : ""}`}>  <p>{day}</p> </div>
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

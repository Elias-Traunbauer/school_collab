import styles from '../styles/Datetimepicker.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { func } from 'prop-types';

export default function Datepicker({ inputChanged, title = 'date', dateParam = new Date(), required=false }: { inputChanged: Function, title?: string, dateParam?: Date,required?:boolean }) {

    const [displayDatesArray, setDisplayDatesArray] = useState([]);
    //const displayDatesArray = [];
    const [date, setDate] = useState(dateParam);
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthNames = getMonths();

    useEffect(() => {
        inputChanged(date);
    }, [date, inputChanged]);

    function GetMaxDaysOfPreviousMonth(tmpDate) {
        let preMonth = GetPreviusMonth(tmpDate);
        return new Date(preMonth.getFullYear(), preMonth.getMonth() + 1, 0).getDate();
    }

    function GetDaysOfCurrentMonth(tmpDate) {
        return new Date(tmpDate.getFullYear(), tmpDate.getMonth() + 1, 0).getDate();
    }
    function GetWeekdayOfFirstDay(tmpDate) {
        return new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1).getDay();
    }

    function getMonths() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }



    function changeToNextMonth(tmpDate) {
        const newDate = GetNextMonth(tmpDate)
        setDate(newDate);
        calc(newDate);
    }

    function changeToPreviousMonth(tmpDate) {
        const newDate = GetPreviusMonth(tmpDate)
        setDate(newDate);
        calc(newDate);
    }

    function handleDateClicked(day, currmonth) {
        let tmpDate = new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
        if (!currmonth) {
            if (day > 20) {
                tmpDate = new Date(date.getFullYear(), date.getMonth()-1, day, date.getHours(), date.getMinutes());
            } else {
                tmpDate = new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
                tmpDate.setMonth(tmpDate.getMonth() + 1);
            }
        }

        setDate(tmpDate);
        calc(tmpDate);
    }

    function PrintDateTime(tmpDate) {
        //date in format: dd.mm.yyyy hh:mm where day,month,minutes and hours are 2 digits
        let day = ('0'+tmpDate.getDate()).slice(-2);
        let month = ('0'+(tmpDate.getMonth()+1)).slice(-2);
        let year = tmpDate.getFullYear();
        let hours = ('0'+tmpDate.getHours()).slice(-2);
        let minutes = ('0'+tmpDate.getMinutes()).slice(-2);
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }


    function calc(tmpDate) {
        let daysOfPreviousMonth = GetMaxDaysOfPreviousMonth(tmpDate);
        const daysOfCurrentMonth = GetDaysOfCurrentMonth(tmpDate);
        let previousdays = GetWeekdayOfFirstDay(tmpDate);
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
        // set monthInput and yearInput
        const monthInput = document.getElementById('monthInput') as HTMLInputElement;
        const yearInput = document.getElementById('yearInput') as HTMLInputElement;
        monthInput.value = monthNames[tmpDate.getMonth()];
        yearInput.value = tmpDate.getFullYear().toString();
    }

    function GetPreviusMonth(tmpDate) {
        var tempDateObj = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1, tmpDate.getHours(), tmpDate.getMinutes());

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
            tempDateObj.setDate(tmpDate.getDate());

        
        return tempDateObj;
    }

    function GetNextMonth(tmpDate) {
        if (tmpDate.getMonth() == 11) {
            var nextMonth = new Date(tmpDate.getFullYear() + 1, 0, 1, tmpDate.getHours(), tmpDate.getMinutes());
        } else {
            var nextMonth = new Date(tmpDate.getFullYear(), tmpDate.getMonth() + 1, 1, tmpDate.getHours(), tmpDate.getMinutes());
        }

        var maxDaysOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();


        if (tmpDate.getDate() > maxDaysOfNextMonth)
            nextMonth.setDate(maxDaysOfNextMonth);

        else
            nextMonth.setDate(tmpDate.getDate());

            
        return nextMonth;
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
       calc(date);
    }

    function handleInputChange(e, input) {
        if (input && e.key != 'Enter') {
            return;
        }
        const datetimeSplit = e.target.value.split(' ');
        if (datetimeSplit == null || datetimeSplit.length != 2) {
            return;
        }
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
            e.target.value = PrintDateTime(tmpdate);

            return;
        }

        e.target.classList.remove(styles.errorInput);
        setDate(tmpdate);
        calc(tmpdate);
    }

    return (
        <>
            <div className={styles.overviewContainer}>
                <div className={styles.inputContainer}>
                    <input defaultValue={PrintDateTime(date)} onBlur={(e) => handleInputChange(e, false)} onKeyDown={(e) => handleInputChange(e, true)} id='datetimeInput'></input>
                    <div>
                        <button onClick={showDatepicker} id='pickerPopup'></button>
                    </div>

                </div>

                <div id='datepickerContainer' className={`${styles.container} ${styles.hidden}`}>
                    <div className={styles.dateHeaderContainer}>
                        <div className={styles.dateHeader}>
                            <Image onClick={()=>changeToPreviousMonth(date)} src={'/chevron.svg'} width={10} height={10} alt='left'></Image>
                            <div>
                                <input className={styles.unfocusedInput} onKeyUp={(e) => handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutMonth(e)} type='text' onChange={handleMonthChange} id='monthInput' />
                                <input className={styles.unfocusedInput} onKeyUp={(e) => handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutYear(e)} type='text' onChange={handleYearChange} id='yearInput' />
                            </div>
                            <Image onClick={()=>changeToNextMonth(date)} src={'/chevron.svg'} width={10} height={10} alt='left'></Image>
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

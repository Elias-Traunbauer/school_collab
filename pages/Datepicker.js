import styles from '../styles/datetimepicker.module.css';
import React, { useState ,useEffect, useMemo} from 'react';
import Image from 'next/image';
import { func } from 'prop-types';

export default function Datepicker({title='date',dateParam = new Date()}){

    const [displayDatesArray,setDisplayDatesArray] = useState([]);
    //const displayDatesArray = [];
    const[date,setDate] = useState(dateParam);
    const monthNames = getMonths();

    useEffect(() => { 
        calc();
        document.getElementById('monthInput').value = monthNames[date.getMonth()];
        document.getElementById('yearInput').value = date.getFullYear();
        document.getElementById('datetimeInput').value = date.getDate();
    },[date]);

    function getMonths() {
        return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    }

    function changeToNextMonth(){
        const nextMonth = GetNextMonth();
        setDate(nextMonth);
    }

    function changeToPreviousMonth(){
        const previousMonth = GetPreviusMonth();
        setDate(previousMonth);
    }

    function handleDateClicked(day, currmonth){
        let tmpDate = new Date(date.getFullYear(),date.getMonth(),day);
        if(currmonth){
        }   
        else if(day >= 20){
            tmpDate = GetPreviusMonth() 
        }
        else{
            tmpDate = GetNextMonth() 
        }
        setDate(new Date(tmpDate.getFullYear(),tmpDate.getMonth(),day));
    }
    
    function GetMaxDaysOfPreviousMonth(){
        let preMonth = GetPreviusMonth();
        return new Date(preMonth.getFullYear(),preMonth.getMonth()+1,0).getDate();
    }
    function calc(){
        let daysOfPreviousMonth = GetMaxDaysOfPreviousMonth();
        console.log('maxdays '+daysOfPreviousMonth);
        const daysOfCurrentMonth = GetDaysOfCurrentMonth();
        let previousdays = GetWeekdayOfFirstDay();
        const tmpArray = [];
        previousdays == 0?previousdays = 7:"";
        let cnt = daysOfPreviousMonth-previousdays+2;

        for(let i = 0; i < previousdays-1;i++){
            tmpArray.push({
                day : cnt,
                currMonth: false
            });
            cnt++;
        }
        for(let i = 1; i <= daysOfCurrentMonth;i++){
            tmpArray.push({
                day : i,
                currMonth: true
            });
        }

        const daysLeft = 43 - tmpArray.length; 

        for(let i = 1; i < daysLeft;i++){
            tmpArray.push({
                day : i,
                currMonth: false
            });
        }
        
        setDisplayDatesArray(...[tmpArray]);        
    }

    function GetWeekdayOfFirstDay(){
        return new Date(date.getFullYear(),date.getMonth(),1).getDay();
    }

    function GetPreviusMonth(){
        var tempDateObj = new Date(date.getFullYear(), date.getMonth(), 1);

	   if (tempDateObj.getMonth() == 0) {
            tempDateObj.setFullYear(tempDateObj.getFullYear() - 1);
            tempDateObj.setMonth(11);
        } else {
            tempDateObj.setMonth(tempDateObj.getMonth() - 1);
        }

        var maxDaysOfNextMonth = new Date(tempDateObj.getFullYear(), tempDateObj.getMonth() + 1, 0).getDate();
        if(date.getDate() > maxDaysOfNextMonth)
            tempDateObj.setDate(maxDaysOfNextMonth);
        else
            tempDateObj.setDate(date.getDate());

	    return tempDateObj;
    }

    function GetNextMonth(){
        if (date.getMonth() == 11) {
            var nextMonth = new Date(date.getFullYear() + 1, 0, 1);
        } else {
            var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        }

        var maxDaysOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
        console.log(maxDaysOfNextMonth + "-->" + date.getDate());

        if (date.getDate() > maxDaysOfNextMonth)
            nextMonth.setDate(maxDaysOfNextMonth);

        else
        nextMonth.setDate(date.getDate());

        return nextMonth;
    }

    function GetDaysOfCurrentMonth(){
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    function handleFocus(e){
        setTimeout(function(){ 
            e.target.setSelectionRange(e.target.value.length, e.target.value.length)
        }, 1);

        e.target.classList.remove(styles.unfocusedInput);
        e.target.classList.add(styles.focusedInput);
    }

    function handleFocusoutMonth(e){
        e.target.classList.add(styles.unfocusedInput);
        e.target.classList.remove(styles.focusedInput);
        let found = false;
        for (const iterator of monthNames) {
            if(iterator.toLowerCase().includes(e.target.value.toLowerCase())){
                e.target.value = iterator;
                found = true;
                break;
            }
        }

        if(found){
            date.setMonth(monthNames.indexOf(e.target.value));
            calc();
        }
        else{
            e.target.value = monthNames[date.getMonth()];
        }
        setDate(date);
    }

    function handleFocusoutYear(e){
        e.target.classList.add(styles.unfocusedInput);
        e.target.classList.remove(styles.focusedInput);
        if(e.target.value.length == 4){
            date.setFullYear(e.target.value);
            calc();
        }
        else{
            e.target.value = date.getFullYear();
        }
        setDate(date);
    }

    function handleYearChange(e){
        var newYear = e.target.value;
        if(newYear.length == 4){
            date.setFullYear(newYear);
            setDate(date);
        }
    }
    var handleMonthChange = function(e) {
        var newMonth = monthNames.find((element) => element.toLowerCase() == e.target.value.toLowerCase());
        if(newMonth != undefined)
        date.setMonth(monthNames.indexOf(newMonth));
        setDate(date);
    };

    function handleEnterKeyPressed(e){
        if(e.key == "Enter"){
            e.target.blur();
        }   
    }

    function showDatepicker(){
        const datepickerContainer = document.getElementById('datepickerContainer');

        if(datepickerContainer.classList.contains(styles.hidden)){
            datepickerContainer.classList.remove(styles.hidden);
        }
        else{
            datepickerContainer.classList.add(styles.hidden);
        }
    }

    function handleInputChange(e,input){
        if(input && e.key != 'enter'){
            return;
        }

        const datetimeSplit = e.target.value.split(' ');
        const date = datetimeSplit[0];
        const time = datetimeSplit[1];
    }

    return(
        <>
            <div className={styles.overviewContainer}>
                <div className={styles.inputContainer}>
                    <label>{title}</label>
                    <input onInput={(e)=>handleInputChange(e,true)} id='datetimeInput'></input>
                </div>
                <div className={styles.inputContainer}>
                    <label> </label>
                    <button onClick={showDatepicker} id='pickerPopup Button'>Picker</button>
                </div>
            </div>

            <div id='datepickerContainer' className={`${styles.container} ${styles.hidden}`}>
                <div className={styles.dateHeader}>
                    <svg onClick={changeToPreviousMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
                    <div>
                        <input className={styles.unfocusedInput} onKeyUp={(e)=>handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutMonth(e)} type='text' onChange={handleMonthChange} id='monthInput'/>
                        <input className={styles.unfocusedInput} onKeyUp={(e)=>handleEnterKeyPressed(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleFocusoutYear(e)} type='text' onChange={handleYearChange} id='yearInput'/>
                    </div>
                    <svg onClick={changeToNextMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/></svg>
                </div>
                <div className={styles.dateContainer}>
                        {displayDatesArray.map(({day,currMonth},i) => {
                           return <div onClick={()=>handleDateClicked(day,currMonth)} key={i} className={`${styles.datepickerItem} ${!currMonth?styles.otherMonth:""} ${currMonth && day == date.getDate() ?styles.currMonth:""}`}>  <p>{day}</p> </div>
                        })}
                </div>
            </div>
        </>
    );
}

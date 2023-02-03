import styles from '../styles/datetimepicker.module.css';
import React, { useState ,useEffect, useMemo} from 'react';
import Image from 'next/image';

export default function Datepicker({dateParam = new Date()}){

    const [displayDatesArray,setDisplayDatesArray] = useState([]);
    //const displayDatesArray = [];
    const[date,setDate] = useState(dateParam);
    const monthNames = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    useEffect(() => { 
        calc();
        console.log(date);
    },[date]);

    function changeToNextMonth(){
        const nextMonth = GetNextMonth();
        setDate(new Date(nextMonth.getFullYear(),nextMonth.getMonth(),date.getDate()));
    }

    function changeToPreviousMonth(){
        const previousMonth = GetPreviusMonth();
        setDate(new Date(previousMonth.getFullYear(),previousMonth.getMonth(),date.getDate()));
    }

    function handleDateClicked(day, currmonth){
        if(currmonth){
            setDate(new Date(date.getFullYear(),date.getMonth(),day));
        }
        else if(day >= 20){
            const tmpDate = GetPreviusMonth() 
            setDate(new Date(tmpDate.getFullYear(),tmpDate.getMonth(),day));
        }
        else{
            const tmpDate = GetNextMonth() 
            setDate(new Date(tmpDate.getFullYear(),tmpDate.getMonth(),day));
        }
    }

    function calc(){
        let daysOfPreviousMonth = GetPreviusMonth().getDate();
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
        var tempDateObj = new Date(date);

	    if(tempDateObj.getMonth) {
		    tempDateObj.setMonth(tempDateObj.getMonth() - 1);
	        } else {
		    tempDateObj.setYear(tempDateObj.getYear() - 1);
		    tempDateObj.setMonth(12);
	    }
	    return new Date(date.getFullYear(), date.getMonth(), 0);
    }

    function GetNextMonth(){
        if (date.getMonth() == 11) {
            var nextMonth = new Date(date.getFullYear() + 1, 0, 1);
        } else {
            var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        }

        return nextMonth;
    }

    function GetDaysOfCurrentMonth(){
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    return(
        <>
        <div className={styles.datepickerTestingContainer}>
            <div className={styles.container}>
                <div className={styles.dateHeader}>
                    <svg onClick={changeToPreviousMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
                    <h1>{monthNames[date.getMonth()]} {date.getFullYear()}</h1>
                    <svg onClick={changeToNextMonth} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height="2em" width="2em"><path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/></svg>
                </div>
                <div className={styles.dateContainer}>
                        {displayDatesArray.map(({day,currMonth},i) => {
                           return <div onClick={()=>handleDateClicked(day,currMonth)} key={i} className={`${styles.datepickerItem} ${!currMonth?styles.otherMonth:""} ${currMonth && day == date.getDate() ?styles.currMonth:""}`}>  <p>{day}</p> </div>
                        })}
                    
                </div>
            </div>
        </div>
        </>
    );
}

import dayjs from 'dayjs';
import styles from '../styles/datetimepicker.module.css';

export default function Datepicker({month = new Date().getMonth(),year = new Date().getFullYear()}){
    const firstDateOfMonth = dayjs().month(month).year(year).startOf("month");
    const lastDateOfMonth = dayjs().month(month).year(year).endOf("month");

    const displayDatesArray = [];

    for(let i = 0;i<firstDateOfMonth.day();i++){
        displayDatesArray.push({
            date:firstDateOfMonth.day(i),
            currentMonth: false
        });
    }

    for(let i = firstDateOfMonth.date();i<=lastDateOfMonth.date();i++){
        displayDatesArray.push({
            date:firstDateOfMonth.date(i),
            currentMonth: true
        });
    }

    const remainingDays = 42 - displayDatesArray.length;

    const days = document.querySelectorAll(`${styles.datepickerItem}`);
    console.log(days);


    return(
        <>
        <div className={styles.datepickerTestingContainer}>
            <div className={styles.container}>
                <h1>Jan</h1>
                <div className={styles.dateContainer}>
                        {displayDatesArray.map(({date,currMonth},i) => {
                            return (
                                <>
                                    <div className={styles.datepickerItem}>  <p>{date.date()}</p> </div>
                                </>
                            )
                        })}
                    
                </div>
            </div>
            
        </div>
           
                </>
        
    );
}

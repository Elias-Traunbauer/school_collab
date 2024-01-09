import styles from '../styles/Datetimepicker.module.css'
import Datepicker from '../components/Datepicker'
export default function DateTest(){
    return(
        <div className={styles.datepickerTestingContainer}>
            <Datepicker></Datepicker>
        </div>
    )
}
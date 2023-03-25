import SummaryPost from "../components/SummaryPost";
import styles from "../styles/Summary.module.scss";

export default function SummaryTest() {
    return (
        <div className={styles.testContainer}>
            <SummaryPost></SummaryPost>
        </div>
    )
}
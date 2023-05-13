import React from "react";
import SummaryPostCard from "../components/SummaryPostCard";
import SummaryPost from "../components/SummaryPostCard";
import styles from "../styles/Summary.module.scss";

export default function SummaryTest() {
    return (
        <div className={styles.testContainer}>
            <SummaryPostCard></SummaryPostCard>
        </div>
    )
}
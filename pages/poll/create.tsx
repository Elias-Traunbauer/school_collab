import React from "react";
import styles from "../../styles/PollCreate.module.scss";
import Wizard from "../../components/Wizard";
export default function PollCreate() {
    function nothing() {
        console.log("nothing");
    }
    return (
        <div className={styles.container}>
            <Wizard containerWidth={40} callback={nothing} title={"Poll Erstellen"}></Wizard>
        </div>
    );
}
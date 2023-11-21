import styles from "../../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubjectCollection from "../../components/SubjectCollection";

export default function SummaryList() {
    return (
        <SubjectCollection title={"Summaries"} link={"/summaries"}></SubjectCollection>
    )
}
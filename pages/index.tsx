"use client";

import Link from "next/link";
import styles from "../styles/Index.module.scss";
import Countdown from "../components/Countdown";
import UserContext from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import Assignment from "../models/Assignment";
import AssignmentDashboardItem from "../components/AssignmentDashboardItem";
import { getAssignmentsPreview } from "../services/Assignment.service";
import Image from "next/image";
import assignmentStyles from '../styles/Assignment.module.scss'
import { useRouter } from "next/router";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentCardLoading from "../components/AssigmentCard_Loading";

export default function Home() {
  const router = useRouter();
  const context = useContext(UserContext);

  const [assignmentData, setAssignmentData] = useState<Assignment[]>([]);
  const [displayAssignments, setDisplayAssignments] = useState<Assignment[]>();
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    async function fetchAssignments() {
      const assignments = await getAssignmentsPreview();
      setAssignmentData(assignments);
      setDisplayAssignments(assignments);
    }
    fetchAssignments();
  }, [context]);


  function resetSearch(){
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    searchInput.value = '';
    search();
}

function search(){
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchValue = searchInput.value;
    if(searchValue === ''){
        setDisplayAssignments(assignmentData);
        setSearched(false);
    }
    else{
        const filteredAssignments = assignmentData.filter((assignment) => {
            return assignment.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        setDisplayAssignments(filteredAssignments);
        setSearched(true);
    }
    
}

function handleKeyDown(event){
    if(event.key === 'Enter'){
        search();
    }
}

  return (
    <>
    <div className={styles.indexContainer}>
      <div className={styles.container}>
        <Link className={`${styles.card} ${styles.assignment}`} href={"/assignments"}>
          <h2>Assigments</h2>
        </Link>
        <Link href={"/summaries"} className={`${styles.card} ${styles.summary}`}>
          <h2>Summary</h2>
        </Link>
        <Link href={"/chat"} className={`${styles.card} ${styles.chat}`}>
          <h2>Chat</h2>
        </Link>
        <Link href={"/polls"} className={`${styles.card} ${styles.polls}`}>
          <h2>Polls</h2>
        </Link>
      </div>
    </div>

    <div className={assignmentStyles.assignmentcontainer}>
            <div className={`${assignmentStyles.assignmentheader} ${styles.indexAssignmentheader}`}>
                <div>
                    <h1>Assignments</h1>
                </div>
                

                <div>
                <input onKeyDown={handleKeyDown} id='searchInput' type="text" placeholder="Suche..."></input>
                <button onClick={search}>
                    <Image src="/search.svg" alt="search" width={20} height={20}></Image>
                </button>
                {
                        searched&&
                        <button onClick={resetSearch}>
                            <Image src="/restart.svg" alt="search" width={20} height={20}></Image>
                        </button>
                    }
                </div>
            </div>
            <div className={assignmentStyles.assignmentCardsContainer}>
            {
                displayAssignments?
                displayAssignments.map((element, i) => {
                    return <AssignmentCard key={element.id} assignment={element}></AssignmentCard>
                })
                :
                Array(3).fill(0).map((_, i) => {
                    return <AssignmentCardLoading key={i}></AssignmentCardLoading>
                })
            }
            </div>
        </div>
    </>
      
  );
}

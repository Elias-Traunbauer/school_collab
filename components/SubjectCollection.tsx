import styles from "../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubjectItem from "../components/SubjectItem";
import { Router, useRouter } from "next/router";
import {getSubjects, getSubjectsOfAssignments, getSubjectsOfSummaries} from '../services/Subject.service'
import Subject from "../models/Subject";

export default function SummaryList({title,link}: {title: string, link: string,}) {
  const [subjects,setSubjects] = useState<Subject[]>([]);
  const [displayedSubjects, setDisplayedSubjects] = useState<Subject[]>([]);
  const router = useRouter();

  useEffect(() => {
    if(link == '/summaries') {
      getSubjectsOfSummaries().then((subjects) => {
        setSubjects(subjects);
        setDisplayedSubjects(subjects);
      });
    }
    else if(link == '/assignments') {
      getSubjectsOfAssignments().then((subjects) => {
        setSubjects(subjects);
        setDisplayedSubjects(subjects);
      });
    }
    
  }, []);

  
  function handleSearch(e) {
    const searchValue = e.target.value;
    const filteredSubjects = subjects.filter((subject) => {
      return subject.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setDisplayedSubjects(filteredSubjects);
  }
  function newSubject() {
    router.push(link+'/newSubject');
  }

  return (
    <div className={styles.container}>
    <div className={styles.navBar}>
    <div >
    	<h1>{title}</h1>
      <div>
      <input onChange={handleSearch} placeholder="Search..."></input>
      <button onClick={newSubject}>
        new subject +
      </button>
      </div>
      
    </div>
    </div>
    
    <div className={styles.subjectContainer}>
      <div>
          {
          displayedSubjects.map((subject, i) => {
            return (
              <SubjectItem link={link} subject={subject} key={i/** TODO: subjectId as key */}></SubjectItem>
            )
          })
        }
      </div>
    
              
    </div>

    </div>
      );
}

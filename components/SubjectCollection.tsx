import styles from "../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubjectItem from "../components/SubjectItem";
import { Router, useRouter } from "next/router";

export default function SummaryList({title,link}: {title: string, link: string,}) {
  const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
  const [subjects,setSubjects] = useState(["DBI","M","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"]);
  const [displayedSubjects, setDisplayedSubjects] = useState(subjects);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const router = useRouter();

  
  function handleSearch(e) {
    const searchValue = e.target.value;
    const filteredSubjects = subjects.filter((subject) => {
      return subject.toLowerCase().includes(searchValue.toLowerCase());
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
              <SubjectItem link={link} subject={subject} key={i}></SubjectItem>
            )
          })
        }
      </div>
    
              
    </div>

    </div>
      );
}

import styles from "../../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SummaryPostCard from "../../components/SummaryPostCard";
import SubjectItem from "../../components/SubjectItem";

export default function SummaryList() {
  const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
  const [subjects,setSubjects] = useState(["DBI","M","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"]);
  const [displayedSubjects, setDisplayedSubjects] = useState(subjects);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  function handleSearch(e) {
    const searchValue = e.target.value;
    const filteredSubjects = subjects.filter((subject) => {
      return subject.toLowerCase().includes(searchValue.toLowerCase());
    });
    setDisplayedSubjects(filteredSubjects);
  }

  return (
    <div className={styles.container}>
    <div className={styles.navBar}>
    <div >
    	<h1>Summary</h1>
      <div>
        <input onInput={(e)=>handleSearch(e)} placeholder='Search...'></input>
        <Image onClick={handleDropdownClick} alt="options" width={40} height={40} src={'/more_horiz.svg'}></Image>
        {isDropdownOpen && (
           <div>
              <button>+ Subject</button>
              <button>+ Summary</button>
          </div>
       )}
      </div>
    </div>
    </div>
    
    <div className={styles.subjectContainer}>
      <div>
          {
          displayedSubjects.map((subject, i) => {
            return (
              <SubjectItem subject={subject} key={i}></SubjectItem>
            )
          })
        }
      </div>
    
              
    </div>

    </div>
      );
}

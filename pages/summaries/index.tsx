import styles from "../../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SummaryPostCard from "../../components/SummaryPostCard";
import SubjectItem from "../../components/SubjectItem";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { Router, useRouter } from "next/router";

export default function SummaryList() {
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
    router.push(`/summaries/newSubject`);
  }

  function handleCalllback(text,callbackLoadingText,finishLoading) {
    //delay for 2 seconds
    setTimeout(() => {
      finishLoading();
      const dialog = document.getElementById("dialog") as HTMLDialogElement;
      dialog.close();
      alert(text);
    }, 2000);

  }

  return (
    <div className={styles.container}>
    <div className={styles.navBar}>
    <div >
    	<h1>Summary</h1>
      <div>
      <input onChange={handleSearch} placeholder="Search..."></input>
      <button onClick={newSubject}>
        new subject +
      </button>
      </div>
      
    </div>
    </div>
    
    <div className={styles.subjectContainer}>
    <dialog id="dialog">
        <Wizard contentData={[[new WizardField('Name', 'text', '', true)]]} callback={handleCalllback} title={"New Subject"}></Wizard>
    </dialog>
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

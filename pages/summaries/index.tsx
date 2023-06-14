import styles from "../../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SummaryPostCard from "../../components/SummaryPostCard";

export default function SummaryList() {
  const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
  const [subjects,setSubjects] = useState([{subject:"DBI",showAll:false},{subject:"Math",showAll:false},{subject:"English",showAll:false},{subject:"Science",showAll:false}]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function getPostsBySubject(subject) {
    let result = posts.filter((post) => post.subject === subject);

    if(!subjects[subjects.findIndex((sub) => sub.subject === subject)].showAll)
    return result.slice(0,3);

    return result;
  }

  function changeContent(subject) {
    let tmp = [...subjects];
    tmp[subjects.findIndex((sub) => sub.subject === subject)].showAll = !tmp[subjects.findIndex((sub) => sub.subject === subject)].showAll;
    setSubjects(tmp);
  }

  function GetCountOfSubject (subject) {
    return posts.filter((post) => post.subject === subject).length;
  }
  
  function handleSearch(e) {
    //TODO: implement search
  }

  function switchContentAperance(contentindex) {
    const tmpContent = document.getElementById("content"+contentindex);
    const tmpImage = document.getElementById("expand"+contentindex);

    let children = tmpContent.children;
    if (children.length === 0) return;

    if (!children[0].classList.contains(styles.hiddenElement)) {
      let iterator = 0;
      for (let i = children.length-1; i >= 0 ; i--) {
          children[i].classList.add(styles.hiddenElement);
        iterator++;
      }
      tmpImage.classList.add(styles.rotateExpandImage);
    }
    else {
      for (let i = 0; i < children.length; i++) {
          children[i].classList.remove(styles.hiddenElement);
      }
      tmpImage.classList.remove(styles.rotateExpandImage);
    }
  }

  return (
    <>
    <div className={styles.navBar}>
    	<h1>Summary</h1>
      <div>
        <input onInput={(e)=>handleSearch(e)} placeholder='Search...'></input>
        <Image onClick={handleDropdownClick} alt="options" width={40} height={40} src={'/more_horiz.svg'}></Image>
        {isDropdownOpen && (
           <div>
              <button>New Subject</button>
              <button>New Sumary</button>
          </div>
       )}
      </div>
    </div>
    {
      subjects.filter((subject) => GetCountOfSubject(subject.subject) !== 0).map((subject,i) => {
        return (
          <div key={"card_"+i} className={styles.listContainer}>
            
            <div onClick={()=>switchContentAperance(i)} className={styles.listHeader}>
              <div>
              <Image id={"expand"+i} alt="expand" src={'/expand.svg'} width={20} height={20}></Image>
              <p>{subject.subject}</p>
              </div>
              <p>Alle Anzeigen</p>
            </div>
            <div className={`${styles.postContentContainer}`} id={"content"+i}>
              {
                getPostsBySubject(subject.subject).map((post,i) => {
                  return (
                      <SummaryPostCard key={i}></SummaryPostCard>
                  );
                })
              }
            </div>
          
        </div>
        );
      })
    }
    </>
    
      );
}

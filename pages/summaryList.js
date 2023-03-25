import styles from "../styles/Summary.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SummaryPost from "../components/SummaryPost";

export default function SummaryList() {
  const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
  const [subjects,setSubjects] = useState([{subject:"DBI",showAll:false},{subject:"Math",showAll:false},{subject:"English",showAll:false},{subject:"Science",showAll:false}]);

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
  

  function switchContentAperance(contentindex) {
    const tmpContent = document.getElementById("content"+contentindex);
    const tmpImage = document.getElementById("expand"+contentindex);

    let children = tmpContent.children;
    if (children.length === 0) return;

    if (!children[0].classList.contains(styles.hiddenElement)) {
      let iterator = 0;
      for (let i = children.length-1; i >= 0 ; i--) {
        setTimeout(() => {
          children[i].classList.add(styles.hiddenElement);
        }, 20 * iterator);
        iterator++;
      }
      tmpImage.classList.add(styles.rotateExpandImage);
    }
    else {
      for (let i = 0; i < children.length; i++) {
        setTimeout(() => {
          children[i].classList.remove(styles.hiddenElement);
        }, 20 * i);
      }
      tmpImage.classList.remove(styles.rotateExpandImage);
    }
  }

  return (

      subjects.filter((subject) => GetCountOfSubject(subject.subject) !== 0).map((subject,i) => {
        return (
          <div className={styles.listContainer}>
            <div onClick={()=>switchContentAperance(i)} className={styles.listHeader}>
              <p>{subject.subject}</p>
  	          <Image id={"expand"+i} alt="expand" src={'/expand.svg'} width={20} height={20}></Image>
            </div>
            <div className={`${styles.postContentContainer}`} id={"content"+i}>
              {
                getPostsBySubject(subject.subject).map((post,i) => {
                  return <SummaryPost key={i} className={`${styles.hiddenElement}`} post={post}></SummaryPost>;
                })
              }
              {
                GetCountOfSubject(subject.subject) > 3 ?
                <button onClick={()=>changeContent(subject.subject)}>{subjects[subjects.findIndex((sub) => sub.subject === subject.subject)].showAll? "Show Less" : "Show All"}</button>
                : ""
              }
            </div>
          
        </div>
        );
      }
  ));
}

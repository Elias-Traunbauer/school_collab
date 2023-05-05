import React, { CSSProperties } from "react";
import styles from "../styles/Message.module.scss";
import FileListObject from "./FileListObject";
export default function Message({
  author,
  text,
  createdAt = new Date(1, 1, 1, 1, 1),
  files,
  displayName = false,
  answer,
  handleAnswer,
}: {
    files?: Array<{ name: string; url: string }>;
    author: {id:number; name:string; color:string };
    text: string;
    createdAt?: Date;
    displayName: boolean;
    answer?: { author: {id:number; name:string; color:string }; text: string };
    handleAnswer: ( author: {id:number; name:string; color:string }, text: string ) => void;
}) {
  const mockuser = { id: 1,name: "alo" , color:'blue'};
  function DisplayDate() {
    const hour = createdAt.getHours().toString().padStart(2, "0");
    const minute = createdAt.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  function handleAnswerClicked(){
    if(handleAnswer){
      handleAnswer(author,text);
    }
  }

  return (
    <div style={displayName ? { marginTop: '.3em' } : {}} className={`${styles.wrapper} ${author.id == mockuser.id? styles.wrapRight : styles.wrapLeft}`}>

      {
        author.id == mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleAnswerClicked}></button>
          </div>
        </div>
      }
    

      <div className={`${styles.container} ${author.id == mockuser.id&& styles.ownMessage}`}>
      {displayName && author.id != mockuser.id && (
        <div className={styles.head}>
          <p style={{color:author.color}}>{author.name}</p>
        </div>
      )}

      {answer && (
        <div style={{'--answerColor': answer.author.color} as CSSProperties} className={styles.answer}>
          <div >
            <div className={styles.answerHead}>
              <p style={{color:answer.author.color}}>{answer.author.name}</p>
            </div>
            <div className={styles.answerBody}>
              <p>{answer.text}</p>
            </div>
            
          </div>
          
        </div>
      )}
              {
            files &&
            <div className={styles.fileContainer}>
                {
                     files.map((file,index) => {
                        return (
                            <FileListObject key={"file_"+index} itemKey={index} asCard={false} file={{name:file.name}}></FileListObject>
                        );
                    })
                }
            </div>
        }

      <div className={styles.body}>
        <p>{text}</p>
      </div>
      

      
      <div className={styles.foot}>
        <p>{DisplayDate()}</p>
      </div>
    </div>
    {
        author.id != mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleAnswerClicked} ></button>
          </div>
        </div>
      }
    
    </div>
    
  );
}

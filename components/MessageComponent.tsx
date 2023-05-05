import React, { CSSProperties } from "react";
import styles from "../styles/Message.module.scss";
import FileListObject from "./FileListObject";
import Message from "../models/Message";
export default function MessageComponent({
  message,
  displayName = false,
  handleAnswer,
}: {
    message:Message,
    displayName: boolean;
    handleAnswer: (answer:Message) => void;
}) {
  const mockuser = { id: 2,name: "alo" , color:'blue'};
  function DisplayDate() {
    const hour = message.createdAt.getHours().toString().padStart(2, "0");
    const minute = message.createdAt.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  function handleAnswerClicked(){
    if(handleAnswer){
      handleAnswer(message);
    }
  }

  function handleDownload(){
    alert('download');
  }

  return (
    <div style={displayName ? { marginTop: '.3em' } : {}} className={`${styles.wrapper} ${message.author.id == mockuser.id? styles.wrapRight : styles.wrapLeft}`}>

      {
        message.author.id == mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleAnswerClicked}></button>
          </div>
        </div>
      }
    

      <div className={`${styles.container} ${message.author.id == mockuser.id&& styles.ownMessage}`}>
      {displayName && message.author.id != mockuser.id && (
        <div className={styles.head}>
          <p style={{color:message.author.color}}>{message.author.name}</p>
        </div>
      )}

      {message.answer && (
        <div style={{'--answerColor': message.answer.author.color} as CSSProperties} className={styles.answer}>
          <div >
            <div className={styles.answerHead}>
              <p style={{color:message.answer.author.color}}>{message.answer.author.name}</p>
            </div>
            <div className={styles.answerBody}>
              <p>{message.answer.text}</p>
            </div>
            
          </div>
          
        </div>
      )}
              {
            message.files.length > 0 &&
            <div className={styles.fileContainer}>
              
                {
                     message.files.map((file,index) => {
                        return (
                            <FileListObject downloadFunction={handleDownload} downloadabel={true} key={"file_"+index} itemKey={index} asCard={false} file={{name:file.name}}></FileListObject>
                        );
                    })
                }
            </div>
        }

      <div className={styles.body}>
        <p>{message.text}</p>
      </div>
      

      
      <div className={styles.foot}>
        <p>{DisplayDate()}</p>
      </div>
    </div>
    {
        message.author.id != mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleAnswerClicked} ></button>
          </div>
        </div>
      }
    
    </div>
    
  );
}

import React, { CSSProperties, useContext, useEffect, useState } from "react";
import styles from "../styles/MessageComponent.module.scss";
import FileListObject from "./FileListObject";
import ChatMessage from "../models/ChatMessage";
import UserContext from "./UserContext";
import User from "../models/User";
import {getChatMessageById} from '../services/Chat.service';
export default function MessageComponent({
  key,
  message,
  displayName = false,
  handleAnswer,
  callBackAnswerClicked
}: {
    key?:any;
    callBackAnswerClicked?: Function;
    message:ChatMessage,
    displayName: boolean;
    handleAnswer: (answer:ChatMessage) => void;
}) {

  const context = useContext(UserContext);
  const [replyMessage, setReplyMessage] = useState<ChatMessage>();

  useEffect(() => {
    if(message.replyMessageId){
      async function fetchData(){
        const res = await getChatMessageById(message.replyMessageId);
        setReplyMessage(res);
      }
      fetchData();
    }
  }, []);

  function DisplayDate() {
    message.created = new Date(message.created);
    const hour = message.created.getHours().toString().padStart(2, "0");
    const minute = message.created.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  function handleMessageClicked(){
    if(handleAnswer){
      handleAnswer(message);
    }
  }

  function handleAnswerClicked(e){
    if(e)
    callBackAnswerClicked(e);
  }

  function handleDownload(){
    alert('download');
  }

  return (
    <div id={`message${message.id}`} style={displayName ? { marginTop: '.3em' } : {}} className={`${styles.wrapper} ${message.userId == context.userContext.id? styles.wrapRight : styles.wrapLeft}`}>

      {
        message.userId == context.userContext.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleMessageClicked}></button>
          </div>
        </div>
      }
    

      <div className={`${styles.container} ${message.userId == context.userContext.id&& styles.ownMessage}`}>
      {displayName && message.userId != context.userContext.id && (
        <div className={styles.head}>
          <p>{message.user.username}</p>
        </div>
      )}


      {
        
      message.replyMessageId && (
        <div onClick={handleAnswerClicked} className={styles.answer}>
          <div >
            <div className={styles.answerHead}>
              <p style={{color:'--answerColor'}}>{replyMessage.user.username}</p>
            </div>
            <div className={styles.answerBody}>
              <p>{replyMessage.content}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.body}>
        <p>{message.content}</p>
      </div>
      

      
      <div className={styles.foot}>
        <p>{DisplayDate()}</p>
      </div>
    </div>
    {
        message.userId != context.userContext.id&&
        <div className={styles.popUp}>
          <div>
            <button onClick={handleMessageClicked} ></button>
          </div>
        </div>
      }
    
    </div>
    
  );
}

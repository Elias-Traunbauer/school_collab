import React from "react";
import styles from "../styles/Message.module.scss";
import FileListObject from "./FileListObject";
export default function Message({
  author,
  text,
  createdAt = new Date(1, 1, 1, 1, 1),
  files,
  displayName = false,
}: {
    files?: [{ name: string; url: string }];
    author: {id:number; name:string; color:string };
    text: string;
    createdAt?: Date;
    displayName: boolean;
}) {
  const mockuser = { id: 1,name: "alo" , color:'blue'};
  function DisplayDate() {
    const hour = createdAt.getHours().toString().padStart(2, "0");
    const minute = createdAt.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  return (
    <div style={displayName ? { marginTop: '.3em' } : {}} className={`${styles.wrapper} ${author.id == mockuser.id? styles.wrapRight : styles.wrapLeft}`}>

      {
        author.id == mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button></button>
          </div>
        </div>
      }
    

      <div className={`${styles.container} ${author.id == mockuser.id&& styles.ownMessage}`}>
      {displayName && author.id != mockuser.id && (
        <div className={styles.head}>
          <p style={{color:author.color}}>{author.name}</p>
        </div>
      )}
      <div className={styles.body}>
        <p>{text}</p>
      </div>
      
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
      
      <div className={styles.foot}>
        <p>{DisplayDate()}</p>
      </div>
    </div>
    {
        author.id != mockuser.id&&
        <div className={styles.popUp}>
          <div>
            <button></button>
          </div>
        </div>
      }
    
    </div>
    
  );
}

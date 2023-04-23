import React from "react";
import styles from "../styles/Message.module.scss";
import FileListObject from "./FileListObject";
export default function Message({
  author,
  text,
  createdAt = new Date(1, 1, 1, 1, 1),
  files,
}: {
    files?: [{ name: string; url: string }];
    author: { name; color } | null;
    text: string;
    createdAt?: Date;
}) {
  const mockuser = { name: "alo" };
  function DisplayDate() {
    const hour = createdAt.getHours().toString().padStart(2, "0");
    const minute = createdAt.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  return (
    <div className={styles.container}>
      {author && (
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
  );
}

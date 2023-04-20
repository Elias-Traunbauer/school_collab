import React from "react";
import styles from "../styles/MarkdownEditor.module.scss";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { text } from "stream/consumers";

export default function MarkdownEditor({ containerWidth = 50}) {
    const [promode, setPromode] = React.useState(false);
    const [mdText, setMdText] = React.useState('');
    function highlight(){
      const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
      setMdText(textArea.value);
    }
  return (
    <div style={{ width: containerWidth + "%" }} className={styles.container}>
      <div className={styles.head}>
        <div className={`${styles.img}`}>
          <div className={styles.imgHeading}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgCode}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgLink}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgBlockQuote}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgBold}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgItalic}></div>
        </div>
        <div className={`${styles.img}`}>
          <div className={styles.imgBulletpoint}></div>
        </div>
        <div title="checkBox" className={`${styles.img}`}>
          <div  className={styles.imgcheckBox}></div>
        </div>
        <div className={`${styles.img}`}>
            <input onClick={()=>setPromode(!promode)} type="CheckBox"></input>
                <span className={styles.tooltipText}>Tooltip text</span>
        </div>
       
      </div>
      <div className={styles.content}>
        <textarea id='textArea' onInput={highlight}></textarea>  
        {
          promode && mdText.length > 0 &&
          <div>
            <ReactMarkdown>{mdText}</ReactMarkdown>
          </div>
        }
        
      </div>
    </div>

  );
}

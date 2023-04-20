import React from "react";
import styles from "../styles/MarkdownEditor.module.scss";
import Image from "next/image";
export default function MarkdownEditor({ containerWidth = 50}) {
    const [promode, setPromode] = React.useState(false);

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
        <textarea></textarea>
      </div>
    </div>

  );
}

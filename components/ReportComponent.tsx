import styles from "../styles/AdminReports.module.scss";
import Report from "../models/Report";
import Image from "next/image";
import { useState } from "react";
export default function ReportComponent({ report,callback }: { report: Report,callback:Function }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  function toggleExpand(){
    setExpanded(!expanded)   
  }

  function deleteReport(){
    callback(report.id)
  }

  return (
    <div className={styles.componentContainer}>
      <div onClick={!expanded?toggleExpand:null} className={`${styles.componentHeader} ${!expanded&&styles.pointer}`}>
        <div>
          <Image
            width={10}
            height={10}
            src={"/person.svg"}
            alt={"profile"}
          ></Image>
          <p>John Doe</p>
        </div>
        <p>Thomas verhält sich nicht gut</p>
        <button onClick={expanded?toggleExpand:null}>
          <Image
            width={10}
            height={10}
            src={"/chevron.svg"}
            alt={"down"}
          ></Image>
        </button>
      </div>
      {expanded && (
        <div className={styles.componentBody}>
          <div>
            <span>Erstellt:</span>
            <p>10.10.2023</p>
          </div>
          <div>
            <span>Grund:</span>
            <p>Schlechtes Benehmen</p>
          </div>
          <div className={styles.attachments}>
            <span>Anhang:</span>
            <div className={styles.noAttachments}>
              <h3>Kein Anhang</h3>
              <p>Es wurde kein Anhang hinzugefügt</p>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={deleteReport} className="btn btn-primary">gelesen</button>
          </div>
        </div>
      )}
    </div>
  );
}

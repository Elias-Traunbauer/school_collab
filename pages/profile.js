import File_Upload from "../components/file_upload";
import styles from "../styles/profilepic.module.css"
import { useEffect, useState } from "react";

export default function Profile ({ children }) {
    useEffect(() => {
        
      });

    const [showFileUpload, setShowFileUpload] = useState(false);
    const onClick = () => setShowFileUpload(true);

    return( 
        <>
            <div className={styles.container} onClick={onClick}></div>
            {showFileUpload ? <File_Upload/> : null}
        </>
    )
}
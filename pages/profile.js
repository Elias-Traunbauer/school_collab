import File_Upload from "../components/file_upload";
import {openDialog} from '../components/Dialog';
import styles from "../styles/profilepic.module.css"
import { useState } from "react";
import Image from "next/image";

export default function Profile ({ children }) {
    const fileExtensions = ["jpeg", "jpg", "png"];
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);

    const onClick = () => 
    {
        setUploadFile([]);
        setFileUploaded(!fileUploaded);
    }

    
    function handleFileUpdate(list){
        if(list != null)
        {
            setUploadFile([...uploadFile, ...list]);
            setFileUploaded(true);
        }
    }

    /*function getImage(){
        var e = 
    }*/
    /*{fileUploaded ? <Image src={getImage()}/> : null}*/

    return( 
        <>
            <div className={styles.container} onClick={onClick}>
                
            </div>
            {(showFileUpload && !fileUploaded) ? <File_Upload fileExtentions={fileExtensions} title={"Profile Picture"} handleFilesUpdated={fileUploaded ? "" : (uploadFile) => handleFileUpdate(uploadFile)}/> : null} 
        
            
        </>
    )
}
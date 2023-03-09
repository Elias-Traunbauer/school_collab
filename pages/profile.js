import File_Upload from "../components/file_upload";
import {openDialog} from '../components/Dialog';
import styles from "../styles/profilepic.module.css"
import { useState } from "react";

export default function Profile ({ children }) {
    const fileExtensions = ["jpeg", "jpg", "png"];
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);
    const onClick = () => setShowFileUpload(!showFileUpload);
    const [fileUploaded, setFileUploaded] = useState(false);

    
function handleFileUpdate(list){
        if(list != null)
        {
            setUploadFile([...uploadFile, ...list]);
            setFileUploaded(false);
        }
    }

    /*function handleOpenDialog(id){
        


        openDialog(id);
        document.getElementById("fileName").value = uploadFile.name;
    }*/

    return( 
        <>
            <div className={styles.container} onClick={onClick}></div>
            {showFileUpload ? <File_Upload fileExtentions={fileExtensions} title={"Profile Picture"} handleFilesUpdated={fileUploaded ? (uploadFile) => handleFileUpdate(uploadFile) : handleFileUpdate(null)}/> : null}
            
            <div>
                <div>
                    {uploadFile.length > 0 ? 
                    (<>
                        <ul>
                            <li id="fileName" onClick={() => handleOpenDialog("alo")}>
                                <p>{fileUploaded ? null : uploadFile}</p>                                        
                            </li>
                        </ul>
                    </>) : (<></>)}
                </div>
            </div>
        </>
    )
}
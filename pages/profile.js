import File_Upload from "../components/file_upload";
import Wizard from '../components/wizard';
import styles from "../styles/profile.module.css"
import { useState } from "react";

export default function Profile() {
    let userDummy = {
        userName: "bedabinguin",
        firstName: "Peter",
        lastName: "Frey",
    }

    const fileExtensions = ["jpeg", "jpg", "png"];
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);

    function picOnClick()
    {
        setShowFileUpload(true);
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

    function changePassword(e){
        e.preventDefault();
        setPasswordChange(true);
    }

    const contentData = [{
        password: true,
      },
      {
        new_password: true,
        retype_new_password: true
      }];

      function callback(data,setText,finishLoading){
        console.log(data);
    
        setTimeout(() => {
           setText("almost done");
          }, 1000);

          setTimeout(() => {
            finishLoading();
            setTimeout(() => {
                setPasswordChange(false);
              }, 500);
          }, 4000);

        //backend
      }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.pic} onClick={picOnClick}></div>

                <form className={styles.infos}>
                    <label>Username: {userDummy.userName}</label>
                    <label>Firstname: {userDummy.firstName}</label>
                    <label>Lastname: {userDummy.lastName}</label>
                    <button onClick={(e) => changePassword(e)}>change password</button>
                </form> 

                {passwordChange ? <Wizard callback={callback} containerWidth={20} contentData={contentData} title='Change password'/> : null} 
            </div>   
            
            {(showFileUpload && !fileUploaded) ? <File_Upload fileExtentions={fileExtensions} title={"Profile Picture"} handleFilesUpdated={fileUploaded ? "" : (uploadFile) => handleFileUpdate(uploadFile)}/> : null}        
        </>
    )
}
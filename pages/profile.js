import File_Upload from "../components/file_upload";
import Image from "next/image";
import Wizard from '../components/wizard';
import styles from "../styles/profile.module.css"
import { useState } from "react";
import Link from "next/link";

export default function Profile() {
    let userDummy = {
        userName: "bedabinguin",
        firstName: "Peter",
        lastName: "Frey",
    }

    let newAccount = "";



    const fileExtensions = ["jpeg", "jpg", "png"];
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [links, setLinks] = useState(["https://www.google.com", "https://www.youtube.com"]);
    const [linkAdded, setLinkAdded] = useState(false);
    const [linkDeleted, setLinkDeleted] = useState(false);

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

      function printLinks(){
            return links.map((link) => {
                if(link != null)
                    return <div><Link className={styles.Link} key={link} href={link} rel="noopener noreferrer" target="_blank">{link}</Link> 
                                { linkDeleted ? <Image onClick={(e) => deleteItem(e,i)} className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"/> : null }
                            </div>
            })
      }

      function addLink(e){
        e.preventDefault();
        /*newAccount = prompt("Enter link");
        addAccount(newAccount);*/

        setLinkAdded(true);
      }

      function addLink(e){
        e.preventDefault();

        setLinkDeleted(true);
      }

      function addAccount(newAcc){
            setLinks([...links, newAcc]);
            setLinkAdded(false);
      }
      function stopAddAccount(){
            setLinkAdded(false);
      }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.pic} onClick={picOnClick}></div>

                <div>
                    <div className={styles.userData}>
                        <form className={styles.infos}>
                            <button onClick={(e) => changePassword(e)}>change password</button>
                            <label>Username: {userDummy.userName}</label>
                            <label>Firstname: {userDummy.firstName}</label>
                            <label>Lastname: {userDummy.lastName}</label>
                        </form> 

                        <form className={styles.infos}>
                            <div className={styles.infobutton}>
                                <button onClick={(e) => addLink(e)}>link acc</button>
                                <button onClick={(e) => deleteLink(e)}>delete acc</button>
                            </div>
                            
                            {links != [] ? printLinks() : null}
                            {linkAdded ? <div><input type="text" placeholder="Enter link" onChange={(e) => newAccount = e.target.value}/>
                                <button onClick={() => addAccount(newAccount)}>add</button>
                                <button onClick={() => stopAddAccount()}>cancel</button></div> : null}
                            
                        </form>
                    </div>
                    {passwordChange ? <Wizard callback={callback} containerWidth={20} contentData={contentData} title='Change password'/> : null}
                </div>

            </div>      

            <div className={styles.fileUpload}>
            {(showFileUpload && !fileUploaded) ? <File_Upload fileExtentions={fileExtensions} title={"Profile Picture"} handleFilesUpdated={fileUploaded ? "" : (uploadFile) => handleFileUpdate(uploadFile)}/> : null}
            </div>
                    
        </>
    )
}
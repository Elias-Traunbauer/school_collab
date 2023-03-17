import File_Upload from "../components/file_upload";
import { showDecisionDialog } from "../components/Dialog";
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

    function changePasswordOnClick(e){
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

        /*{ linkDeleted ? <button className={styles.cancelbutton} onClick={(e) => deleteAccount(e, links.indexOf(link))}/> : null } */

      function printLinks(){
            return links.map((link) => {
                if(link != null)
                    return <div className={styles.Link}>
                                <Link key={link} href={link} rel="noopener noreferrer" target="_blank">{link}</Link>
                                { linkDeleted ? <button className={styles.cancelbutton} onClick={(e) => {
                                    deleteAccount(e, links.indexOf(link)); 
                                    links == [] ? setLinkDeleted(false) : null;}}/> 
                                    : null }
                            </div>
            })
      }

      function deleteAccount(e, key){
        e.preventDefault();

        const tmpList = [];
        for (let i = 0; i < links.length; i++) {
            if(i != key)
            tmpList.push(links[i]);
        }
        setLinks(tmpList);
        
      }


      function addLinkOnClick(e){
        e.preventDefault();

        setLinkAdded(true);
      }

      function deleteLinkOnClick(e){
        e.preventDefault();

        if(links != [])
            setLinkDeleted(true);
      }

      function addAccountOnClick(newAcc){
            const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
            
            if(pattern.test(newAcc)){
                setLinks([...links, newAcc]);
            }
            setLinkAdded(false);
      }
      function stopAddAccountOnClick(e){
            e.preventDefault();
            setLinkAdded(false);
      }

      function submitDeleteOnClick(e){
            e.preventDefault();
            setLinkDeleted(false);
      }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.pic} onClick={picOnClick}></div>

                <div>
                    <div className={styles.userData}>
                        <form className={styles.infos}>
                            <button onClick={(e) => changePasswordOnClick(e)}>change password</button>
                            <label>Username: {userDummy.userName}</label>
                            <label>Firstname: {userDummy.firstName}</label>
                            <label>Lastname: {userDummy.lastName}</label>
                        </form> 

                        <form className={styles.infos}>
                            <div>
                                <button className={styles.button} onClick={(e) => addLinkOnClick(e)}>link acc</button>
                                <button className={styles.button} onClick={(e) => deleteLinkOnClick(e)}>delete acc</button>
                            </div>
                            
                            {links != [] ? printLinks() : null}
                            {linkAdded ? <div><input type="text" placeholder="Enter link" onChange={(e) => newAccount = e.target.value}/>
                                <button onClick={() => addAccountOnClick(newAccount)}>add</button>
                                <button onClick={(e) => stopAddAccountOnClick(e)}>cancel</button></div> : null}
                            
                            {linkDeleted ? <div className={styles.submit}><button className={styles.button} onClick={(e) => submitDeleteOnClick(e)}>submit</button></div> : null}
                        </form>
                    </div>
                    {passwordChange ? <Wizard callback={callback} containerWidth={5} contentData={contentData} title='Change password'/> : null}
                </div>

            </div>      

            <div className={styles.fileUpload}>
            {(showFileUpload && !fileUploaded) ? <File_Upload fileExtentions={fileExtensions} title={"Profile Picture"} handleFilesUpdated={fileUploaded ? "" : (uploadFile) => handleFileUpdate(uploadFile)}/> : null}
            </div>
                    
        </>
    )
}
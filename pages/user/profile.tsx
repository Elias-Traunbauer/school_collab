import Wizard from '../../components/Wizard';
import WizardField from '../../models/WizardField';
import styles from "../../styles/Profile.module.scss"
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
    let userDummy = {
        userName: "bedabinguin",
        firstName: "Peter",
        lastName: "Frey",
    }

    const contentData = [[new WizardField('Type in your password','text',{value:true,text:'asdasdasdasd'},true),new WizardField('Type in your new password','text',[{value:1,displayText:'password'},{value:1,displayText:'süba'},{value:1,displayText:'süba'}],true)]]

    const [passwordChange, setPasswordChange] = useState(false);
    const [pictureClicked, setPictureClicked] = useState(false);

    function changePasswordOnClick(e){
        e.preventDefault();
        setPasswordChange(true);
    }


    function openFileExplorer(){
        document.getElementById('file').click();
    }

    function handleFileChanged(e){
        var profilePic = document.getElementById('pic');

        /*if(e.target.files.length > 0)
            profilePic.setAttribute('src',URL.createObjectURL(e.target.files[0]));*/
        

        setPictureClicked(!pictureClicked);
    }

    function callback(){
        setPasswordChange(false);
    }

    return( 
        <>
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.container}>
                <input type="file" id="file" hidden={true} onChange={(e) => handleFileChanged(e)}/>
                {
                    pictureClicked ? <Image id='pic' width={150} height={150} alt='Pic' src='/cancelicon.svg' onClick={() => setPictureClicked(!pictureClicked)} className={styles.pic}></Image>
                                   : <Image id='pic' width={250} height={250} alt='Pic' src='/cancelicon.svg' onClick={() => setPictureClicked(!pictureClicked)} className={styles.pic}></Image>
                }
                </div>

                <div>
                    <div>
                        <form className={styles.infos}>
                            <label htmlFor='username'><span>Username:</span></label>
                            <input value={userDummy.userName} id='username'/>
                            <label htmlFor='firstName'><span>Firstname:</span></label>
                            <input value={userDummy.firstName} id='firstName'/>
                            <label htmlFor='lastName'><span>Lastname:</span></label>
                            <input value={userDummy.lastName} id='lastName'/>
                            <button className='btn' onClick={(e) => changePasswordOnClick(e)}>change password</button>
                        </form> 
                    </div>
                    {passwordChange ? <Wizard callback={callback} containerWidth={5} contentData={contentData} title='Change password'/> : null}
                </div>

            </div>
        </div>
        </>
    )
}
import Wizard from '../../components/Wizard';
import WizardField from '../../models/WizardField';
import styles from "../../styles/Profile.module.scss";
import { useState } from "react";
import Image from "next/image";
import AccountLinking from '../../components/AccountLinking';

export default function Profile() {
    let userDummy = {
        userName: "bedabinguin",
        firstName: "Peter",
        lastName: "Frey",
    }

    const contentData = [[new WizardField('Type in your password','text',{value:true,text:'asdasdasdasd'},true),new WizardField('Type in your new password','text',[{value:1,displayText:'password'},{value:1,displayText:'süba'},{value:1,displayText:'süba'}],true)]]

    const [passwordChange, setPasswordChange] = useState(false);

    function changePasswordOnClick(e){
        e.preventDefault();
        setPasswordChange(true);
    }


    function openFileExplorer(){
        document.getElementById('file').click();
    }

    function handleFileChanged(e){
        var profilePic = document.getElementById('pic');

        profilePic.setAttribute('src',URL.createObjectURL(e.target.files[0]));
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

                <Image id='pic' width={20} height={20} alt='Pic' src='/cancelicon.svg' onClick={openFileExplorer} className={styles.pic}>

                </Image>    
                <button className='btn' onClick={openFileExplorer}>Change</button>
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
                    {passwordChange ? <Wizard containerWidth={5} returnPath='/user/profile' callback={() => callback()} contentData={contentData} title='Change password'/> : null}
                </div>

            </div>
        </div>
        <AccountLinking/>
        </>
    )
}
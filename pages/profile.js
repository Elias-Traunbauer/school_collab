import Wizard from '../components/wizard';
import styles from "../styles/profile.module.scss"
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
    let userDummy = {
        userName: "bedabinguin",
        firstName: "Peter",
        lastName: "Frey",
    }

    const [passwordChange, setPasswordChange] = useState(false);

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


    function openFileExplorer(){
        document.getElementById('file').click();
    }

    return( 
        <>
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.container}>
                <input type="file" id="file" hidden={true} onChange={(e) => handleFileChanged(e)}/>

                <Image width={20} height={20} alt='Pic' src='/cancelicon.svg' onClick={openFileExplorer} className={styles.pic}>

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
                    {passwordChange ? <Wizard callback={callback} containerWidth={5} contentData={contentData} title='Change password'/> : null}
                </div>

            </div>
        </div>
        </>
    )
}
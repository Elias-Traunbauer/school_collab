import { useState } from 'react'
import MarkdownEditor from '../../components/MarkdownEditor'
import styles from '../../styles/CreateChat.module.scss'
import Image from 'next/image'
export default function CreateChat() {
    const [profile, setProfile] = useState('/person.svg')
    const [members, setMembers] = useState(["Du","Thomas"])

    function hanldeProfileClicked() {
        const fileInput = document.getElementById('file') as HTMLInputElement
        fileInput.click()
    }

    function handleChangeProfile() {
        const fileInput = document.getElementById('file') as HTMLInputElement
        const file = fileInput.files[0]

        if (!file) return

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=> {
            const result = e.target.result;
            setProfile(result as string);
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <div>
                    <h1>Create Chat</h1>
                </div>
 
                <div>
                    <div>
                        <button onClick={hanldeProfileClicked}>
                            <Image src={`${profile}`} alt="Picture" width={50} height={50}></Image>
                        </button>
                    </div>

                    <label>Chatname *</label>
                    <input type="text" placeholder="Chatname" />

                    <div>
                        <div>
                            <label>Chatbeschreibung</label>
                        </div>
                        <MarkdownEditor containerWidth={85}></MarkdownEditor>
                    </div>

                    <div>
                        <p>Members</p>
                        <div>
                        {
                            members.map((member, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <Image src="/person.svg" alt="person" width={20} height={20}></Image>
                                            <p>{member}</p>
                                        </div>
                                        <button>
                                            <Image src="/delete.svg" alt="delete" width={20} height={20}></Image>
                                        </button>
                                    </div>
                                )
                            }
                            )
                        }
                        </div>
                        
                    </div>

                </div>
            </div>
            <input onChange={handleChangeProfile} accept="image/*" type="file"  id="file" hidden></input>
        </div>
    )
}
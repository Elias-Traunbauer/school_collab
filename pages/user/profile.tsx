import styles from "../../styles/Profile.module.scss";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { json } from "stream/consumers";
import { getUser } from "../../services/User.service";
import UserDisplayDTO from "../../models/UserDisplayDTO";

export default function Profile() {
    const [user,setUser] = useState<UserDisplayDTO>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const data = [[new WizardField('Plattform', 'text', '', true),new WizardField('Link zu Ihrem Profil', 'text', '', true)]];

    const [links, setLinks] = useState([["github", "www.github.com"], ["google", "www.google.com"], ["yahoo", "www.yahoo.com"], ["bing", "www.bing.com"]]);
    const [addLink, setAddLink] = useState(false);

    useEffect(() => {
        async function fetchDataAsync() {
            getUser().then((res) => {
                var newUser = user;
                newUser.username = res.username;
                newUser.firstName = res.firstName;
                newUser.lastName = res.lastName;
                newUser.email = res.email;
                //subject not implemented yet
                setUser(newUser);
                
            }).catch((err) => {
                
            });
        }
        fetchDataAsync();
    },[user]);

    function removeLink(link: string[]){
        const newLinks = links.filter((l) => l !== link);
        
        setLinks(newLinks);
    }

    function handleSubmit(e){
        e.preventDefault();
        var newLinks = links;

        const inputs = document.querySelectorAll(
            "input[type=text]"
        ) as unknown as HTMLInputElement[];

        newLinks.push([inputs[0].value, inputs[1].value]);
        setLinks(newLinks);
        setAddLink(false);
    }

    function openFileExplorer(){
        const fileInput = document.getElementById("upload");
        fileInput.click();
    }

    function handleInputChange(e){
        if(!e.target.files || e.target.files.length === 0) return console.log("No file selected");

        const file = e.target.files[0];
        const pic = document.getElementById("profilePic");
        pic.setAttribute("src", URL.createObjectURL(file));
    }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.picContainer}>
                    <Image id="profilePic" src={"/jpg.svg"} alt="cancel" width={150} height={150} onClick={openFileExplorer}/>
                    <input id="upload" type="file" hidden onChange={handleInputChange}></input>
                </div>

                {}

                {addLink && (
                    <div className={styles.wizard}>
                        <form onSubmit={handleSubmit}>
                            <h1>Account hinzufügen</h1>

                            <div className={styles.inputfield}>
                                <label>Plattform*</label>
                                <p>z.B. GitHub</p>
                                <input required type="text" placeholder="Plattform" />
                            </div>

                            <div className={styles.inputfield}>
                                <label>Link zu Ihrem Account*</label>
                                <p>z.B. www.github.com/username</p>
                                <input required type="text" placeholder="Link zu Ihrem Account" />  
                            </div>

                            <div className={styles.buttonContainer}>
                                <button onClick={() => setAddLink(false)}>Abbrechen</button>
                                <input type="submit" value={"Speichern"} ></input>
                            </div>
                        </form>
                    </div>
                )}

                <div className={styles.infoContainer}> 
                <div>
                        {Object.values(user).map((value, index) => {
                            
                            return (
                                <div key={index}>
                                    <label>{Object.keys(user)[index]}</label>
                                    <p>{value}</p>
                                </div>
                            )

                        })}
                    </div>
                    <div>
                        {links.map((link, index) => {
                            return (
                                <div className={styles.linkContainer} key={index}>
                                    <Image src={"/jpg.svg"} width={20} height={20} alt="cancel"></Image>
                                    <Link href={"https://" + link[1]} target="blank">{link[0]}</Link>
                                    <button className="btn-primary" onClick={() => removeLink(link)} disabled={addLink}>X</button>
                                </div>
                            )
                            
                        }
                        )}

                        <div>
                            <button onClick={() => setAddLink(true)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
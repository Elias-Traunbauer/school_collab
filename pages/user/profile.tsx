import styles from "../../styles/ProfilePage.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "../../services/User.service";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import { useRouter } from "next/router";

export default function Profile() {
    const [user,setUser] = useState<UserDisplayDTO>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const fields = ["Username", "Firstname", "Lastname", "E-mail"];
    
    const router = useRouter();
    const [links, setLinks] = useState([["github", "www.github.com"], ["google", "www.google.com"], ["yahoo", "www.yahoo.com"], ["microsoft", "www.microsoft.com"]]);
    const [addLink, setAddLink] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);	

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

        router.prefetch("./newAuthentication");
    },[router]);

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
                    <Image id="profilePic" src={"/schönemann.png"} alt="cancel" width={150} height={150} onClick={openFileExplorer}/>
                    <input id="upload" type="file" hidden onChange={handleInputChange}></input>
                </div>

                {}

                {addLink && (
                    <div className={styles.wizard}>
                        <form onSubmit={handleSubmit}>
                            <h1>Add account</h1>

                            <div className={styles.inputfield}>
                                <label>Website*</label>
                                <p>z.B. GitHub</p>
                                <input required type="text" placeholder="Website" />
                            </div>

                            <div className={styles.inputfield}>
                                <label>Link to your account*</label>
                                <p>e.g. www.github.com/username</p>
                                <input required type="text" placeholder="Link to your account" />  
                            </div>

                            <div className={styles.buttonContainer}>
                                <button onClick={() => setAddLink(false)}>Cancel</button>
                                <input type="submit" value={"Save"} ></input>
                            </div>
                        </form>
                    </div>
                )}

                <div className={styles.infoContainer}> 
                <div>
                    <div>
                        {Object.values(user).map((value, index) => {
                            
                            return (
                                <div key={index}>
                                    <label>{fields[index]}</label>
                                    <p>{value}</p>
                                </div>
                            )

                        })}
                    </div>

                    <div>
                        <div>
                            <label>2 factor authentication</label>
                            {twoFactorAuth ? <button className="btn-secondary">deactivate</button> : <button className="btn-primary" onClick={() => router.push("./newAuthentication")}>activate</button>}
                        </div>
                    </div>
                </div>

                <div>
                    {links.map((link, index) => {
                        return (
                            <div className={styles.linkContainer} key={index}>
                                <Image src={"/" + link[0] + ".svg"} width={20} height={20} alt="cancel"></Image>
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
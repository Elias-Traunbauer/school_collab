import styles from "../../styles/Profile.module.scss";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
    const user = {
        username: "if190135",
        firstname: "Luca",
        lastname: "Fuchsjäger",
        class: "5BHIF",
    }

    const [links, setLinks] = useState(["github", "google", "yahoo", "bing"]);

    function removeLink(link: string){
        const newLinks = links.filter((l) => l !== link);
        setLinks(newLinks);
    }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.picContainer}>
                    <Image src={"/jpg.svg"} alt="cancel" width={150} height={150} />
                </div>
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
                        <div>
                            <button>+</button>
                        </div>

                        {links.map((link, index) => {
                            return (
                                <div className={styles.linkContainer} key={index}>
                                    <Image src={"/jpg.svg"} width={20} height={20} alt="cancel"></Image>
                                    <label>{link}</label>
                                    <p>{link}_Name</p>
                                    <button className="btn-primary" onClick={() => removeLink(link)}>X</button>
                                </div>
                            )
                            
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
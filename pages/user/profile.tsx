import styles from "../../styles/Profile.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { json } from "stream/consumers";

export default function Profile() {
    const user = {
        username: "if190135",
        firstname: "Luca",
        lastname: "Fuchsjäger",
        class: "5BHIF",
    }

    const data = [[new WizardField('Plattform', 'text', '', true),new WizardField('Link zu Ihrem Profil', 'text', '', true)]];

    const [links, setLinks] = useState([["github", "www.github.com"], ["google", "www.google.com"], ["yahoo", "www.yahoo.com"], ["bing", "www.bing.com"]]);
    const [addLink, setAddLink] = useState(false);

    function removeLink(link: string[]){
        const newLinks = links.filter((l) => l !== link);
        setLinks(newLinks);
    }

    function wizardCallback(result, callbackLoadingText, finishLoading){
        var newLinks = links;

        newLinks.push([result[0].value, result[1].value]);
        setLinks(newLinks);

        setAddLink(false);
    }

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.picContainer}>
                    <Image src={"/jpg.svg"} alt="cancel" width={150} height={150} />
                </div>

                {addLink && (
                    <div className={styles.wizard}>
                        <Wizard returnPath="/user/profile" callback={wizardCallback} contentData={data} title="Account hinzufügen"></Wizard>
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
                                    <button className="btn-primary" onClick={() => removeLink(link)}>X</button>
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
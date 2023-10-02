import styles from "../../styles/Profile.module.scss";
import { useState } from "react";
import Image from "next/image";

export default function Profile() {

    return( 
        <>
            <div className={styles.container}>
                <div className={styles.picContainer}>
                    <Image src={"/jpg.svg"} alt="cancel" width={150} height={150} />
                </div>
                <div className={styles.infoContainer}>    
                    <div>
                        hallo
                    </div>
                    <div>
                        hallo
                    </div>
                </div>
            </div>
        </>
    )
}
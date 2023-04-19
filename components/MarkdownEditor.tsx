import React from 'react';
import styles from '../styles/MarkdownEditor.module.scss';
import Image from 'next/image';
export default function MarkdownEditor({containerWidth = 50}) {
    return(
        <div style={{ width: containerWidth + '%' }} className={styles.container}>
            <div className={styles.head}>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <Image src={"/expand.svg"} width={40} height={40} alt='heading'></Image>
                <div className={`${styles.img} ${styles.imgHeading}`}></div>
            </div>
            <div className={styles.content}>
                <textarea></textarea>
            </div>
        </div>
    );
}
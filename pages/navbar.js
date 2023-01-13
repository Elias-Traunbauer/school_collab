import styles from '../styles/navbar.module.css'
import Link from "next/link"

export default function navbar(){

    return(
        <>
        <div className={styles.container}>
            <Link href="/navbar" className={styles.navactive}>
                Navbar
            </Link>
            <Link href="/about">
                About
            </Link>
        </div>
        <div className={styles.underline}></div>
        </>        
    )
}
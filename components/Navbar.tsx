import styles from '../styles/Navbar.module.css'
import Link from "next/link"

export default function Navbar() {
    return (
        <>
            <div className={styles.container}>
                <Link href="/" className={styles.navactive}>
                    Home
                </Link>
                <Link href="/about">
                    About
                </Link>
                <div className={styles.underline} id="underline"></div>
            </div>
        </>
    );
}
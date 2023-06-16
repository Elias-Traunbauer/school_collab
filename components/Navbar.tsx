import styles from '../styles/Navbar.module.css'
import Link from "next/link"

export default function Navbar() {
    return (
        <>
            <div className={styles.container}>
                <Link href="/" className={styles.navactive}>
                    Home
                </Link>
                <Link href="/chat">
                    Chat
                </Link>
                <Link href="/assignments">
                    Assignments
                </Link>
                <Link href="/polls">
                    Polls
                </Link>
                <Link href="/summaries">
                    Summary
                </Link>
                <div className={styles.underline} id="underline"></div>
            </div>
        </>
    );
}
import styles from '../styles/navbar.module.css'
import Link from 'next/link'

export default function Navbar(){
    return(
        <div className={styles.container}>
            <Link href="/about" legacyBehavior>
                <a>About</a>
            </Link>
            <Link href="/navbar" legacyBehavior>
                <a>navbar</a>
            </Link>
        </div>
    )
}
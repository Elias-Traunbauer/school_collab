import Link from 'next/link'
import styles from '../styles/Footer.module.scss'
export default function Footer () {
    return(
        <>
            <div className={styles.container}>
            <div>
                    <div>
                        <Link href="http://localhost:3000" target='_blank'>Home</Link>
                    </div>
                    <div>
                        <Link href="http://localhost:3000/impressum" target='_blank'>Impressum</Link>
                    </div>
                    <div>
                        <Link href="http://localhost:3000/datenschutz" target='_blank'>Datenschutz</Link>
                    </div>
                </div>
                <span/>
                <div>
                    <div>
                        <Link href="http://localhost:3000/profile" target='_blank'>Account</Link>
                    </div>
                    <div>
                        <Link href="https://github.com" target='_blank'>Github</Link>
                    </div>
                    <div>   
                        <Link href="https://edufs.edu.htl-leonding.ac.at/moodle" target='_blank'>Moodle</Link>
                    </div>
                </div>
                <span/>
                <div>
                    <div>
                        <Link href="https://mese.webuntis.com/" target='_blank'>Webuntis</Link>
                    </div>
                    <div>
                        <Link href="https://localhost:300/kontakt" target='_blank'>Kontakt</Link>
                    </div>
                    <div>
                        <Link href="https://www.google.com/" target='_blank'>Google</Link>
                    </div> 
                </div> 
            </div>
        </>
    )
}
import styles from '../styles/Footer.module.scss'
export default function Footer ({children}) {
    return(
        <>
            <div className={styles.container}>
                {children}
            </div>
        </>
    )
}
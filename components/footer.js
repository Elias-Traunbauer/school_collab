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
import styles from '../styles/components/Footer.module.css'

export default function Footer ({children}) {
    return(
        <>
            <div className={styles.container}>
                {children}
            </div>
        </>
    )
}
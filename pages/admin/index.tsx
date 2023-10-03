import AdminNavbar from '../../components/AdminNavbar'
import styles from '../../styles/Admin.module.scss'
export default function AdminPage() {
    return (
        <div className={styles.adminContainer}>
            <AdminNavbar></AdminNavbar>
        </div>
    )
}
import { useRouter } from 'next/router';
import styles from '../styles/AdminNavbarItem.module.scss'
import Image from 'next/image';
export default function AdminNavbarItem({ href, name, picture,active = false}: { href: string, name: string , picture: string,active?:boolean}) {
    const router = useRouter();

    function navigate() {
        router.push('/admin' + href);
    }


    return (
        <div onClick={navigate} className={`${styles.item} ${active&&styles.active}`}>
            <Image width={10} height={10} alt={name} src={picture}></Image>
            <p>{name}</p>
        </div>
    )
}
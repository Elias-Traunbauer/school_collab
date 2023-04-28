import styles from '../styles/Navbar.module.css'
import Link from "next/link"

export default function Navbar() {
    function moveLine(){
        /*const links = document.querySelectorAll('a');
        const underline = document.getElementById('underline');
        links.forEach(link => {
            link.addEventListener('mouseover', () => {
                underline.style.left = `${link.offsetLeft}px`;
                underline.style.width = `${link.offsetWidth}px`;
            })
        })*/
    }

    return (
        <>
            <div className={styles.container}>
                <Link href="/" onMouseOver={moveLine()}>
                    Home
                </Link>
                <Link href="/termine">
                    Termine
                </Link>
                <Link href="/chats">
                    Chats
                </Link>
                <Link href="/profile">
                    Profil
                </Link>
                <div className={styles.underline} id="underline"></div>
            </div>
        </>
    );
}
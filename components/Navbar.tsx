import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.scss'
import Link from "next/link"
import { useRouter } from 'next/router';

export default function Navbar(){ 
    const [active, setActive] = useState("");
    const links = ["", "chat", "assignments", "polls", "summaries"];
    const router = useRouter();

    useEffect(() => {
        setActive(router.pathname.split("/")[1]);
    }, [router.pathname]);

    return (
        <>
            <div className={styles.container}>
                {
                    links.map((link, index) => {
                        return (
                            <Link href={`/${link}`} key={index} className={active === link ? styles.active : ""}>
                                {link === "" ? "Home": link}
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}
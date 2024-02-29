import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.scss'
import Link from "next/link"
import { useRouter } from 'next/router';
import { getUser } from '../services/User.service';
import UserDisplayDTO from '../models/UserDisplayDTO';

export default function Navbar(){ 
    const [active, setActive] = useState("");
    const links = ["", "chat", "assignments", "polls", "summaries"];
    const router = useRouter();
    const [user,setUser] = useState("");

    useEffect(() => {
        setActive(router.pathname.split("/")[1]);

        getUser().then((user) => {
            setUser(user.firstName.at(0) + user.lastName.at(0));
        });
    }, [router.pathname]);

    return (
        <>
            <div className={styles.container}>
                <Link href={'/user/profile'} className={styles.profile}>{user}</Link>
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
import {  useEffect } from 'react';
import styles from '../styles/AdminNavbar.module.scss'
import AdminNavbarItem from './AdminNavbarItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function AdminNavbar() {
    const router = useRouter();
    // get the current path after admin
    const path = router.pathname.split('/')[2]?'/'+router.pathname.split('/')[2]:'/';
    
    const Links = [{
        name: 'Dashboard',
        href: '/',
        picture: '/dashboard.svg'
    },
    {
        name: 'Users',
        href: '/users',
        picture: '/users.svg'
    },
    {
        name: 'Reports',
        href: '/reports',
        picture: '/reports.svg'
    },];
    

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarHead}>
                <Image width={10} height={10} src={'/admin.svg'} alt={''}></Image>
            </div>
            {
                Links.map((link, index) => {
                    return <AdminNavbarItem active={path == link.href} key={index} href={link.href} name={link.name} picture={link.picture}></AdminNavbarItem>
                })
            }
        </div>
    );
}
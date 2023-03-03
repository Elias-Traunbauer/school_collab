import styles from '../styles/navbar.module.css'
import Link from "next/link"
import { useEffect } from 'react';

export default function Navbar(){
    useEffect(() => {
        newPage();

        /*setLine();*/
      });
      
    function newPage(){
        resetClasses();

        var element = document.getElementsByClassName(styles.navactive);
        console.log(element.URL);
    }

    function resetClasses(){
        var elements = document.getElementsByClassName('Link');

        for(element of elements){
            if(element.URL == document.URL){
                element.classList.add(styles.navactive);
            }
            else{
                element.classList.remove(styles.navactive);
            }
        }
    }
    
    function hover(id, linefac){
        var element = document.getElementById(id);

        if(element.URL != document.URL){
            var newLineVal = toEm(calcLine(linefac));
            document.documentElement.style.setProperty('--line', newLineVal);
        }
    }

    function unhover(id, linefac){
        var element = document.getElementById(id);
        
        if(element.URL != document.URL){
            var newLineVal = toEm(calcLine(linefac));
            document.documentElement.style.setProperty('--line', newLineVal);
        }
    }

    function toEm(tmp){
        var str = new String(tmp + 'em');
        return str;
    }

    function calcLine(linefac){
        return 6.03 * linefac;
    }

    return(
        <>
        <div className={styles.container}>
            <Link id="navbar" href="/navbar" onMouseOver={() => hover("navbar", 0)} onMouseLeave={() => unhover("navbar", 0)}>
                Navbar
            </Link>
            <Link id='about' href="/about" onMouseOver={() => hover("about", 1)} onMouseLeave={() => unhover("about", 1)}>
                About
            </Link>
            <Link id='login' href="/login" onMouseOver={() => hover("login", 2)} onMouseLeave={() => unhover("login", 2)}>
                Login
            </Link>
            <Link id='profile' href="/profile" onMouseOver={() => hover("profile", 3)} onMouseLeave={() => unhover("profile", 3)}>
                Profile
            </Link>
        </div>
        </>        
    )
} 

import Head from "next/head";
import Navbar from ".//navbar.js"


export default function Layout ({ children }) {
    return <>
            <Navbar></Navbar>
            {children}
        <footer>
            
        </footer>
    </>
}
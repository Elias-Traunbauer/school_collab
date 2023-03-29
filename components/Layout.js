import Head from "next/head";
import Navbar from ".//navbar.js"
import Footer from ".//footer.js"
import Link from "next/link.js";


export default function Layout ({ children }) {
    return <>
            <Navbar></Navbar>
            {children}
            <Footer>
                <Link href="https://github.com">Github</Link>
            </Footer>
    </>
}
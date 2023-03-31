import Head from "next/head";
import Navbar from ".//navbar.js"
import Footer from "./Footer.js"
import Link from "next/link.js";


export default function Layout({ children }) {
    return <>
            <Navbar></Navbar>
            {children}
            <Footer>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                <div>
                    <Link href="https://github.com">Github</Link>
                </div>
                
            </Footer>
    </>
}
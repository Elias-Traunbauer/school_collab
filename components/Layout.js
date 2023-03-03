import Head from "next/head";
import Navbar from "../components/navbar.js"


export default function Layout ({ children }) {
    return <>
        <div>
            <Navbar></Navbar>
        </div>
        <div>
            {children}
        </div>
        <footer>
        </footer>
    </>
}
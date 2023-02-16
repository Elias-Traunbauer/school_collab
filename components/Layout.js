import Head from "next/head";
import Navbar from "./navbar";


export default function Layout ({ children }) {
    return <>
            <Navbar></Navbar>
            {children}
        <footer>
        </footer>
    </>
}
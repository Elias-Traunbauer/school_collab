import Head from "next/head";
import Navbar from "./navbar";


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
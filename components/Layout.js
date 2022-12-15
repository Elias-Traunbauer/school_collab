import Head from "next/head";


export default function Layout ({ children }) {
    return <>
        <div>
            <h1>Navbar</h1>
        </div>
        <div>
            {children}
        </div>
        <footer>
        </footer>
    </>
}
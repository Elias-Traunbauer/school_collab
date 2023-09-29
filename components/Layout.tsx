import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Layout({ children }) {
    return <>
    <Navbar></Navbar>
        {children}
    <Footer></Footer>
    </>
}
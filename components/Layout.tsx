import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Layout({ children }) {
    return <>
    <div className="layoutContainer">
        <Navbar></Navbar>
            {children}
        <Footer></Footer>
    </div>
    </>
}
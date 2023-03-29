import Link from "next/link";

const About = () => {
    return (
        <div className="container">
            <h1 type="special">This page was not found!</h1>
            <h2>Error 404</h2>
            <h3><Link type="special" href="/">Home</Link></h3>
        </div>
    )
}

export default About
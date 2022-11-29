const About = () => {
    return (
        <>
        <h1>About</h1>
        <p>This is the about page</p>
        <button>Yes</button>
        </>
    )
}

About.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default About
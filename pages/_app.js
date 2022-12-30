import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import icon from '../public/icon.jpg'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <>
        <Head>
            <title>School-Collab</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href={icon.src} />
        </Head>
        <div id="dialog_container"></div>
      {
        getLayout(<Component {...pageProps} />)
      }
    </>
  )
}

export default MyApp

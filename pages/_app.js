import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import icon from '../public/icon.jpg'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/version.php');
      const data = await res.text();
      const dev_info = document.getElementById('dev_info');
      dev_info.innerHTML = "<p>" + data + "</p>";
    })();
    return () => {
      
    };
  }, []);

  return (
    <>
        <Head>
            <title>School-Collab</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href={icon.src} />
        </Head>
        <div id="dialog_container"></div>
        <div id="dev_info"><p>No build date available</p></div>
      {
        getLayout(<Component {...pageProps} />)
      }
    </>
  )
}

export default MyApp

import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.scss'
import icon from '../public/icon.jpg'
import { useEffect } from 'react'
import MessageBox from './../components/MessageBox';

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  useEffect(() => {
    (async () => {
        const res = await fetch('/api/version.php');
        if (res.ok) {
          const data = await res.text();
          const dev_info = document.getElementById('dev_info');
          dev_info.innerHTML = "<p>" + data + "</p>";
          }
    })();
    return () => {
      
    };
  }, []);

  return (
    <div className="main_container">
        <MessageBox></MessageBox>
        <Head>
            <title>graduater</title>
            <meta name="description" content="Generated by create next app & export" />
            <link rel="icon" href={icon.src} />
        </Head>
        <div id="dialog_container"></div>
        <div id="dev_info"><p>No build number</p></div>
        {
          getLayout(<div><Component {...pageProps} /></div>)
        }
    </div>
  )
}

export default MyApp

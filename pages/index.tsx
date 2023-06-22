import Link from 'next/link'
import style from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'
import UserContext from '../components/UserContext'
import { useContext } from 'react'

const Home = () => {
  const context = useContext(UserContext);
  console.log("context",context);

  return (
    <div className="container">
      <h1 className="special" style={{ fontSize: 3 + 'em' }}>
        Welcome to graduater {context.userContext.username} !
      </h1>
      <h2>Useful links:</h2>
      <Link href="/user/login">Login</Link>
      <Link href="/user/profile">Profile</Link>
      <Link className="special" href="/preview">Component Preview</Link>
      <Link href="/about">About</Link>
    </div>
  )
}

export default Home

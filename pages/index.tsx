import Link from 'next/link'
import style from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'

const Home = () => {
  return (
    <div className="container">
      <h1 className="special" style={{ fontSize: 3 + 'em' }}>
        Welcome to graduater!
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

import Link from 'next/link'
import style from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'

const Home = () => {
  return (
    <div className="container">
      <h1 type="special" style={{ fontSize: 3 + 'em' }}>
        Welcome to graduater!
      </h1>
      <h2>Useful links:</h2>
      <Link href="/login">Login</Link>
      <Link href="/profile">Profile</Link>
      <Link type="special" href="/assignments">Assignments</Link>
      <Link href="/assignment_wizard">Assignment Wizard</Link>
      <Link type="special" special href="/Datepicker">Datepicker</Link>
      <Link type="special" href="/dialog_test">Dialog Test</Link>
      <Link href="/about">About</Link>
    </div>
  )
}

export default Home

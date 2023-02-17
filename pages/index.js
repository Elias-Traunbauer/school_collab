import Link from 'next/link'
import style from '../styles/index.module.scss'

const Home = () => {
  return (
    <div className="container">
        <h1 type="special" style={{fontSize: 3 + 'em'}}>
          Welcome to school-collab!
        </h1>
        <h2>Useful links:</h2>
        <Link href="/login">Login</Link>
        <Link href="/profile">Profile</Link>
        <Link type="special" href="/assignments">Assignments</Link>
        <Link href="/assignment_wizard">Assignment Wizard</Link>
        <Link type="special" href="/Datepicker">Datepicker</Link>
        <Link type="special" href="/dialog_test">Dialog Test</Link>
        <Link href="/about">About</Link>
    </div>
  )
}

export default Home

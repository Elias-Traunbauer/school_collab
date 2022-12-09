import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <div>
        <h1>
          Welcome to school-collbab!
        </h1>
        <h2>Useful links:</h2>
        <Link href="/login">Login</Link>
        <br></br>
        <Link href="/profile">Profile</Link>
        <br></br>
        <Link href="/assignments">Assignments</Link>
        <br></br>
        <Link href="/about">About</Link>
    </div>
  )
}

export default Home

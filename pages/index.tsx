import Link from 'next/link'
import styles from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'
import UserContext from '../components/UserContext'
import { useContext } from 'react'
import DashboardCard from '../components/DashboardCard'

const Home = () => {
  const context = useContext(UserContext);
  console.log("context",context);
  const links = [{ name: 'assignments', path: '/assignments', picture: '/assignments.svg' }, { name: 'Polls', path: '/polls', picture: '/polls.svg' }, { name: 'Summaries', path: '/summaries', picture: '/summaries.svg'}, { name: 'Chat', path: '/chat', picture: '/chat.svg'}];

  return (
    <div className="container">
      <h1 className="special" style={{ fontSize: 3 + 'em' }}>
        Welcome to graduater {context.userContext.id != -1&&context.userContext.username} !
      </h1>
      <div className={styles.CardContainer}>
        {
          links.map((link, index) => {
            return (
              <DashboardCard key={index} name={link.name} path={link.path} picture={link.picture} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home

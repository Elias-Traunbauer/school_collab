import Link from 'next/link'
import styles from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'
import UserContext from '../components/UserContext'
import { useContext, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import AssignmentCard from '../components/AssignmentCard'
import Assignment from '../models/Assignment'
import Subject from '../models/Subject'
import Poll from '../models/Poll'
import PollCard from '../components/Pollcard'

const Home = () => {
  const context = useContext(UserContext);
  console.log("context",context);
  const links = [{ name: 'assignments', path: '/assignments', picture: '/assignments.svg' }, { name: 'Polls', path: '/polls', picture: '/polls.svg' }, { name: 'Summaries', path: '/summaries', picture: '/summaries.svg'}, { name: 'Chat', path: '/chat', picture: '/chat.svg'}];

  const sub:Subject = {
    name: 'sub1',
    id: 0,
    version: ''
  };

  const a1:Assignment ={
    title: 'Assignment 1',
    description: 'Assignment 1',
    content: '',
    created: new Date(),
    modified: undefined,
    due: new Date(2024, 5, 1, 12, 0, 0, 0),
    group: undefined,
    subject: sub,
    user: undefined,
    userId: 0,
    groupId: 0,
    subjectId: 0,
    id: 0,
    version: ''
  }

  const a2:Assignment ={
    title: 'Assignment 2',
    description: 'Assignment 2',
    content: '',
    created: new Date(),
    modified: undefined,
    due: new Date(2024, 5, 1, 12, 0, 0, 0),
    group: undefined,
    subject: sub,
    user: undefined,
    userId: 0,
    groupId: 0,
    subjectId: 0,
    id: 0,
    version: ''
  }

  const p1:Poll = {
    creatorUserId: 0,
    dateCreated: new Date(),
    description: 'this is an description',
    due: new Date(2024, 5, 1, 12, 0, 0, 0),
    isAnonymous: false,
    title: 'Poll 1',
    id: 0,
    version: ''
  };
  const p2:Poll = {
    creatorUserId: 0,
    dateCreated: new Date(),
    description: 'this is an description',
    due: new Date(2024, 5, 1, 12, 0, 0, 0),
    isAnonymous: false,
    title: 'Poll 2',
    id: 0,
    version: ''
  };


  const [mockAssignments, setMockAssignments] = useState<Assignment[]>([a1, a2]);
  const [mockPolls, setMockPolls] = useState<Poll[]>([p1, p2]);

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
      <div className={styles.assignments}>
        <h2>Open Assignments</h2>
        {
          mockAssignments.map((assignment, index) => {
            return (
              <AssignmentCard width={100} key={index} assignment={assignment} />
            )
          })
        }
      </div>

      <div className={styles.polls}>
        <h2>Open Polls</h2>
        {
          mockPolls.map((poll, index) => {
            return (
              <PollCard width={100} poll={poll} key={index}></PollCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home

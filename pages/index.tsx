"use client";

import Link from 'next/link'
import style from '../styles/Index.module.scss'
import Countdown from '../components/Countdown'
import UserContext from '../components/UserContext'
import { useContext, useState } from 'react'

const Home = () => {

  const [state, setState] = useState("");

  const context = useContext(UserContext);
  console.log("context",context);

  return (
    <div className="container">
      <h1 className="special" style={{ fontSize: 3 + 'em' }}>
        Welcome to graduater {context.userContext.id != -1&&context.userContext.username} !
      </h1>
      <h2>Useful links:</h2>
      <Link href="/user/login">Login</Link>
      <Link href="/user/profile">Profile</Link>
      <Link className="special" href="/preview">Component Preview</Link>
      <Link href="/about">About</Link>
      <button onClick={() => {
        fetch('/api/User/TwoFactorAuthentication', {
          method: "POST",
          body: JSON.stringify({
            password: "Geheimnis123"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(async x => {
          let json = await x.json();
          console.log(json);
          setState(json.qrCode);
        })
      }}>Hello</button>
      <img src={state} alt="crazy" width={300} height={300}></img>
    </div>
    
  )
}

export default Home

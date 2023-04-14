import React from 'react'
import Navbar from '../components/Navbar'
import Countdown from '../components/Countdown'
import Layout from '../components/Layout'

export default function Preview() {


    return (
        <div className="container">
            <h1 className="special">Component Preview</h1>
            <h2>Countdown</h2>
            <Countdown date={new Date("01.04.2024")}></Countdown>
            <h2>Dialog test</h2>
            <button onClick={() => (window as any).showDecisionDialog("Dialog Test", "Lorem ipsum bli bla blub", "info", undefined, undefined)}>Open</button>
        </div>
    )
}

import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import Otp from './otp'

const user = {
  username: "",
  firstname:"",
  lastname: "",
  email:"",
}




export default function Home() {
  return (
    <>
    <Otp></Otp>
    </>
  )
}

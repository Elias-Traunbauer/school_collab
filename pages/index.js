import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import styles from '../styles/register.module.css'
import Assignment from './Assignment'
import Otp from './otp'

const user = {
  username: "",
  firstname:"",
  lastname: "",
  email:"",
}




export default function Home() {
  
  const [usernameState,setUserName] = useState("");

  function setUser(e){
    console.log('adsa');
    console.log(document.getElementById('username').value.length);
    let errorOccured = false;
    e.preventDefault();
    const arrayregex = [
      [
        [document.getElementById('email'),document.getElementById('emailerror')],
        [(val)=> {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)}],
        ["Invalid E-Mail"]
      ],
      [
        [document.getElementById('username'),document.getElementById('usernameerror')],
        [(val)=> {return val.length <= 12;},(val)=> {return val.length >= 4}],
        ["Usename zu lang","Username muss mindestens 4 Zeichen enthalten"]
      ],
      [
        [document.getElementById('password'),document.getElementById('passworderror')],
        [(val)=> {return /[A-Z]/.test(val)},(val)=> {return /[0-9]/.test(val)},(val)=>{return val.length >= 8},(val)=>{return /[#|?|!|@|$|%|_]/.test(val)},(val)=>{return /[a-z]/.test(val)}],
        ["Passwort muss mindestens einen Großbuchstaben enthalten","Passwort muss mindestens eine Ziffer enthalten","Passwort muss mindestens 8 Zeichen enthalten","Passwort muss mindestens ein Sonderzeichen enthalten","Passwort muss mindestens einen Kleinbuchstaben enthalten"]
      ],
      [
        [document.getElementById('password2'),document.getElementById('password2error')],
        [(val) => {return document.getElementById('password').value == val}],
        ["Passwort is nicht gleich"]
      ]

    ];

    for(const elements of arrayregex){
      const input = elements[0][0];
      const error = elements[0][1];

            input.classList.remove("error");
            error.textContent = "";
    
            let errors = "";
    
            for (let i = 0; i < elements[1].length; i++) {
                if (input.type != "checkbox") {
                    if (!elements[1][i](input.value)) {
                        errors += elements[2][i] + "\n";
                    }   
                }
                else {
                    if (!elements[1][i](input.checked)) {
                        errors += elements[2][i] + "\n";
                    }   
                }
            }
    
            if (errors != "") {
                error.textContent = errors;
                input.classList.add("error");
                errorOccured = true;
            }
        }
    //user.username = document.getElementById('username').value;
    setUserName(document.getElementById('username').value);
  }


  return (
    <>
    <div className={styles.registercontainer}>
    <form className={styles.registerform} onSubmit={setUser}>
        <h1>Anmelden</h1>
        <label htmlFor='username'>Username</label>
        <br/>
        <input required type='text' id='username' placeholder='Username'></input>
        <pre id='usernameerror'></pre>
        <br/>
        <label htmlFor='email'>Email</label>
        <br/>
        <input required type='text' id='email' placeholder='Email'></input>
        <pre id='emailerror'></pre>
        <br/>
        <label htmlFor='password'>Passwort</label>
        <br/>
        <input required type='password' id='password'placeholder='Passwort'></input>
        <pre id='passworderror'></pre>
        <br/>
        <label htmlFor='password2'>Passwort wiederholen</label>
        <br/>
        <input required type='password' id='password2'placeholder='Passwort'></input>
        <pre id='password2error'></pre>
        <br/>
        <button type='submit'>submit</button>
        
      </form>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <Assignment></Assignment>

    
    </>
  )
}

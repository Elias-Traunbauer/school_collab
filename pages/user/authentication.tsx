import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script';
import { useState } from 'react'
import styles from '../../styles/otp.module.scss'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { twoFactorAuthenticationCode } from '../../services/User.service';


export default function Otp(){

    //const [inputs,setInputs] = useState();
    const router = useRouter();

    useEffect(() => {
        const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
        //console.log(inputs[0].value ? inputs[0].value : "none");
        document.getElementById('i1').focus();
        for(const e of inputs as NodeListOf<HTMLInputElement>){
            e.value = "";
            e.setAttribute("readonly", "readonly");
            //e.addEventListener("keyup",handleOtp);
            e.addEventListener("paste",handlePasteOtp);
            e.addEventListener("focus",focusCorrectInput);
            e.addEventListener("mousedown",handleMouseUp);
            e.addEventListener("mouseup",handleMouseDown);
            e.addEventListener("keyup",handleOtp);
            
        }
        return () => {
            for(const e of inputs){
                e.removeEventListener("keyup",handleOtp);
                e.removeEventListener("paste",handlePasteOtp);
                e.removeEventListener("focus",focusCorrectInput);
                e.removeEventListener("mousedown",handleMouseUp);
                e.removeEventListener("mouseup",handleMouseDown);
                
        }}
    });

    function handleMouseUp(e){
        e.target.focus();
        e.preventDefault();
    }
    function handleMouseDown(e){
        e.preventDefault();
    }

    function handlePasteOtp(e){
        e.preventDefault();
        console.log("saveasdasdaddsadadsdsadasdadsadsadsadsa");
        const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
        navigator.clipboard.readText()
        .then(text => {
            const input = text.match(/(\d\d?\d?\d?\d?\d?)/);
            const inputValue = input[0].split("");
            let index = 0;
            for(const e of inputs as NodeListOf<HTMLInputElement>){
                if(e.value == "" && index < inputValue.length){
                    e.value = inputValue[index];
                    index++
                }
            }
           
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });

        focusCorrectInput(e);
    }

    function focusCorrectInput(e){
        //e.preventDefault();
        const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
        let curr;
        for(const e of inputs as NodeListOf<HTMLInputElement>){
            curr = e;
            if(e.value.length <= 0){
                e.focus();
                break;
            }
        }

        if(curr.value.length > 0 && curr.nextElementSibling != null){
            const button = document.getElementById('verifyBtn');
            button.focus();
        }
        //inputs[inputs.length-1].focus();
    }

    

    function handleOtp(e){
        const input = e.target;
        let value = input.value;
        let endreached = false;


        if(e.key === "Backspace"){
            if(input.previousElementSibling == null)
                return;
  
            if(input.value == ""){
                input.previousElementSibling.value= "";
                input.previousElementSibling.focus();
            }
            else{
                input.value = "";
            }
            
            return;
        }

        if(e.key.trim().length != 1){
            return;
        }

        if(input != null && /^\d+$/.test(e.key) && input.value.length <= 0){
            input.value = e.key;
            if(input.nextElementSibling!= null)
            input.nextElementSibling.focus();
            else{
                const button = document.getElementById('verifyBtn');
                button.focus();
            }
        }

        /*if(e.key === "Backspace" && input.value.length <= 0 && input.previousElementSibling != null){
            input.previousElementSibling.value = "";
            input.previousElementSibling.focus();
        }*/


        //input.previousElementSibling.focus();
        //input.nextElementSibling.focus();
    }

    function handleSend2FA(e){
        const button = e.target as HTMLButtonElement;
        button.disabled = true;
        button.classList.add(styles.loading);
        const span = button.querySelector("span");
        span.textContent = "";


        const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`) as NodeListOf<HTMLInputElement>;
        var code = "";
        for (const iterator of inputs) {
            code += iterator.value;
        }

        twoFactorAuthenticationCode(code).then(res => {
            span.textContent = "Verify";
            button.classList.remove(styles.loading);
            button.disabled = false;
        }).catch(err => {
            span.textContent = "Retry";
            button.classList.remove(styles.loading);
            button.classList.add(styles.failed);
            button.disabled = false;
        });

        setTimeout(() => {
            
        }, 2000);
    }

    return(
        <>
            <div className={styles.container}>
            <div className={styles.header}>
                    <Image onClick={router.back} width={10} height={10} alt='return' src={"/arrow_right_alt.svg"}></Image>
                    <h1>2 Factor Authentification</h1>
            </div>
            <div className={styles.wrapper}>
            <div  className={styles.otpcontainer}>
                <input autoComplete='off' id='i1' maxLength={1} type="text"></input>
                <input autoComplete='off' id='i2' maxLength={1} type="text"></input>
                <input autoComplete='off' id='i3' maxLength={1} type="text"></input>
                <input autoComplete='off' id='i4' maxLength={1} type="text"></input>
                <input autoComplete='off' id='i5' maxLength={1} type="text"></input>
                <input autoComplete='off' id='i6' maxLength={1} type="text"></input>
            </div>
            <div className={styles.buttonContainer}>
                <button id='verifyBtn' onClick={handleSend2FA} className='btn btn-primary'><span>Verify</span></button>
            </div>
            </div>
            
            </div>
            
        </>
    
    );
}
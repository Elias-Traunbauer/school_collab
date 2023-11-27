import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import styles from "../../styles/otp.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { twoFactorAuthentication, twoFactorAuthenticationCode } from "../../services/User.service";
import TwoFactorAuthenticationObject from "../../models/TwoFactorAuthenticationObject";

export default function NewAuthentication() {
  //const [inputs,setInputs] = useState();
  const router = useRouter();

  const [showOtp, setShowOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [twoFaObject, setTwoFaObject] = useState<TwoFactorAuthenticationObject>();
const blurData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA";

  useEffect(() => {
    if (!showOtp) {
      return;
    }
    console.log("useEffect");
    const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
    //console.log(inputs[0].value ? inputs[0].value : "none");
    document.getElementById("i1").focus();
    for (const e of inputs as NodeListOf<HTMLInputElement>) {
      e.value = "";
      e.setAttribute("readonly", "readonly");
      //e.addEventListener("keyup",handleOtp);
      e.addEventListener("paste", handlePasteOtp);
      e.addEventListener("focus", focusCorrectInput);
      e.addEventListener("mousedown", handleMouseUp);
      e.addEventListener("mouseup", handleMouseDown);
      e.addEventListener("keyup", handleOtp);
    }
    return () => {
      for (const e of inputs) {
        e.removeEventListener("keyup", handleOtp);
        e.removeEventListener("paste", handlePasteOtp);
        e.removeEventListener("focus", focusCorrectInput);
        e.removeEventListener("mousedown", handleMouseUp);
        e.removeEventListener("mouseup", handleMouseDown);
      }
    };
  });

  function handleMouseUp(e) {
    e.target.focus();
    e.preventDefault();
  }
  function handleMouseDown(e) {
    e.preventDefault();
  }

  function handlePasteOtp(e) {
    e.preventDefault();
    console.log("saveasdasdaddsadadsdsadasdadsadsadsadsa");
    const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
    navigator.clipboard
      .readText()
      .then((text) => {
        const input = text.match(/(\d\d?\d?\d?\d?\d?)/);
        const inputValue = input[0].split("");
        let index = 0;
        for (const e of inputs as NodeListOf<HTMLInputElement>) {
          if (e.value == "" && index < inputValue.length) {
            e.value = inputValue[index];
            index++;
          }
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });

    focusCorrectInput(e);
  }

  function focusCorrectInput(e) {
    //e.preventDefault();
    const inputs = document.querySelectorAll(`.${styles.otpcontainer} input`);
    let curr;
    for (const e of inputs as NodeListOf<HTMLInputElement>) {
      curr = e;
      if (e.value.length <= 0) {
        e.focus();
        break;
      }
    }

    if (curr.value.length > 0 && curr.nextElementSibling != null) {
      const button = document.getElementById("verifyBtn");
      button.focus();
    }
    //inputs[inputs.length-1].focus();
  }

  function handleOtp(e) {
    const input = e.target;
    let value = input.value;
    let endreached = false; 

    if (e.key === "Backspace") {
      if (input.previousElementSibling == null) return;

      if (input.value == "") {
        input.previousElementSibling.value = "";
        input.previousElementSibling.focus();
      } else {
        input.value = "";
      }

      return;
    }

    if (e.key.trim().length != 1) {
      return;
    }
    if (input != null && /^\d+$/.test(e.key) && input.value.length <= 0) {
      input.value = e.key;
      console.log(input.value);
      if (input.nextElementSibling != null) input.nextElementSibling.focus();
      else {
        const button = document.getElementById("verifyBtn");
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

  function handleSend2FA(e) {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;
    button.classList.add(styles.loading);
    const span = button.querySelector("span");
    span.textContent = "";

    const inputs = document.querySelectorAll(
      `.${styles.otpcontainer} input`
    ) as NodeListOf<HTMLInputElement>;
    var code = "";
    for (const iterator of inputs) {
      code += iterator.value;
    }

    twoFactorAuthenticationCode(code)
      .then((res) => {
        span.textContent = "Verify";
        button.classList.remove(styles.loading);
        button.disabled = false;
      })
      .catch((err) => {
        span.textContent = "Retry";
        button.classList.remove(styles.loading);
        button.classList.add(styles.failed);
        button.disabled = false;
      });

    setTimeout(() => {}, 2000);
  }

  function handleInitAuth() {
    //TODO: use auth endpoint
    const button = document.getElementById("initAuthBtn") as HTMLButtonElement;
    button.disabled = true;
    button.classList.add(styles.loading);
    const span = button.querySelector("span");
    //set opacity to 0
    span.textContent = "";
    const input = document.getElementById("pwdField") as HTMLInputElement;
    twoFactorAuthentication(input.value).then((res) => {
        console.log(res);
        setShowOtp(true);
        setTwoFaObject(res);
    }).catch(err => {
        setErrorMessage("Wrong password");
        input.value = "";
        button.classList.remove(styles.loading);
        button.disabled = false;
        span.textContent = "Senden";
    });
  }

  function handleCopySecret() {
    const btn = document.getElementById("copySecretbtn") as HTMLButtonElement;
    btn.textContent = "Kopiert!";
    
    navigator.clipboard.writeText(twoFaObject.secret);
    setTimeout(() => {
      btn.textContent = "Kopieren";
    }, 2000);
  }

  function handlePwKeydown(e) {
    if (e.key === "Enter") {
    const button = document.getElementById("initAuthBtn") as HTMLButtonElement;
    button.click();
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            onClick={router.back}
            width={10}
            height={10}
            alt="return"
            src={"/arrow_right_alt.svg"}
          ></Image>
          <h1>2 Factor Authentification</h1>
        </div>
        
          {!showOtp ? (
            <div className={styles.passwordContainer}>
              <label>Geben Sie Ihr Passwort ein</label>
              <div>
                <input onKeyDown={handlePwKeydown} id="pwdField" type="password"></input>
                <button id="initAuthBtn" onClick={handleInitAuth} className="btn btn-primary">
                  <span>Senden</span>
                </button>
              </div>
              <label className={styles.errorLabel}>{errorMessage}</label>
            </div>
          ) : (
            <>
            <div className={styles.generalWrapper}>
            <div className={styles.qrCodeContainer}>
                <Image blurDataURL={blurData} placeholder="blur" alt="crazy" src={twoFaObject.qrCode} width={200} height={200}></Image>
                <button id="copySecretbtn" onClick={handleCopySecret} className="btn btn-secondary">Kopieren</button>
            </div>
            <Image src={"/arrow_thick_right.svg"} width={100} height={100} alt={"arrow"}></Image>
            <div className={styles.wrapper}>
              <label>Bitte geben Sie den Code ein</label>
              <div className={`${styles.otpcontainer} ${styles.enableAuthOtp}`}>
                <input
                  autoComplete="off"
                  id="i1"
                  maxLength={1}
                  type="text"
                ></input>
                <input
                  autoComplete="off"
                  id="i2"
                  maxLength={1}
                  type="text"
                ></input>
                <input
                  autoComplete="off"
                  id="i3"
                  maxLength={1}
                  type="text"
                ></input>
                <input
                  autoComplete="off"
                  id="i4"
                  maxLength={1}
                  type="text"
                ></input>
                <input
                  autoComplete="off"
                  id="i5"
                  maxLength={1}
                  type="text"
                ></input>
                <input
                  autoComplete="off"
                  id="i6"
                  maxLength={1}
                  type="text"
                ></input>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  id="verifyBtn"
                  onClick={handleSend2FA}
                  className="btn btn-primary"
                >
                  <span>Verify</span>
                </button>
              </div>
              </div>
            </div>
            
            </>
          )}
        </div>
    </>
  );
}

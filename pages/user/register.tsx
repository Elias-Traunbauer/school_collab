import React from "react";
import styles from "../../styles/User.module.scss";
import Link from "next/link";
import { Html } from "mdast-util-to-hast/lib/handlers/html";
import { registerUser } from "../../services/User.service";
import UserRegisterDTO from "../../models/UserRegisterDTO";
import UserRegisterError from "../../models/UserRegisterError";
import { useRouter } from "next/router";
export default function Register() {
  const [error, setError] = React.useState<UserRegisterError>({});
  const [agbAgreed, setAgbAgreed] = React.useState<boolean>(true);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const checkbox = document.querySelector(
      "input[type=checkbox]"
    ) as unknown as HTMLInputElement;
    const inputs = document.querySelectorAll(
      "input[type=text], input[type=email],  input[type=password]"
    ) as unknown as HTMLInputElement[];
    const user: UserRegisterDTO = {
      username: inputs[0].value,
      firstname: inputs[1].value,
      lastname: inputs[2].value,
      email: inputs[3].value,
      password: inputs[4].value,
      repeatedPassword: inputs[5].value,
    };

    if (!checkbox.checked) {
      setAgbAgreed(false);
      return;
    } else {
      setAgbAgreed(true);
    }

    const btn = document.getElementById("submitInput") as HTMLInputElement;
    const loader = document.getElementById("btnLoader") as HTMLDivElement;


    btn.disabled = true;
    btn.value = "";
    loader.classList.remove("hidden");

    registerUser(user)
      .then((res) => {
        if(res == 200){
          router.push("/");
        }
      })
      .catch((err) => {
        if(err.status == 400){
          const tmperror = err.errors as UserRegisterError;
          setError(tmperror);
        }
        else{
          console.error(err);
        }

        btn.disabled = false;
        loader.classList.add("hidden");
        btn.value = "registrieren";
      });
  }

  return (
    <div className={`${styles.container} ${styles.register}`}>
      <form onSubmit={handleSubmit}>
        <h1>New account</h1>

        <div className={styles.inputfield}>
          <label>Username</label>
          <input required type="text" placeholder="Username" />
          {error.Username &&
            error.Username.length > 0 &&
            error.Username.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>

        <div className={styles.inputContainer}>

        <div className={styles.inputfield}>
          <label>Firstname</label>
          <input required type="text" placeholder="Robert" />
          {error.Firstname &&
            error.Firstname.length > 0 &&
            error.Firstname.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>

        <div className={styles.inputfield}>
          <label>Lastname</label>
          <input required type="text" placeholder="Stöttinger" />
          {error.Lastname &&
            error.Lastname.length > 0 &&
            error.Lastname.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>
        </div>


        <div className={styles.inputfield}>
          <label>E-mail</label>
          <input required type="email" placeholder="Email" />
          {error.Email &&
            error.Email.length > 0 &&
            error.Email.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>

        <div className={styles.inputfield}>
          <label>Password</label>
          <input required type="password" placeholder="Geheimnis123" />
          {error.Password &&
            error.Password.length > 0 &&
            error.Password.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>

        <div className={styles.inputfield}>
          <label>Repeat password</label>
          <input required type="password" placeholder="Geheimnis123" />
          {error.RepeatedPassword &&
            error.RepeatedPassword.length > 0 &&
            error.RepeatedPassword.map((err, index) => {
              return (
                <p key={index} className={styles.errorMessage}>
                  {err}
                </p>
              );
            })}
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" />
          <div>
            <label>
              I agree with the <Link href={"/AGB"}>Terms of service</Link>
            </label>

            {!agbAgreed && (
              <p className={styles.errorMessage}>Agree with the Terms of service</p>
            )}
          </div>
        </div>

        <div className={styles.buttonContainer}>
        <input id="submitInput" type="submit" value={"register"}></input>
          <div id="btnLoader" className="loadingObject hidden">
            <div className="btnLoader"></div>
          </div>
        </div>

        <div className={styles.linkContainer}>
          <p>
            Already an account? &nbsp;
            <Link href="/user/login">Login</Link>
          </p>

        </div>
      </form>
    </div>
  );
}

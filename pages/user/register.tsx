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
      });
  }

  return (
    <div className={`${styles.container} ${styles.register}`}>
      <form onSubmit={handleSubmit}>
        <h1>Neuer Account</h1>

        <div className={styles.inputfield}>
          <label>UserName</label>
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
          <label>Vorname</label>
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
          <label>Nachname</label>
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
          <label>Email</label>
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
          <label>Passwort</label>
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
          <label>Passwort wiederholen</label>
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
              Ich stimme den <Link href={"/AGB"}>AGBs</Link> zu
            </label>

            {!agbAgreed && (
              <p className={styles.errorMessage}>Akzeptieren Sie die AGBs</p>
            )}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <input type="submit" value={"submit"}></input>
        </div>

        <div className={styles.linkContainer}>
          <p>
            Bereits einen Account? &nbsp;
            <Link href="/user/login">Login</Link>
          </p>

        </div>
      </form>
    </div>
  );
}

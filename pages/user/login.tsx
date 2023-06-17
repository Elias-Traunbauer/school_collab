import React, { useContext } from "react";
import styles from "../../styles/User.module.scss";
import {loginUser}  from "../../services/User.service";
import UserLoginError from "../../models/UserLoginError";
import { log } from "console";
import UserLoginDTO from "../../models/UserLoginDTO";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "../../components/UserContext";
import User, { UserPermission, UserPrivacy } from "../../models/User";
export default function Login() {
    const[error, setError] = React.useState<UserLoginError>({});
    const router = useRouter();
    const context = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll(
            "input[type=text], input[type=password]"
        ) as unknown as HTMLInputElement[];
        const user:UserLoginDTO = {
            identifier: inputs[0].value,
            password: inputs[1].value,
        };
        loginUser(user)
            .then((res) => {
                console.log("loginResult",res);
                if(res.status == 200){
                  //router.push("/");
                }
            })
            .catch(async (err) => {
              if(err.status == 401 || err.status == 400){
                const tmperror = err.errors as UserLoginError;
                setError(tmperror);
              }
              else{
                console.error(err);
              }
 
            });
    }
  return (
    <div className={`${styles.container} ${styles.login}`}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.inputfield}>
          <label>Username</label>
          <input required type="text" defaultValue={"test"} placeholder="Username" />
            {error.Identifier && error.Identifier.length > 0 && error.Identifier.map((err, index) => {
                return (
                    <p key={index} className={styles.errorMessage}>
                        {err}
                    </p>
                );
            })}
        </div>

        <div className={styles.inputfield}>
          <label>Password</label>
          <input required type="text" defaultValue={"Geheimnis123"} placeholder="Geheimnis123" />
          {error.Password && error.Password.length > 0 && error.Password.map((err, index) => {
                return (
                    <p key={index} className={styles.errorMessage}>
                        {err}
                    </p>
                );
            })}
        </div>

        <div className={styles.linkContainer}>
            <Link href="/user/login">Passwort Vergessen?</Link>
        </div>

        <div className={styles.buttonContainer}>
          <input type="submit" value={"submit"}></input>
        </div>

        <div className={styles.linkContainer}>
          <p>
            Keinen Account? &nbsp;
            <Link href="/user/register">Registrieren</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

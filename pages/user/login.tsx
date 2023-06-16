import React from "react";
import styles from "../../styles/User.module.scss";
import {loginUser}  from "../../services/User.service";
import UserLoginError from "../../models/UserLoginError";
import { log } from "console";
import UserLoginDTO from "../../models/UserLoginDTO";
import { useRouter } from "next/router";
export default function Login() {
    const[error, setError] = React.useState<UserLoginError>({});
    const router = useRouter();

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
                console.log("User logged in");
                router.push("/");
            })
            .catch((err) => {
                const tmperror = err as UserLoginError;
                setError(tmperror);
            });
    }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.inputfield}>
          <label>Username</label>
          <input required type="text" placeholder="Username" />
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
          <input required type="text" placeholder="Geheimnis123" />
          {error.Password && error.Password.length > 0 && error.Password.map((err, index) => {
                return (
                    <p key={index} className={styles.errorMessage}>
                        {err}
                    </p>
                );
            })}
        </div>

        <div className={styles.buttonContainer}>
          <input type="submit" value={"submit"}></input>
        </div>
      </form>
    </div>
  );
}

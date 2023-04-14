import Form from "../../components/Form";
import secureFetch from "../../components/fetchWrapper";
import styles from "/styles/Login.module.css"
import Router from "next/router";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  function callback(data) {
    //backend
    secureFetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          console.log("success");
          // router to mainpage
          Router.push('/');
        }
        else {
          console.log("error");
          setError("Invalid email or password");
        }
      }
    );
  }

  return (
    <div className={styles.wizardWrapper}>
      <Form title="Login" submitText="Submit" onSubmit={callback}>
        <p>Email</p>
        <input type="email" name="email" />
        <p>Password</p>
        <input type="password" name="password" />
        <p className="error">{error}</p>
      </Form>
    </div>
  )
}
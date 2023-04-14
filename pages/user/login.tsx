import Form from "../../components/Form";
import styles from "/styles/Login.module.css"

export default function Login() {
  const contentData = [{
    email: true,
  },
  {
    password: true,
  }];

  function callback(data, setText, finishLoading) {
    console.log(data);

    setTimeout(() => {
      setText("almost done");
    }, 1000);

    setTimeout(() => {
      finishLoading();
    }, 4000);
    //backend
  }

  return (
    <div className={styles.wizardWrapper}>
      <Form title="Login" submitText="Submit" onSubmit={(data) => {console.log(data)}}>
        <p>Email</p>
        <input type="email" name="email" />
        <p>Password</p>
        <input type="password" name="password" />
      </Form>
    </div>
  )
}
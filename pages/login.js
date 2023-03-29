import router from "next/router"
import Wizard from "../components/Wizard"
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
      <Wizard callback={callback} containerWidth={20} contentData={contentData} title='Login'></Wizard>
    </div>
  )
}
import router from "next/router"
import Wizard from "../components/wizard"
import styles from "/styles/Login.module.css"

export default function Login() {
  const contentData = [{
    email: true,
  },
  {
    password: true,
  }];

  function callback(data,setText,finishLoading){
    console.log(data);

    //backend
  }

  return (
    <Wizard callback={callback} containerWidth={40} title='Login'></Wizard>
  )
}
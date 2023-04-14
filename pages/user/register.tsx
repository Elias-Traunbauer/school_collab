import Form from "../../components/Form";
import secureFetch from "../../components/fetchWrapper";
import Router from "next/router";
import Wizard from "../../components/Wizard";

export default function Login() {
  const contentData = [{
    email: true,
  },
  {
    password: true,
  }];

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
        }
      }
    );
  }

  return (
    <>
      <Wizard callback={() => {}} contentData={
        [
            {
                first_name: true,
                last_name: true,
            },
            {
                email: true
            },
            {
                password: true,
                repeat_Password: true
            },
            {
                agreeToPolicy: {
                    text: "I agree to the terms and conditions",
                    title: "agreeToPolicy",
                    value: false
                }
            }
        ]
      } title="Register"></Wizard>
    </>
  )
}
import router from "next/router"
import styles from "/styles/Login.module.css"

const LoginPage = () => {
  return (
    <>
    <div className={styles.rootelement}>
    <div style={{display: 'flex', justifyContent: 'center', paddingTtop: 10 + 'vh'}}>
        <form className={styles.loginform} onSubmit={(e)=>e.preventDefault()}>
            <h1>Login</h1>
            <input id="username" autoComplete="username" type="text" placeholder="username"/>
            <br/>
            <input id="password" type="password" placeholder="password"/>
            <br/>
            <div className="flexsmall">
                <input id="stayloggedin" className="switch" type="checkbox"/>
                <label>stay logged in</label>
            </div>
            <button id="submitbutton" onClick={performLogin} type="submit"></button>
        </form>
    </div>
    </div>
      
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <>
        {page}
    </>
  );
};

export default LoginPage

function performLogin(e) {
    e.preventDefault();
  if (!(e.target.classList.contains(styles.loading) || e.target.classList.contains(styles.finished)))
  {
      document.getElementById("username").classList.remove(styles.error);
      document.getElementById("password").classList.remove(styles.error);
      e.target.classList.add(styles.loading);

      /*(async () => {
        try {
          const res = await fetch("/login.php",
          {
            body: JSON.stringify({
              username: document.getElementById("username").value,
              password: document.getElementById("password").value,
              stayloggedin: document.getElementById("stayloggedin").checked
            }),
            headers: {
              'Content-Type': 'application/json; charset=utf8'
            },
            credentials: 'include',
            method: 'POST'
          });
          console.log(res);
          if (res.status == 200) {
            setButtonFinished(e.target);
          }
          else {
            setLoginFailed(e.target);
          }
        } catch (ex) {
          setLoginFailed(e.target);
        }
      })();*/
      console.log("load");
      setTimeout(() => {
        setButtonFinished(document.getElementById("submitbutton"));
      }, 1000)
      
    }
    
}

function setButtonFinished(target) {
  target.classList.remove(styles.loading);
  target.classList.add(styles.finished);

  setTimeout(() => {
      router.push('/');
  }, 1000);
}

function setLoginFailed (target) {
  document.getElementById("username").classList.add('error');
  document.getElementById("password").classList.add('error');
  target.classList.remove(styles.loading);
}

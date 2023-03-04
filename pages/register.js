import styles from '../styles/register.module.css'
import Wizard from '../components/wizard'

export default function Register() {
    const contentData = [{
        Firstname: true,
        Lastname: true,
        School: true,
      },
      {
        email: true,
        repeatEmail: true,
      },
      {
        password: true,
        repeatPassword: true,
      },];
    
    function callback(data,setText,finishLoading){
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
        <Wizard callback={callback} containerWidth={40} contentData={contentData} title='Register'></Wizard>
    </div>
    )
}
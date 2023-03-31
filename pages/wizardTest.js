import Link from 'next/link'
import Wizard from '../components/Wizard'
import styles from '../styles/WizardTest.module.css'
export default function WzTest() {
    function callback(data, setLoadingText, finishLoading){
        console.log(data);
        setLoadingText("Penis...");
        setTimeout(() => {
            finishLoading();
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <Wizard title='Test' callBack={callback}></Wizard>
        </div>
        
    );

}
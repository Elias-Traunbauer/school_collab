import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import WizardResult from "../../models/WizardResult";
import styles from '../../styles/Assignment.module.scss'

export default function CreateAssignment() {
    const router = useRouter();

    function callback(data:WizardResult[], setLoadingText, finishLoading){
        console.log(data);
        setLoadingText("Penis...");
        setTimeout(() => {
            finishLoading();
            setLoadingText("done!");

            setTimeout(() => {
                router.push('/assignments')
            },300);
        }, 2000);
    };

    const data = [[new WizardField('title','text','',true),new WizardField('deadline','date',new Date(),true)],[new WizardField('description','md','',false)]]

    return (
        <div className={styles.CreationContainer}>
            <Wizard contentData={data} callback={callback} title={"Assignment"}></Wizard>
        </div>
    )
}
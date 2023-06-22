import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import WizardResult from "../../models/WizardResult";
import styles from '../../styles/Assignment.module.scss'

export default function CreateAssignment() {
    const router = useRouter();

    function finish(data:WizardResult[], setLoadingText, finishLoading){
        
        setLoadingText("Loading");
        setTimeout(() => {
            finishLoading();
            setLoadingText("done!");

            setTimeout(() => {
                router.push("/assignments");
            },500);
        }, 2000);
    };

    const data = [[new WizardField('title','text','',true),new WizardField('deadline','date',new Date(),true)],[new WizardField('description','md','',false)]]

    return (
        <div className={styles.CreationContainer}>
            <Wizard returnPath="/assignments/" contentData={data} callback={finish} title={"Assignment"}></Wizard>
        </div>
    )
}
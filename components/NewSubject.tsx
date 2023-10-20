import { useRouter } from "next/router";
import Wizard from "../components/Wizard";
import WizardField from "../models/WizardField";
import styles from "../styles/Summary.module.scss";

export default function NewSubject({returnPath}: {returnPath: string}) {
    const router = useRouter();

    function finisheWizard(text,callbackLoadingText,finishLoading) {
        setTimeout(() => {
            finishLoading();
            alert(text);
        }, 2000);
    }

    return (
        <div className={styles.new}>
            <Wizard returnPath="/summaries" containerWidth={50} contentData={[[new WizardField('Name','text','',true),new WizardField('Abkürzung','text','',false)]]} callback={finisheWizard} title={"New Subject"}></Wizard>
        </div>
    )
}
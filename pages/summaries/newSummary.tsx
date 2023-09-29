import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import styles from "../../styles/Summary.module.scss";

export default function NewSummary() {

    const router = useRouter();
    const subject = router.query.subject;
    const data = [[new WizardField('Titel', 'text', '', true), new WizardField('Beschreibung', 'text', '', false)]];

    function finishWizard(text, callbackLoadingText, finishLoading) {
        setTimeout(() => {
            finishLoading();
            console.log(text[0].value);
        }, 2000);
    }

    return (
        <div className={styles.new}>
            <Wizard returnPath={`/summaries/collection/?subject=${subject}`} contentData={data} callback={finishWizard} title={"New Summary for " + subject}></Wizard>
        </div>
    )
}
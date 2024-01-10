import { useRouter } from "next/router";
import Wizard from "../../../components/Wizard";
import WizardField from "../../../models/WizardField";
import styles from "../../../styles/Summary.module.scss";
import { createSummary } from "../../../services/Summary.service";
import Summary from "../../../models/Summary";

export default function NewSummary() {

    const router = useRouter();
    const subject = router.query.subjectId;
    const data = [[new WizardField('Titel', 'text', '', true), new WizardField('Beschreibung', 'text', '', false)]];

    function finishWizard(text, callbackLoadingText, finishLoading) {
        createSummary({
            title: text[0].value,
            description: text[1].value,
            subjectId: Number.parseInt(subject as string)
        } as Summary).then((res) => {
            console.log(res);
            console.log("SUMMARY CREATED");
            setTimeout(() => {
                console.log(text[0].value);
                router.push(`/summaries/${subject}`);
            }, 1000);
            finishLoading();
        });

    }

    return (
        <div className={styles.new}>
            <Wizard returnPath={`/summaries/${subject}`} contentData={data} callback={finishWizard} title={"New Summary for " + subject}></Wizard>
        </div>
    )
}
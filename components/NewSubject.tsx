import { useRouter } from "next/router";
import Wizard from "../components/Wizard";
import WizardField from "../models/WizardField";
import styles from "../styles/Summary.module.scss";
import WizardResult from "../models/WizardResult";
import SubjectPostDTO from "../models/SubjectPostDTO";
import { createSubject } from "../services/Subject.service";

export default function NewSubject({returnPath}: {returnPath: string}) {
    const router = useRouter();

    function finisheWizard(text:WizardResult[],callbackLoadingText,finishLoading) {
        //TODO: test if Backend is done
        
        const dto :SubjectPostDTO = {
            name: text[0].value,
            shortName: text[1].value
        }
        createSubject(dto).then((res:string) => {
            finishLoading();
            setTimeout(() => {
                console.log(res);
                router.push(returnPath+"/"+res);
            }, 300);
        })
    }

    return (
        <div className={styles.new}>
            <Wizard returnPath={returnPath} containerWidth={50} contentData={[[new WizardField('Name','text','',true),new WizardField('Abkürzung','text','',false)]]} callback={finisheWizard} title={"New Subject"}></Wizard>
        </div>
    )
}
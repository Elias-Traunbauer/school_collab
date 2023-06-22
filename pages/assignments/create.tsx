import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import WizardResult from "../../models/WizardResult";
import styles from '../../styles/Assignment.module.scss'
import AssignmentDTO from "../../models/AssignmentDTO";
import {createAssignment} from "../../services/Assignment.service";
import { error } from "console";

export default function AssignmentCreation() {
    const router = useRouter();

    function finish(data: WizardResult[], setLoadingText, finishLoading) {
        const result:AssignmentDTO = {
            title: data[0].value,
            description: data[4].value,
            content: data[5].value,
            due: data[1].value,
            groupId: data[3].value,
            subjectId: data[2].value,
        }
        console.log(result);

        createAssignment(result).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });


        setLoadingText("Loading");
        setTimeout(() => {
            finishLoading();
            setLoadingText("done!");

            setTimeout(() => {
                //router.push("/assignments");
            }, 500);
        }, 2000);
    };

    const data = [
        [new WizardField('title', 'text', '', true), new WizardField('deadline', 'date', new Date(), true)],
        [new WizardField('subject', 'select', [{value:1,displayText:'Mathe'},{value:2,displayText:"Deutsch"}], true), new WizardField('group', 'select', [{value:1,displayText:'Gruppe1'},{value:2,displayText:"Gruppe2"}], true)],
        [new WizardField('description', 'text', '', true),new WizardField('content', 'md', '', false)]
    ]

    return (
        <div className={styles.CreationContainer}>
            <Wizard returnPath="/assignments/" contentData={data} callback={finish} title={"Assignment"}></Wizard>
        </div>
    )
}
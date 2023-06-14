import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import styles from '../../styles/Assignment.module.scss'

export default function CreateAssignment() {

    function nothing() {
    }

    const data = [[new WizardField('title','text','',true),new WizardField('deadline','date',new Date(),true)],[new WizardField('description','md','',false)]]

    return (
        <div className={styles.CreationContainer}>
            <Wizard contentData={data} callback={nothing} title={"Assignment"}></Wizard>
        </div>
    )
}
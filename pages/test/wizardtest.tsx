import Wizard from "../../components/Wizard";
import SelectItem from "../../models/SelectItem";
import WizardField from "../../models/WizardField"
import WizardResult from "../../models/WizardResult";

export default function WizardTest() {

    const slelectList :SelectItem[] = [
        {
            value: 1,
            displayText: "test1"
        },
        {
            value: 2,
            displayText: "test2"
        },
        {
            value: 3,
            displayText: "test3"
        }
    ];
    const field = new WizardField("test","select",slelectList,true);

    function handleCallback(result:WizardResult[],changetext,finishWizard){
        changetext("test");
        console.log(result);
        setTimeout(() => {
            finishWizard();
        }, 2000);
    }

    return (
        <>
         <h1>Wizard Test</h1>
            <Wizard contentData={[[field,field]]} callback={handleCallback} title={"Test"}></Wizard>
        </>
           
    )
}
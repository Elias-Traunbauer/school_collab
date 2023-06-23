import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import WizardResult from "../../models/WizardResult";
import styles from '../../styles/Assignment.module.scss'
import AssignmentDTO from "../../models/AssignmentDTO";
import {createAssignment} from "../../services/Assignment.service";
import { error } from "console";
import { use, useEffect, useState } from "react";
import Group from "../../models/Group";
import { getAllGroups } from "../../services/Group.service";
import SelectItem from "../../models/SelectItem";

export default function AssignmentCreation() {
    const router = useRouter();
    const [groups, setGroups] = useState<SelectItem[]>([
        {value:1,displayText:'Gruppe1'},
        {value:2,displayText:"Gruppe2"}
    ]);
    const [subjects, setSubjects] = useState<SelectItem[]>([
        {value:1,displayText:'Fach1'},
        {value:2,displayText:"Fach2"}
    ]);

    useEffect(() => {
       function fetchData(){
        getAllGroups().then((res) => {
            console.log("res",res);
            let tmpGroups:SelectItem[] = [];
            res.map((group:Group,index) => {
                tmpGroups.push({value:index,displayText:group.name});
                //groups.push({value:group.id,displayText:group.name});
            });
            setGroups(tmpGroups);
        }).catch((error) => {
            console.log(error);
        });
       }
    },[]);

    function finish(data: WizardResult[], setLoadingText, finishLoading) {
        const result:AssignmentDTO = {
            title: data[0].value,
            description: data[4].value,
            content: data[5].value,
            due: data[1].value,
            groupId: data[3].value,
            subjectId: data[2].value,
        }

        createAssignment(result).then((res) => {
            console.log("res",res);
        }).catch((error) => {
            console.log(error);
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
        [new WizardField('subject', 'select', subjects, true), new WizardField('group', 'select', groups, true)],
        [new WizardField('description', 'text', '', true),new WizardField('content', 'md', '', false)]
    ]

    return (
        <div className={styles.CreationContainer}>
            <Wizard returnPath="/assignments/" contentData={data} callback={finish} title={"Assignment"}></Wizard>
        </div>
    )
}
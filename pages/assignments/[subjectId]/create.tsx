import { useRouter } from "next/router";
import Wizard from "../../../components/Wizard";
import WizardField from "../../../models/WizardField";
import WizardResult from "../../../models/WizardResult";
import styles from '../../../styles/Assignment.module.scss'
import AssignmentDTO from "../../../models/AssignmentDTO";
import {createAssignment} from "../../../services/Assignment.service";
import { error } from "console";
import { use, useEffect, useState } from "react";
import Group from "../../../models/Group";
import { getAllGroups } from "../../../services/Group.service";
import SelectItem from "../../../models/SelectItem";
import User from "../../../models/User";
import Subject from "../../../models/Subject";
import { getSubjectById } from "../../../services/Subject.service";
import { getUser } from "../../../services/User.service";

export default function AssignmentCreation() {
    const router = useRouter();
    const subjectId = router.query.subjectId;
    const [subject, setSubject] = useState<Subject>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function fetchData() {
            // check if subjectId is a number
            const subjectIdToNumber = parseInt(subjectId as string);
            if(isNaN(subjectIdToNumber)){
                return;
            }
            const tmpSubject = await getSubjectById(subjectIdToNumber);
            setSubject(tmpSubject);
            const tmpUser = await getUser();
            setUser(tmpUser);
        }
        fetchData();
    }, []);

    function finish(data: WizardResult[], setLoadingText, finishLoading) {
        // parse subjectId from router
        const tmpSubjectId = parseInt(router.query.subjectId as string);
        if(isNaN(tmpSubjectId)){
            return;
        }
        const result:AssignmentDTO = {
            title: data[0].value,
            description: data[3].value,
            content: data[3].value,
            due: data[1].value,
            //TODO: group from Wizard
            groupId: 4,
            subjectId: tmpSubjectId,
        }
        setLoadingText("Creating assignment...");

        console.log(result);

        createAssignment(result).then((res) => {
            setLoadingText("done!");
            setTimeout(() => {
                finishLoading();
                router.push("/assignments/"+subjectId);
            }, 200);
        }).catch((error) => {
            console.log(error);
        });
    };

    const data = [
        [new WizardField('title', 'text', '', true), new WizardField('deadline', 'date', new Date(), true)],
        //[new WizardField('group', 'select', '', true)],
        [new WizardField('description', 'text', '', true),new WizardField('content', 'md', '', false)]
    ]

    return (
        <div className={styles.CreationContainer}>
            <Wizard returnPath={"/assignments/"+subject} contentData={data} callback={finish} title={"Assignment"}></Wizard>
        </div>
    )
}
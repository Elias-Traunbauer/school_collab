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
import GroupUser from "../../../models/GroupUser";
import Loading from "../../../components/DefaultLoading";

export default function AssignmentCreation() {
    const router = useRouter();
    const subjectId = router.query.subjectId;
    const [subject, setSubject] = useState<Subject>();
    const [user, setUser] = useState<User>();
    const [groups, setGroups] = useState<SelectItem[]>([]);
    const [data, setData] = useState<WizardField[][]>([]);

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
            console.log("select groups");
            getAllGroups().then((res:Group[]) => {
                console.log("groups",res);
                const tmpGroups:SelectItem[] = [];
                res.forEach((group:Group) => {
                    const newItem:SelectItem = {
                        value: group.id,
                        displayText: group.name
                    }
                    tmpGroups.push(newItem);
                });
                const tmpData = [[new WizardField('title', 'text', '', true), new WizardField('deadline', 'date', new Date(), true)]]
                if(tmpGroups.length > 1){
                    tmpData.push([new WizardField('group', 'select', tmpGroups, true)]);
                }
                tmpData.push([new WizardField('description', 'text', '', true),new WizardField('content', 'md', '', false)]);
                setData(tmpData);
                setGroups(tmpGroups);
            });
        }
        fetchData();
    }, []);

    function finish(data: WizardResult[], setLoadingText, finishLoading) {
        // parse subjectId from router
        const tmpSubjectId = parseInt(router.query.subjectId as string);

        console.log(tmpSubjectId);
        if(isNaN(tmpSubjectId)){
            return;
        }
        var result:AssignmentDTO;
        if(data.length == 4){
            if(groups.length < 1){
                return;
            }

            result = {
                title: data[0].value,
                description: data[2].value,
                content: data[3].value,
                due: data[1].value,
                groupId: groups[0].value,
                subjectId: tmpSubjectId,
            }
        }
        else{
            result = {
                title: data[0].value,
                description: data[3].value,
                content: data[4].value,
                due: data[1].value,
                //TODO: group from Wizard
                groupId: data[2].value,
                subjectId: tmpSubjectId,
            }
        }
        
        setLoadingText("Creating assignment...");

        console.log("RESULT",result);

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

    return (
        <div className={styles.CreationContainer}>
            {
                data&&data.length > 0 ?
                <Wizard returnPath={"/assignments/"+subject} contentData={data} callback={finish} title={"Assignment"}></Wizard>
                :
                <Loading center={true}></Loading>
            }
        </div>
    )
}
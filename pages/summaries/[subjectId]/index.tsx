import { useRouter } from "next/router";
import SummaryPostCard from "../../../components/SummaryPostCard";
import styles from '../../../styles/SummaryCollection.module.scss'
import Image from "next/image";
import Wizard from "../../../components/Wizard";
import Subject from "../../../models/Subject";
import { useEffect, useState } from "react";
import Summary from "../../../models/Summary";
import {getSummariesBySubjectId} from "../../../services/Summary.service";

//slug is the subject
export default function SummaryCollection() {
    //const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
    const router = useRouter();
    const subjectId =  router.query.subjectId;
    const [subject, setSubject] = useState<Subject>();
    const [posts, setPosts] = useState<Summary[]>();

    useEffect(() => {
        async function fetchData() {
            const subjectIdAsNumber = parseInt(subjectId as string);
            if(isNaN(subjectIdAsNumber)) {
                return;
            }
            const tmpSummaries = await getSummariesBySubjectId(subjectIdAsNumber);
            setPosts(tmpSummaries);
        }
        fetchData();
    }, []);
    
    function goBack() {
        router.push('/summaries');
    }

    function handleNewSumary() {
        router.push(`/summaries/${subject}/newSummary`);
    }

    return (
        <div className={styles.container}>
            <div>
                <Image onClick={goBack} width={50} height={50} alt='return' src={"/arrow_right_alt.svg"}></Image>
                <h1>{subject&&subject.name}</h1>
            </div>
            <button onClick={handleNewSumary}>
                New Summary +
            </button>
            
            {
                posts&&posts.map&&posts.map((post, i) => {
                    return <SummaryPostCard key={i}></SummaryPostCard>
                })
            }
        </div>
    )
} 
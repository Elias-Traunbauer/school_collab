import styles from '../../../styles/Assignment.module.scss'
import { useState, useEffect, useContext } from 'react'
import AssignmentCard from '../../../components/AssignmentCard';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Assignment from '../../../models/Assignment';
import {getAllAssignments} from '../../../services/Assignment.service';
import UserContext from '../../../components/UserContext'
import { get } from 'http';
import Group from '../../../models/Group';
import Subject from '../../../models/Subject';
import { getSubjectById } from '../../../services/Subject.service';

export default function Assignments() {
    const context = useContext(UserContext);

    const [assignmentData, setAssignmentData] = useState<Assignment[]>([]);
    const [displayAssignments, setDisplayAssignments] = useState<Assignment[]>([]);
    const router = useRouter();
    const [searched, setSearched] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const subjectId = router.query.subjectId;
    const [subject, setSubject] = useState<Subject>();

    useEffect(() => {
        async function fetchDataAsync() {
            // check if subjectId is a number

            if(!subjectId && isNaN(parseInt(subjectId as string))){
                return;
            }

            const subjectIdToNumber = parseInt(subjectId as string);
            const tmpSubject = await getSubjectById(subjectIdToNumber);
            console.log("SUBJECT", tmpSubject);
            setSubject(tmpSubject);
            getAllAssignments().then((res) => {
                
                /* filter assignments by subjectId
                res = res.filter((assignment) => {
                    return assignment.subject.id === subjectIdToNumber;
                })
                */

                res.forEach(element => {
                    element.subject = tmpSubject;
                    element.due = new Date(element.due);
                });
                setAssignmentData(res);
                setDisplayAssignments(res);
                
            }).catch((err) => {
                
            });
        }
        fetchDataAsync();
    }, [router]);

    function resetSearch(){
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        searchInput.value = '';
        search();
    }

    function search(){
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const searchValue = searchInput.value;
        if(searchValue === ''){
            setDisplayAssignments(assignmentData);
            setSearched(false);
        }
        else{
            const filteredAssignments = assignmentData.filter((assignment) => {
                return assignment.title.toLowerCase().includes(searchValue.toLowerCase());
            })
            setDisplayAssignments(filteredAssignments);
            setSearched(true);
        }
        
    }

    function handleKeyDown(event){
        if(event.key === 'Enter'){
            search();
        }
    }

    function goBack(){
        router.push("/assignments/");
    }

    useEffect(() => {
        console.log("SUB",subject);
    }, [subject]);

    return (
        <div className={styles.assignmentcontainer}>
            <div className={styles.assignmentheader}>
                <div>
                    <Image onClick={goBack} width={10} height={10} alt='return' src={"/arrow_right_alt.svg"}></Image>
                    <h1>Assignments</h1>
                </div>
                

                <div>
                <input onKeyDown={handleKeyDown} id='searchInput' type="text" placeholder="Suche..."></input>
                <button onClick={search}>
                    <Image src="/search.svg" alt="search" width={20} height={20}></Image>
                </button>
                {
                        searched&&
                        <button onClick={resetSearch}>
                            <Image src="/restart.svg" alt="search" width={20} height={20}></Image>
                        </button>
                    }
                </div>
               
                <button onClick={() => router.push(subjectId+"/create")}>Create</button>
            </div>
            <div className={styles.assignmentCardsContainer}>
            {
                displayAssignments.map((element, i) => {
                    return <AssignmentCard key={element.id} assignment={element}></AssignmentCard>
                })
            }
            </div>
        </div>
    );
}

import styles from '../../styles/Assignment.module.scss'
import { useState, useEffect, useContext } from 'react'
import AssignmentCard from '../../components/AssignmentCard';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Assignment from '../../models/Assignment';
import {getAllAssignments} from '../../services/Assignment.service';
import UserContext from '../../components/UserContext'
import { get } from 'http';
import Group from '../../models/Group';
import Subject from '../../models/Subject';

export default function Assignments() {
    const context = useContext(UserContext);

      const mockSubject:Subject = {
        name: "DBI",
        id: 0,
        version: "0"
      };


    const [assignmentData, setAssignmentData] = useState<Assignment[]>([]);
    const [displayAssignments, setDisplayAssignments] = useState<Assignment[]>([]);
    const router = useRouter();
    const [searched, setSearched] = useState(false);
    const [searchValue, setSearchValue] = useState('');




    useEffect(() => {
        async function fetchDataAsync() {
            getAllAssignments().then((res) => {
                
                //subject not implemented yet
                res.forEach(element => {
                    element.subject = mockSubject;
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
                return assignment.title.toLowerCase().includes(searchValue.toLowerCase()) || assignment.subject.name.toLowerCase().includes(searchValue.toLowerCase());
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

    return (
        <div className={styles.assignmentcontainer}>
            <div className={styles.assignmentheader}>
                <h1>Assignments</h1>

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
               
                <button onClick={() => router.push("assignments/create")}>Create</button>
            </div>
            <div className={styles.assignmentCardsContainer}>
            {
                displayAssignments.map((element, i) => {
                    return <AssignmentCard key={i} assignment={element}></AssignmentCard>
                })
            }
            </div>
        </div>
    );
}

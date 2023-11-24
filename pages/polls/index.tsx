import React, { useEffect, useState } from 'react';
import styles from '../../styles/PollList.module.scss';
import PollCard from '../../components/Pollcard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Poll from '../../models/Poll';
import { getPolls } from '../../services/Poll.service';
export default function PollList(){

    const router = useRouter();
    
    const [polls, setPolls] = useState<Poll[]>([]);
    const [displayPolls, setDisplayPolls] = useState<Poll[]>([]);
    const [searched, setSearched] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            getPolls().then((res) => {
                console.log("POLLS" + res);
                setPolls(res);
                setDisplayPolls(res);
            });
            
        }
        fetchData();
    },[]);

    function addNewPoll(){
        router.push('/polls/create');
    }

    function handleSearch(){
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const searchValue = searchInput.value;
        if(searchValue === ''){
            setDisplayPolls(polls);
            setSearched(false);
        }else{
            // filter after title and description but prioritize title
            const filteredPolls = polls.filter((poll) => {
                return poll.title.toLowerCase().includes(searchValue.toLowerCase()) || poll.description.toLowerCase().includes(searchValue.toLowerCase());
            })
            setDisplayPolls(filteredPolls);
            setSearched(true);
        }

    }

    function resetSearch(){
        setDisplayPolls(polls);
        setSearched(false);
    }

    function handleKeydown(event){
        console.log(event.key);
        if(event.key === 'Enter'){
            handleSearch();
        }
    }


    return(
        <div className={styles.container}>
            <div>
                <h1>Umfragen</h1>
            </div>
            <div>
                <div>
                    <input onKeyDown={handleKeydown} id='searchInput' type="text" placeholder="Suche..."></input>
                    <button onClick={handleSearch}>
                        <Image src="/search.svg" alt="search" width={20} height={20}></Image>
                    </button>
                    {
                        searched&&
                        <button onClick={resetSearch}>
                            <Image src="/restart.svg" alt="search" width={20} height={20}></Image>
                        </button>
                    }
                </div>
                <button onClick={addNewPoll}>
                        Umfrage Erstellen
                </button>
            </div>
            {displayPolls.map((poll) => {
                return <PollCard key={poll.id} poll={poll}></PollCard>
            })
            }

        </div>
    )
}
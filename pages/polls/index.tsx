import React, { useEffect, useState } from 'react';
import styles from '../../styles/PollList.module.scss';
import PollCard from '../../components/Pollcard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Poll from '../../models/Poll';
import { getPolls } from '../../services/Poll.service';
import PollCardLoading from '../../components/PollCard_loading';
export default function PollList(){
    const router = useRouter();
    
    const [polls, setPolls] = useState<Poll[]>();
    const [displayPolls, setDisplayPolls] = useState<Poll[]>();
    const [searched, setSearched] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            getPolls().then((res) => {
                res = sortPolls(res);
                console.log("POLLS" + res);
                setPolls(res);
                setDisplayPolls(res);
            });
            
        }
        fetchData();
    },[router]);

    function sortPolls(polls: Poll[]): Poll[]{
        //sort by due date and then by title
        polls.sort((a, b) => {
            if (a.due > b.due) {
                return -1;
            }
            else if (a.due < b.due) {
                return 1;
            }
            else {
                if (a.title > b.title) {
                    return -1;
                }
                else if (a.title < b.title) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });

        return polls;
    }

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
                <h1>Polls</h1>
            </div>
            <div>
                <div>
                    <input onKeyDown={handleKeydown} id='searchInput' type="text" placeholder="Search..."></input>
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
                        Create poll
                </button>
            </div>
            {displayPolls?
            displayPolls.map((poll) => {
                return <PollCard key={poll.id} poll={poll}></PollCard>
            })
            :
                Array(5).fill(0).map((_, i) => {
                    return <PollCardLoading key={i}></PollCardLoading>
                })
            }

        </div>
    )
}
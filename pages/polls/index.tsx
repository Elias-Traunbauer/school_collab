import React, { useState } from 'react';
import styles from '../../styles/PollList.module.scss';
import PollCard from '../../components/Pollcard';
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function PollList(){

    const router = useRouter();
    
    const mockPolls = [
        {
            id: 1,
            title: 'Poll Title',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            user:'Thomas',
            end: new Date('2025-06-01T00:00:00.000Z'),
            start: new Date(),
        },
        {
            id: 2,
            title: 'Another one',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt',
            user:'Thomas',
            end: new Date('2021-06-01T00:00:00.000Z'),
            start: new Date(),
        }
    ]
    const [polls, setPolls] = useState(mockPolls);
    const [displayPolls, setDisplayPolls] = useState(mockPolls);
    const [searched, setSearched] = useState(false);

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
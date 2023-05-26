import React from 'react';
import styles from '../../styles/PollList.module.scss';
import PollCard from '../../components/Pollcard';
import { useRouter } from 'next/router';
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
            title: 'Poll Title',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt',
            user:'Thomas',
            end: new Date('2021-06-01T00:00:00.000Z'),
            start: new Date(),
        }
    ]

    function addNewPoll(){
        router.push('/poll/create');
    }


    return(
        <div className={styles.container}>
            <div>
                <h1>Umfragen</h1>
            </div>
            <div>
                <button onClick={addNewPoll}>
                    <p>
                        Umfrage Erstellen
                    </p>
                </button>
            </div>
            {mockPolls.map((poll) => {
                return <PollCard key={poll.id} poll={poll}></PollCard>
            })
            }

        </div>
    )
}
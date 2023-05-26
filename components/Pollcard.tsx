import { CSSProperties, use, useState } from 'react';
import styles from '../styles/PollCard.module.scss'
export default function PollCard(){
    const mockPoll = {
        id: 1,
        title: 'Poll Title',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        user:'Thomas',
        end: new Date('2021-06-01T00:00:00.000Z'),
        start: new Date(),
    }
    const backgroundcolor = 'var(--background_1)';

    function displayDate(){
        const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

        if(!mockPoll.end){
            return 'Kein Enddatum'
        }

        if(new Date(mockPoll.end) < new Date()){
            return 'abgelaufen';
        }

        const date = new Date(mockPoll.end);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = ('0'+date.getHours()).slice(-2);
        const minutes = ('0'+date.getMinutes()).slice(-2);

        if(year !== new Date().getFullYear()){
            return `endet im ${months[month-1]} ${year}`;
        }

        const today = new Date();
        if(today.getDate() == day && today.getMonth()+1 == month && today.getFullYear() == year){
            return `endet um ${hours}:${minutes}`;
        }

        return `endet am ${day}.${month} um ${hours}:${minutes}`;
    }

    return(
        <div style={{ '--cardColor': backgroundcolor } as CSSProperties} className={`${styles.container} ${new Date(mockPoll.end) < new Date()&&styles.disabled}`}>
            <div>
                <p>erstellt von <span>{mockPoll.user}</span></p>
            </div>
            <div>
                <h1>{mockPoll.title}</h1>
            </div>
            <div>
                <div>
                <p>{mockPoll.description}</p>
                </div>
            </div>

            <div>
                <p>{displayDate()}</p>
            </div>
        </div>
    )
}
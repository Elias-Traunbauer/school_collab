import { CSSProperties, use, useEffect, useState } from 'react';
import styles from '../styles/PollCard.module.scss'
import { useRouter } from 'next/router';
import Poll from '../models/Poll';
import { getUser, getUserById } from '../services/User.service';
import User from '../models/User';
export default function PollCard({key,poll}: {key:any,poll: Poll}){
    const backgroundcolor = 'var(--background_1)';
    const [creatorUser, setCreatorUser] = useState<User>();

    useEffect(() => {
        if(!poll){
            return;
        }
        console.log("PARAM",poll);
        getUserById(poll.creatorUserId).then((res) => {
            setCreatorUser(res);
        });
    },[poll]);

    const router = useRouter();

    function displayDate(){
        if(!poll){
            return '';
        }

        const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

        if(!poll.due){
            return 'Kein Enddatum'
        }

        if(new Date(poll.due) < new Date()){
            return 'abgelaufen';
        }

        const date = new Date(poll.due);
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

    function openDetail(){
        router.push(`/polls/${poll.id}`);
    }

    return(
        <div onClick={openDetail} style={{ '--cardColor': backgroundcolor } as CSSProperties} className={`${styles.container} ${new Date(poll&&poll.due&&poll.due) < new Date()&&styles.disabled}`}>
            <div>
                <p>erstellt von <span>{creatorUser&&creatorUser.username}</span></p>
            </div>
            
            <div>
                <h2>{poll&&poll.title}</h2>
            </div>
            <div>
                <div>
                <p>{poll&&poll.description}</p>
                </div>
            </div>

            <div>
                <p>{displayDate()}</p>
            </div>
        </div>
    )
}
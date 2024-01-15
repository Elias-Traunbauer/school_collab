import { useState } from "react";
import User from "../models/User";
import styles from '../styles/Chat.module.scss';

export default function ChatmemberListItem({member,onChange}: {member:User,onChange?: (add:boolean,member:User) => void;}) {
    const [checked, setChecked] = useState(false);

    return (
        <div className={styles.memberlistItem} onClick={()=>{setChecked(!checked); onChange(!checked,member)}}>
            <p>{member.username}</p>
            {
                checked?
                <button className="btn btn-cancel" onClick={()=>{setChecked(false); onChange(false,member)}}>-</button>
                :
                <button className="btn btn-outline-primary" onClick={()=>{setChecked(true); onChange(true,member)}}>+</button>
            }
        </div>
    )
}
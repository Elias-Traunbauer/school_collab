import User from '../models/User';
import styles from '../styles/UserSelectionList.module.scss'
import Image from 'next/image'
export default function UserSelectionItem({ user,onUserSelected }: { user: User, onUserSelected?: (user: User) => void}) {
    function handleClicked() {
        const checkbox = document.getElementById("checkbox_"+user.id) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            if (onUserSelected) {
                onUserSelected(user);
            }
        }
    }
    
    return(
        <div onClick={handleClicked} className={styles.listItem}>
        <div>
            <div>
                <div>
                    <Image src="/TestProfile.jpeg" alt="profile" width={30} height={30}/>
                    <p>{user.username}</p>
                </div>
                <input id={"checkbox_"+user.id} type="checkbox"/>
            </div>
            </div>
        </div>
    )
}
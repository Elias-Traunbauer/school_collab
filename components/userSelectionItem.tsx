import styles from '../styles/UserSelectionList.module.scss'
import Image from 'next/image'
export default function UserSelectionItem({ user, onUserSelected,id=1 }: { id?:number, user?: any, onUserSelected?: any }) {
    function handleClicked() {
        const checkbox = document.getElementById("checkbox_"+id) as HTMLInputElement;
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
                    <Image src="/person.svg" alt="profile" width={30} height={30}/>
                    <p>Max Mustermann</p>
                </div>
                <input id={"checkbox_"+id} type="checkbox"/>
            </div>
            </div>
        </div>
    )
}
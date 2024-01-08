import { useEffect, useState } from "react";
import Image from "next/image";
import Group from "../../../../models/Group";
import { useRouter } from "next/router";
import { getGroupById } from "../../../../services/Group.service";
import styles from "../../../../styles/GroupDetails.module.scss";


export default function GroupDetails() {
    const router = useRouter();
    const [group, setGroup] = useState<Group>(null);

    useEffect(() => {
        async function fetchDataAsync() {
            const groupId = router.query;
            if (groupId) {
                const group = getGroupById(groupId as unknown as number);
                setGroup(group);
            }
        }
        fetchDataAsync();
        
    }, [router.query]);

    function removeUser(id: number){
        const newGroup = {...group};
        newGroup.groupUsers = group.groupUsers.filter(user => user.userId !== id);
        
        setGroup(newGroup);
    }

    function addUser(){
        console.log('addUser');
    }

    return (
        <>
            <div className={styles.container}>
                    {group && (
                        <div>
                            <h1>{group.name}</h1>
                            <p>{group.description}</p>

                            <div>
                                <h2>Users ({group.groupUsers.length})</h2>
                                <button className="btn-secondary" onClick={addUser}>+ Hinzufügen</button>
                            </div>
                            

                            <div>
                                <div>
                                    <Image width={30} height={30} src={'/person.svg'} alt={''}></Image>
                                    <p>{group.creatorUser.firstName} {group.creatorUser.lastName}</p>
                                    <p>{group.creatorUser.email}</p>
                                </div>

                                {group.groupUsers.map(user => (
                                    <div key={user.userId}>
                                        <Image width={30} height={30} src={'/person.svg'} alt={''}></Image>
                                        <p>{user.user.firstName} {user.user.lastName}</p>
                                        <p>{user.user.email}</p>
                                        <button className="btn-primary" onClick={() => removeUser(user.userId)}>x</button>
                                    </div>
                                ))}
                            </div>   
                        </div>
                    )}
            </div>
        </>
    )
}
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Group from "../../../../models/Group";
import { useRouter } from "next/router";
import { getGroupById } from "../../../../services/Group.service";
import styles from "../../../../styles/GroupDetails.module.scss";
import { searchUser } from "../../../../services/User.service";
import User from "../../../../models/User";
import ChatmemberListItem from "../../../../components/ChatmemberListItem";


export default function GroupDetails() {
    const router = useRouter();
    const [group, setGroup] = useState<Group>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isAddUser, setIsAddUser] = useState<boolean>(false);
    const [displayMembers, setDisplayMembers] = useState<User[]>([]);
    const [newGroupMembers, setNewGroupMembers] = useState<User[]>([]);

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

    function handleSearchMembers(e:ChangeEvent){
        const inputElement = e.target as HTMLInputElement;
        const targetName = inputElement.value;

       searchUser(targetName).then((res) => {
            console.log(res);
            setDisplayMembers(res);
       });
    }

    function handleChangeNewMembers(add: boolean, user: User) {
        console.log(add, user);
        if (add) {
            setNewGroupMembers([...newGroupMembers, user]);
        }
        else {
            const tmpMembers = newGroupMembers.filter(member => member.id !== user.id);
            setNewGroupMembers(tmpMembers);
        }
    }

    return (
        <>
            <div className={styles.container}>
                    {group && (
                        <div>
                            <div>
                                <input id="name" defaultValue={group.name} className={!editMode ? styles.editInput : ""}></input>
                                <button className={styles.editButton} onClick={() => setEditMode(!editMode)}>
                                    <Image width={25} height={25} src={'/edit.svg'} alt={''}></Image>
                                </button>
                            </div>
                            
                            <textarea defaultValue={group.description} className={!editMode ? styles.editInput : ""}></textarea>

                            <div>
                                <h2>Users ({group.groupUsers.length})</h2>

                                {editMode &&
                                <button className="btn-secondary" onClick={() => setIsAddUser(true)} disabled={!editMode}>+ Hinzufügen</button>
                                }
                            </div>

                            {isAddUser && 
                                <dialog className={styles.addUser}>
                                    <div>
                                        <input id='memberSearchInput' onChange={handleSearchMembers} className={styles.memberSearchbar} type="text" placeholder="Mitglieder Suchen" />

                                            <div className={styles.memberlist}>
                                                {
                                                    displayMembers && displayMembers.map &&displayMembers.map((member, index) => {
                                                        return (
                                                            <ChatmemberListItem key={member.id} member={member} onChange={handleChangeNewMembers}></ChatmemberListItem>
                                                        )
                                                    })
                                                }
                                            </div>

                                    </div>
                                </dialog> 
                            }
                            

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
                                        {editMode &&
                                            <button className="btn-primary" onClick={() => removeUser(user.userId)}>x</button>
                                        }
                                        
                                    </div>
                                ))}
                            </div> 
                        </div>
                    )}
            </div>
        </>
    )
}
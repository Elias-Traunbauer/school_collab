import React, { useState } from 'react'
import styles from '../styles/UserSelectionList.module.scss'
import Image from 'next/image'
import UserSelectionItem from '../components/userSelectionItem'
import User from '../models/User'
export default function UserSelectionList() {

    const [users, setUsers] = useState<User[]>(generateMockUsers(30));
    const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    function generateMockUsers(count:number): User[] {
        const tmpusers: User[] = [];
        for (let i = 1; i <= count; i++) {
            const u = {
              username: `user${i}`,
              firstName: `First${i}`,
              lastName: `Last${i}`,
              email: `user${i}@example.com`,
              id: i,
              version: '1.0'
            };
            
            tmpusers.push(u);
        }

        return tmpusers;
    }


    function handleAdd() {
        console.log(selectedUsers);
    }

    function selectUsers(user: User) {
        const index = selectedUsers.indexOf(user);
        if (index > -1) {
            selectedUsers.splice(index, 1);
        } else {
            selectedUsers.push(user);
        }
        setSelectedUsers([...selectedUsers]);
    }

    function handleSearch(event) {
        const search = event.target.value;
        if (search.length > 0) {
            const filteredUsers = users.filter((user) => {
                return user.username.includes(search) || user.firstName.includes(search) || user.lastName.includes(search);
            });
            setDisplayedUsers(filteredUsers);
        } else {
            setDisplayedUsers(users);
        }
    }


    return (
        <div className={styles.container}>
            <div>
                <input onInput={handleSearch} type="text" placeholder='Suchen...' />
                <button>
                    <Image src={'/person_add.svg'} alt={'Add'} width={30} height={30}></Image>
                </button>
            </div>

            <div className={styles.listContainer}>
                {
                    displayedUsers.map((user) => {
                        return <UserSelectionItem onUserSelected={selectUsers} user={user} key={user.id}></UserSelectionItem>
                    })
                }
            </div>

            <button onClick={handleAdd}>
                Add
            </button>
        </div>
    )
}
import React from 'react'
import styles from '../styles/UserSelectionList.module.scss'
import Image from 'next/image'
import UserSelectionItem from '../components/userSelectionItem'
export default function UserSelectionList() {
    return (
        <div className={styles.container}>
            <div>
                <input type="text" placeholder='Suchen...' />
                <button>
                <Image src={'/person_add.svg'} alt={'Add'} width={30} height={30}></Image>
                </button>
            </div>

            <UserSelectionItem></UserSelectionItem>


        </div>
    )
}
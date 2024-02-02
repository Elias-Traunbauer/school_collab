import { useEffect, useState } from "react";
import Group from "../../../models/Group";
import { getAllGroups } from "../../../services/Group.service";
import styles from '../../../styles/Group.module.scss';
import { useRouter } from "next/router";
import AdminNavbar from "../../../components/AdminNavbar";

export default function Groups() {
    const router = useRouter();
    const [groups, setGroups] = useState<Group[]>([]);
    const [displayedGroups, setDisplayedGroups] = useState<Group[]>([]);

    useEffect(() => {
        getAllGroups().then(groups => {


            setGroups(groups.sort((a,b) => a.name.localeCompare(b.name)));
            setDisplayedGroups(groups);
        });
    }, []);

    function handleSearch(e) {
        const searchValue = e.target.value;
        const filteredGroups = groups.filter((group) => {
          return group.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setDisplayedGroups(filteredGroups);
      }

    return (
        <div className={styles.container}>
            <div>
                <h1>Groups</h1>
                <div>
                    <input onChange={handleSearch} placeholder="Search..."></input>
                    <button onClick={() => router.push('./groups/newGroup')}>new group +</button>
                </div>               
            </div>
            <div>
                {displayedGroups.map(group => (
                    <div key={group.id} onClick={() => router.push(`./groups/${group.id}`)}>
                        <div>
                            <h1>{group.name}</h1>
                        </div>
                        <div>
                            <p>{group.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
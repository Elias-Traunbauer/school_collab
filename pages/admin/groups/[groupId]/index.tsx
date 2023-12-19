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
        const groupId = router.query;
        if (groupId) {
            const group = getGroupById(groupId as unknown as number);
            setGroup(group);
        }
    }, [router.query]);

    return (
        <>
            <div className={styles.container}>
                    {group && (
                        <div>
                            <h1>{group.name}</h1>
                            <p>{group.description}</p>
                            <h2>Users ({group.groupUsers.length})</h2>

                            <div>
                                {group.groupUsers.map(user => (
                                    <div key={user.id}>
                                        <Image width={30} height={30} src={'/person.svg'} alt={''}></Image>
                                        <p>{user.user.firstName} {user.user.lastName}</p>
                                        <button className="btn-primary">x</button>
                                    </div>
                                ))}

                                {group.groupUsers.map(user => (
                                    <div key={user.id}>
                                        <Image width={30} height={30} src={'/person.svg'} alt={''}></Image>
                                        <p>{user.user.firstName} {user.user.lastName}</p>
                                    </div>
                                ))}
                            </div>   
                        </div>
                    )}
            </div>
        </>
    )
}
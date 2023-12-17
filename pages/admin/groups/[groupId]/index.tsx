import { useEffect, useState } from "react";
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
        <div className={styles.container}>
                {group && (
                    <div>
                        <h1>{group.name}</h1>
                        <p>{group.description}</p>

                        <div>
                            <p>Username</p>
                            <p>Vorname</p>
                            <p>Nachname</p>
                            <p>E-Mail</p>
                        </div>

                        {group.groupUsers.map(user => (
                            <div key={user.id}>
                                <p>{user.user.username}</p>
                                <p>{user.user.firstName}</p>
                                <p>{user.user.lastName}</p>
                                <p>{user.user.email}</p>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}
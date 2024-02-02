import { getAllGroups, postGroup } from "../../../services/Group.service";
import styles from '../../../styles/GroupCreate.module.scss';
import { useRouter } from "next/router";
import GroupPostDTO from "../../../models/GroupPostDTO";



export default function CreateGroup() {
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();

        const nameInput = document.getElementById("name") as HTMLInputElement;
        const descriptionInput = document.getElementById("description") as HTMLInputElement;
        const group:GroupPostDTO = {
            name: nameInput.value,
            description: descriptionInput.value,
        };

        postGroup(group).catch(err => {
            console.log(err);
        });


        router.push("/admin/groups");
    }

    return (
        <div className={styles.container}>
            <h1>Neue Gruppe erstellen</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name*</label>
                        <input id="name" required></input>
                    </div>
                    
                    <div>
                        <label>Beschreibung*</label>
                        <input id="description" required></input>
                    </div>

                    <div>
                        <button className="btn-cancel" type="button" onClick={() => router.push("/admin/groups")}>Zurück</button>
                        <button className="btn-primary" type="submit">Speichern</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
import { useRouter } from "next/router";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import styles from "../../styles/Summary.module.scss";
import NewSubject from "../../components/NewSubject";

export default function AddSubject() {
    const router = useRouter();
    const returnPath = "/summaries"

    return (
        <NewSubject returnPath={returnPath}></NewSubject>
    )
}
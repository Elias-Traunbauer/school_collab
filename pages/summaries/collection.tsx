import { useRouter } from "next/router";
import SummaryPostCard from "../../components/SummaryPostCard";
import styles from '../../styles/SummaryCollection.module.scss'
import Image from "next/image";
import Wizard from "../../components/Wizard";

export default function SummaryCollection() {
    const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
    const router = useRouter();
    const subject = router.query.subject;

    function goBack() {
        router.push('/summaries');
    }

    function handleNewSumary() {
        router.push(`/summaries/newSummary?subject=${subject}`);
    }

    return (
        <div className={styles.container}>
            <div>
                <Image onClick={goBack} width={50} height={50} alt='return' src={"/arrow_right_alt.svg"}></Image>
                <h1>{subject}</h1>
            </div>
            <button onClick={handleNewSumary}>
                New Summary +
            </button>
            
            {
                posts.map((post, i) => {
                    return <SummaryPostCard key={i} post={post}></SummaryPostCard>
                })
            }
        </div>
    )
} 
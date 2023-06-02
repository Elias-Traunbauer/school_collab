import SummaryPostCard from "../../components/SummaryPostCard";
import styles from '../../styles/SummaryCollection.module.scss'

export default function SummaryCollection({subject = "DBI"}) {
    const posts = [{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "Math"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"},{author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}];
    return (
        <div className={styles.container}>
            <h1>{subject}</h1>
            {
                posts.map((post, i) => {
                    return <SummaryPostCard key={i} post={post}></SummaryPostCard>
                })
            }
        </div>
    )
} 
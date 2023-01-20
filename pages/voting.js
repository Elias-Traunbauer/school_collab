import styles from '../styles/voting.module.css'

export default function voting({VoteId}){

    //Mock
    const user = {
        name: "thomas"
    }

    const creator={
        name: "thomas"
    }

    const input={
        question: "frage",
        answers:["ja","nein"]
    }


    return(
        <div className={styles.wrapper}>
            <div className={styles.votingContainer}>
                <h1>{input.question}</h1>
                <ul>
                    {
                        input.answers.map((element, i) => {
                        return <li key={i}>{element}</li>
                        })
                    }
                </ul>
                <div className={styles.buttonArray}>
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    );
}
import Image from "next/image";
import React from "react";
import styles from "../styles/VotingComponent.module.scss";
import { useState } from "react";
export default function VotingComponent({ withScore = false, votingId = 1 }) {

    const[score,setScore] = useState(5);
    const[voteState,setVoteState] = useState(0);

    function handleUpvote(){
        if(voteState === 0){
            setScore(score+1);
            setVoteState(1);
        }else if(voteState === 1){
            setScore(score-1);
            setVoteState(0);
        }else if(voteState === -1){ 
            setScore(score+2);
            setVoteState(1);
            const downvote = document.querySelector(`.${styles.downvote}`) as HTMLInputElement;
            if(downvote)
            downvote.checked = false;
        }
    }

    function handleDownvote(){
        if(voteState === 0){
            setScore(score-1);
            setVoteState(-1);
        }else if(voteState === 1){
            setScore(score-2);
            setVoteState(-1);
            const upvote = document.querySelector(`.${styles.upvote}`) as HTMLInputElement;
            if(upvote)
            upvote.checked = false;
        }
        else if(voteState === -1){
            setScore(score+1);
            setVoteState(0);
        }
    }

  return (
    <>
      {withScore ? (
        <div className={styles.container}>
            <div>
                <div>
                <p>{score}</p>
                <div>
                    <div className={styles.vote}>
                        <input onChange={handleUpvote} type="checkbox" className={styles.upvote}></input>
                    </div>
                    <div className={styles.vote}>
                        <input onChange={handleDownvote} type="checkbox" className={styles.downvote}></input>
                    </div>
                </div>
                
            </div>

            </div>
            
        </div>
      ) : (
        <>
            <div className={styles.vote}>
                <input onChange={handleUpvote} type="checkbox" className={styles.upvote}></input>
            </div>
            <div className={styles.vote}>
                <input onChange={handleDownvote} type="checkbox" className={styles.downvote}></input>
            </div>
        </>
      )}
    </>
  );
}

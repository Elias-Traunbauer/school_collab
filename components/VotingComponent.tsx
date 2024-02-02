import Image from "next/image";
import React, { use, useEffect } from "react";
import styles from "../styles/VotingComponent.module.scss";
import { useState } from "react";
import { HaveVoted } from "../services/Summary.service";
import { useRouter } from "next/router";
export default function VotingComponent({ itemkey, withScore = false, vote}:{itemkey:number,withScore?:boolean,vote?:Function}) {

    const[score,setScore] = useState(5);
    const[voteState,setVoteState] = useState<number>(0);
    const router = useRouter();

    function handleUpvote(e){
        if(voteState === 0){
            setScore(score+1);
            setVoteState(1);
            vote(1);
        }else if(voteState === -1){
            setScore(score+2);
            setVoteState(1);
            vote(1);
        }
        else if(voteState === 1){
            setScore(score-1);
            setVoteState(0);
            vote(0);
        }
    }

    function handleDownvote(){
        console.log("DOWNVOTE");
        if(voteState === 0){
            setScore(score-1);
            console.log("DOWNVOTE 0");
            setVoteState(-1);
            vote(-1);
        }else if(voteState === -1){
            setScore(score+1);
            setVoteState(0);
            vote(0);
        }
        else if(voteState === 1){
            setScore(score-2);
            setVoteState(-1);
            vote(-1);
        }
    }

    useEffect(()=>{
        console.log("STARTSTATE:", voteState, "ITEMKEY:",itemkey);
        HaveVoted(itemkey).then((res)=>{
            console.log("RES:",res);
            if(!isNaN(res))
            setVoteState(res)
        })
    },[router]);

    useEffect(()=>{
        console.log("STARTSTATE:", voteState, "ITEMKEY:",itemkey);
        HaveVoted(itemkey).then((res)=>{
            console.log("RES:",res);
            if(!isNaN(res))
            setVoteState(res)
        })
    },[itemkey]);

    useEffect(()=>{
        console.log("VOTESTATECHANGE",voteState);
    },[voteState]);

    function preventdefault(e){
        e.stopPropagation();
    }

  return (
    <div id={"voting_Containter_"+itemkey} className={withScore&&styles.container}>
    <>
        {withScore ? (
            <div onClick={(e)=>preventdefault(e)}>
                <div>
                <p >{score}</p>
                <div>
                    <div className={styles.vote}>
                        <input checked={voteState==1} onClick={(e)=>preventdefault(e)} onChange={(e)=>handleUpvote(e)} type="checkbox" className={styles.upvote}></input>
                    </div>
                    <div className={styles.vote}>
                        <input checked={voteState==-1} onClick={(e)=>preventdefault(e)} onChange={handleDownvote} type="checkbox" className={styles.downvote}></input>
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
    </div>

  );
}

import Image from "next/image";
import React, { use, useEffect } from "react";
import styles from "../styles/VotingComponent.module.scss";
import { useState } from "react";
import { HaveVoted } from "../services/Summary.service";
import { useRouter } from "next/router";
export default function VotingComponent({ itemkey, withScore = false, vote, initialScore}:{itemkey:number,withScore?:boolean,vote?:Function, initialScore:number}) {

    const[score,setScore] = useState(initialScore?initialScore:0);
    const[voteState,setVoteState] = useState<number>(0);
    const router = useRouter();

    useEffect(()=>{
        setScore(initialScore);
    }, [initialScore]);

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
        
        if(voteState === 0){
            setScore(score-1);
            
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
        
        HaveVoted(itemkey).then((res)=>{
            
            if(!isNaN(res))
            setVoteState(res)
        })
    },[router]);

    useEffect(()=>{
        
        HaveVoted(itemkey).then((res)=>{
            
            if(!isNaN(res))
            setVoteState(res)
        })
    },[itemkey]);

    useEffect(()=>{
        
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

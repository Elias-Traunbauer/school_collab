import Image from "next/image";
import React, { use, useEffect } from "react";
import styles from "../styles/VotingComponent.module.scss";
import { useState } from "react";
import { HaveVoted } from "../services/Summary.service";
import { useRouter } from "next/router";
export default function VotingComponentLoading(){

  return (
    <div className={styles.loadingVotingContainer}>
      <div className={styles.vote}>
        <input type="checkbox" className={styles.upvote}></input>
      </div>
      <div className={styles.vote}>
        <input type="checkbox" className={styles.downvote}></input>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import SummaryPostCard from "../../../components/SummaryPostCard";
import styles from "../../../styles/SummaryCollection.module.scss";
import Image from "next/image";
import Wizard from "../../../components/Wizard";
import Subject from "../../../models/Subject";
import { useEffect, useState } from "react";
import Summary from "../../../models/Summary";
import {
  executeVote,
  getSummariesBySubjectId,
} from "../../../services/Summary.service";
import { getSubjectById } from "../../../services/Subject.service";
import SummaryVoteDTO from "../../../models/SumaryVoteDTO";
import SummaryPostCardLoading from "../../../components/SummaryPostCard_Loading";

//slug is the subject
export default function SummaryCollection() {
  // Lösung für name/user info die nd da is
  const backgroundHexCodes = [
    "#3F51B5", // Indigo - Contrast Ratio: 8.59 (AAA)
    "#2196F3", // Blue - Contrast Ratio: 8.59 (AAA)
    "#00BCD4", // Cyan - Contrast Ratio: 7.22 (AAA)
    "#9C27B0", // Deep Purple - Contrast Ratio: 5.48 (AAA)
    "#00ACC1", // Light Blue - Contrast Ratio: 7.39 (AAA)
    "#4CAF50", // Green - Contrast Ratio: 5.72 (AAA)
    "#673AB7", // Deep Purple 400 - Contrast Ratio: 5.53 (AAA)
    "#4DB6AC", // Teal 400 - Contrast Ratio: 5.99 (AAA)
    "#E64A19", // Dark Orange - Contrast Ratio: 5.75 (AAA)
    "#5D4037", // Brown - Contrast Ratio: 10.03 (AAA) - Darker shade
    "#455A64", // Blue Grey - Contrast Ratio: 7.19 (AAA) - Darker shade
  ];

  const router = useRouter();
  const subjectId = router.query.subjectId;
  const [subject, setSubject] = useState<Subject>();
  const [posts, setPosts] = useState<Summary[]>();

  function getSubjectAsNumber(): number | null {
    const subjectIdAsNumber = parseInt(router.query.subjectId as string);
    if (isNaN(subjectIdAsNumber)) {
      console.log("SUBJECT ID IS NOT A NUMBER");
      return null;
    }
    return subjectIdAsNumber;
  }

  useEffect(() => {
    async function fetchData() {
      const subjectIdAsNumber = getSubjectAsNumber();
      const tmpSubject = await getSubjectById(subjectIdAsNumber);
      console.log("SUBJECT", tmpSubject);
      await setSubject(tmpSubject);
      await loadPosts();
    }
    fetchData();
  }, [router.query.subjectId]);

  function goBack() {
    router.push("/summaries");
  }

  function handleNewSumary() {
    router.push(`/summaries/${subjectId}/newSummary`);
  }

  async function loadPosts() {
    const subjectId = getSubjectAsNumber();
    const summaries = await getSummariesBySubjectId(subjectId);
    const sortedPosts = sortPosts(summaries);

    setPosts(sortedPosts);
  }

  function sortPosts(posts): Summary[] {
    if (posts) {
      posts.sort((a, b) => {
        if (a.votes < b.votes) {
          return 1;
        } else if (a.votes > b.votes) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return posts;
  }

  async function handleVote(tmp: SummaryVoteDTO) {
    await executeVote(tmp);
    loadPosts();
  }

  return (
    <div className={styles.container}>
      <div>
        <Image
          onClick={goBack}
          width={50}
          height={50}
          alt="return"
          src={"/arrow_right_alt.svg"}
        ></Image>
        <h1>{subject && subject.name}</h1>
      </div>
      <button onClick={handleNewSumary}>New Summary +</button>

      {posts ? (
        posts.map &&
        posts.map((post, i) => {
          return (
            <SummaryPostCard
              voteFunc={handleVote}
              post={post}
              key={post.id}
            ></SummaryPostCard>
          );
        })
      ) : (
        Array(3).fill(0).map((_, i) => {
            return <SummaryPostCardLoading key={i}></SummaryPostCardLoading>
        })
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import styles from "../styles/Index.module.scss";
import Countdown from "../components/Countdown";
import UserContext from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import Assignment from "../models/Assignment";
import AssignmentDashboardItem from "../components/AssignmentDashboardItem";
import { getAssignmentsPreview } from "../services/Assignment.service";

export default function Home() {
  const context = useContext(UserContext);

  const [assignments, setAssignments] = useState<Assignment[]>();

  useEffect(() => {
    async function fetchAssignments() {
      const assignments = await getAssignmentsPreview();
      setAssignments(assignments);
    }
    fetchAssignments();
  }, [context]);

  return (
    <div className={styles.container}>
      <div className={styles.contentLeft}>
        <div className={styles.assignmentContainer}>
          <h2>Assignments</h2>
          <div>
          {
            //TODO: Add loading
            assignments ? (
              assignments.map((assignment) => {
                return (
                  <AssignmentDashboardItem
                    key={assignment.id}
                    assignment={assignment}
                  ></AssignmentDashboardItem>
                );
              })
            ) : (
              <p>Loading...</p>
            )
          }
          </div>
          
        </div>
      </div>
      <div className={styles.contentRight}></div>
    </div>
  );
}

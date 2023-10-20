import Subject from "../models/Subject";
import { getAllAssignments } from "../services/Assignment.service";
import {getAllSummaries} from "../services/Summary.service";

export async function getSubjects(): Promise<Subject[]>{
    const assignmentresult = await getAllAssignments();
    const assignmentSubjects = assignmentresult.map((assignment) => {
        return assignment.subject;
    });

    const summaryresult = await getAllAssignments();
    const summarySubjects = summaryresult.map((assignment) => {
        return assignment.subject;
    });

    const subjects = assignmentSubjects.concat(summarySubjects);
    return subjects;
  }

export async function getSubjectById(id: number): Promise<Subject>{
    const subjects = await getSubjects();
    const subject:Subject = subjects.find((subject) => subject.id === id);
    return subject;
}

import Subject from "../models/Subject";
import { getAllAssignments } from "../services/Assignment.service";
import {getAllSummaries} from "../services/Summary.service";

const url = "/api/Subject"

export async function getSubjects(): Promise<Subject[]>{
    const assignmentresult = await getAllAssignments();
    const assignmentSubjects = assignmentresult.map((assignment) => {
        return assignment.subject;
    });

    const summaryresult = await getAllSummaries();
    const summarySubjects = summaryresult.map((assignment) => {
        return assignment.subject;
    });

    const subjects = assignmentSubjects.concat(summarySubjects);

    
    return subjects;
  }

  export async function getSubjectsOfAssignments(): Promise<Subject[]>{
     const assignmentresult = await getAllAssignments();
     const assignmentSubjects = assignmentresult.map((assignment) => {
          return assignment.subject;
     });
     return assignmentSubjects;
  }

  export async function getSubjectsOfSummaries(): Promise<Subject[]>{
     const summaryresult = await getAllSummaries();
     const summarySubjects = summaryresult.map((assignment) => {
         return assignment.subject;
     });

     return summarySubjects;
  }

export async function getSubjectById(id: number): Promise<Subject>{
   try{
         const response = await fetch(url+'/'+id,{
              method: 'GET'
         });
         if(response.status != 200){
              throw response;
         }
         const data = await response.json();
         return data.value;
   }
   catch(error){
        throw error;
   }
}

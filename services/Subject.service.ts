import Subject from "../models/Subject";
import { getAllAssignments } from "../services/Assignment.service";
import {getAllSummaries} from "../services/Summary.service";

const url = "/api/Subject"

export async function getSubjects(): Promise<Subject[]>{
     const result: Subject[] = [];
     const resultIds: number[] = [];
     
     const assignmentresult = await getAllAssignments();
     const summaryresult = await getAllSummaries();

          
     for (const iterator of assignmentresult) {
          if(!resultIds.includes(iterator.subject.id)){
               result.push(iterator.subject);
               resultIds.push(iterator.subject.id);
          }
     }

     for (const iterator of summaryresult) {
          if(!resultIds.includes(iterator.subject.id)){
               result.push(iterator.subject);
               resultIds.push(iterator.subject.id);
          }
     }
     return result;
  }

  export async function getSubjectsOfAssignments(): Promise<Subject[]>{
     const assignmentresult = await getAllAssignments();
     const result: Subject[] = [];
     const resultIds: number[] = [];

     for (const iterator of assignmentresult) {
          if(!resultIds.includes(iterator.subject.id)){
               result.push(iterator.subject);
               resultIds.push(iterator.subject.id);
          }
     }
     return result;
  }

  export async function getSubjectsOfSummaries(): Promise<Subject[]>{
     const summaryresult = await getAllSummaries();
     const result: Subject[] = [];
     const resultIds: number[] = [];

     for (const iterator of summaryresult) {
          if(!resultIds.includes(iterator.subject.id)){
               result.push(iterator.subject);
               resultIds.push(iterator.subject.id);
          }
     }
     return result;
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

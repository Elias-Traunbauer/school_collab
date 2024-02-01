import Subject from "../models/Subject";
import SubjectPostDTO from "../models/SubjectPostDTO";
import { getAllAssignments } from "../services/Assignment.service";

const url = "/api/Subject"

export async function getSubjects(): Promise<Subject[]>{
     try{
          const response = await fetch(url + "/all",{
               method: 'GET'
          });
          if(response.status != 200){
               throw response;
          }
          const data = await response.json();
          return data;
     }
     catch(error){
          throw error;
     }
  }

  export async function getSubjectsOfAssignments(): Promise<Subject[]>{
     const assignmentresult = await getAllAssignments();
     const result: Subject[] = [];
     const resultIds: number[] = [];

     for (const iterator of assignmentresult) {
          if(iterator.subject && !resultIds.includes(iterator.subject.id)){
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
         console.log(data);
         return data.value;
   }
   catch(error){
        throw error;
   }
}

export async function createSubject(subject: SubjectPostDTO):Promise<string>{
     try{
          const response = await fetch(url,{
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(subject)
          });
          if(response.status != 200){
               throw response;
          }
          const data = await response.json();
          return data;
     }
     catch(error){
          throw error;
     }
}

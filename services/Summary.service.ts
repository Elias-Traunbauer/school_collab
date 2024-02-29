import { get } from "http";
import BackendSummary from "../models/BackendSummary";
import SummaryVoteDTO from "../models/SumaryVoteDTO";
import Summary from "../models/Summary";
import SummaryFileBackend from "../models/SummaryFileBackend";
import SummaryPostDTO from "../models/SummaryPostDTO";
import SummaryPutDTO from "../models/SummaryPutDTO";

const url = '/api/Summary';

export async function getSummaryById(id: number): Promise<Summary>{
  if(isNaN(id)){
    return;
  }
  try {
    const response = await fetch(url+'/'+id, {
      method: 'GET'
    });
    if (response.status === 401) {
      throw response;
    }
    const data = await response.json() as BackendSummary;

    const res: Summary = {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content,
      subjectId: data.subjectId,
      files: data.files.map((file:SummaryFileBackend) => file.fileId),
      votes: data.votes,
      subject: data.subject,
      version: data.version,
      reports: []
    }
    
    return res;
  } catch (error) {
    
    throw error;
  }
}

export async function createSummary(summary: SummaryPostDTO){
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(summary)
    });

    if (response.status === 200) {
      
      return response.json();
    } else {
      throw response;
    }
  } catch (error) {
    throw error;
  }
}

export async function getSummariesBySubjectId(subjectId:number){
  try {
    const response = await fetch(url+'/BySubject/'+subjectId, {
      method: 'GET'
    });
    if (response.status != 200) {
      throw response;
    }
    
    const data : BackendSummary[]= await response.json();

    const res: Summary[] = [];

    for (const iterator of data) {
      res.push({
        id: iterator.id,
        title: iterator.title,
        description: iterator.description,
        content: iterator.content,
        subjectId: iterator.subjectId,
        files: iterator.files.map((file:SummaryFileBackend) => file.fileId),
        votes: iterator.votes,
        subject: iterator.subject,
        version: "",
        reports: []
      });
    }
    
    return res;
  } catch (error) {
    
    throw error;
  }

}
export async function getBackendSummaryById(id: number): Promise<BackendSummary>{
  if(isNaN(id)){
    return;
  }
  try {
    const response = await fetch(url+'/'+id, {
      method: 'GET'
    });
    if (response.status === 401) {
      throw response;
    }
    const data = await response.json() as BackendSummary;

    return data;
  } catch (error) {
    
    throw error;
  }

}

export async function updateSummary(summary:Summary){

  console.log("SUMMARYUPDATE",summary);

  const tmpFiles: SummaryFileBackend[] = [];

  //temporäre Lösung für traunis humbug
  const tmpBackendSummary:BackendSummary = await getBackendSummaryById(summary.id);

  for (const iterator of summary.files) {
    const bogos = tmpBackendSummary.files.find((file:SummaryFileBackend) => file.fileId === iterator);
    tmpFiles.push({
      fileId: iterator,
      summaryId: summary.id,
      id: bogos?bogos.id:null,
    })
  }

  const dto : SummaryPutDTO = {
    id: summary.id,
    title: summary.title,
    description: summary.description,
    content: summary.content,
    subjectId: summary.subjectId,
    files: tmpFiles
  }

  console.log("SUMMARYDTO",JSON.stringify(dto));

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });

    if (response.status === 200) {
      
      const contentType = response.headers.get('content-type');
      if (contentType) {
        const data = await response.json();

        if (data.status != 200) {
          throw data;
        }
        
      }
    } else {
      throw response;
    }
  } catch (error) {
    throw error;
  }
}

export async function executeVote(param:SummaryVoteDTO){
  const dto = {
    value: param.vote
  }
  console.log("VOTEDTO",dto);

  try {
    const response = await fetch(url+'/'+param.summaryId+'/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });
  } catch (error) {
    throw error;
  }
}

export async function HaveVoted(id:number): Promise<number>{
  try {
    const response = await fetch(url+'/'+id+'/IfIHaveVoted', {
      method: 'GET'
    });
    if (response.status === 401) {
      throw response;
    }
    const data = await response.json();
    
    return data.value;
  } catch (error) {
    
    throw error;
  }
}
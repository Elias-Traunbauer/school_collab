import SummaryVoteDTO from "../models/SumaryVoteDTO";
import Summary from "../models/Summary";
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
    const data = await response.json();
    
    return data;
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
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    
    throw error;
  }

}

export async function updateSummary(summary:Summary|SummaryPutDTO){

  const dto : SummaryPutDTO = {
    title: summary.title,
    description: summary.description,
    content: summary.content,
    subjectId: summary.subjectId,
    files: summary.files
  }

  console.log("SUMMARYDTO",dto);

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

  try {
    const response = await fetch(url+'/'+param.summaryId+'/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });

    if (response.status === 200) {
      
      const data = await response.json();
      return data.value;
    } else {
      throw response;
    }
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
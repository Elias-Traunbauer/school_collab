import Summary from "../models/Summary";

const url = '/api/Assignment';

export async function getAllSummaries(): Promise<Summary[]>{
  try {
    const response = await fetch(url+'/related', {
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

export async function createSummary(summary: Summary){
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(summary)
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

export async function getSummariesBySubjectId(subjectId:number){
  try {
    const response = await fetch(url+'/subject/'+subjectId, {
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

export async function updateSummary(summary:Summary){
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(summary)
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
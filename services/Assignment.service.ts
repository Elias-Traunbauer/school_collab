import Assignment from "../models/Assignment";
import AssignmentDTO from "../models/AssignmentDTO";

const url = '/api/Assignment';

export async function getAllAssignments(): Promise<Assignment[]> {
  try {
    const response = await fetch(url+'/related', {
      method: 'GET'
    });
    if (response.status === 401) {
      throw response;
    }
    
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export async function createAssignment(assignment: AssignmentDTO){
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assignment)
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
    console.error('Error fetching subjects:', error);
    throw error;
  }
}
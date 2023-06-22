import Assignment from "../models/Assignment";
import AssignmentDTO from "../models/AssignmentDTO";

const url = '/api/Assignment';

export async function getAllAssignments(): Promise<Assignment[]> {
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    if (response.status === 401) {
      throw response;
    }
    console.log("res", response);
    const data = await response.json();
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
      // If the response status is 200, check if there is a response body
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
import Assignment from "../models/Assignment";

const url = '/api/Assignment';

export const getAllAssignments = async (): Promise<Assignment[]> => {
    try {
      const response = await fetch(url, {
        method: 'GET'
    });
    if (response.status === 401) {
        throw response;
    }
    console.log("res",response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  };
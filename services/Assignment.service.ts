import Assignment from "../models/Assignment";

const url = 'https://localhost:7119/api/Assignment';

export const getAllAssignments = async (): Promise<Assignment[]> => {
    try {
      const response = await fetch(`${url}/related`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  };
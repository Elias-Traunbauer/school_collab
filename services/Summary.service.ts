export const getAllSubjects = async (groupId: number): Promise<string[]> => {
    try {
      const response = await fetch(`https://api.example.com/subjects?classId=${groupId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  };
  
  export const postData = async (payload: any): Promise<any> => {
    try {
      const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  
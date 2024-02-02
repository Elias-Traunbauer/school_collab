
import Assignment from "../models/Assignment";
import AssignmentBackend from "../models/AssignmentBackend";
import AssignmentDTO from "../models/AssignmentDTO";
import AssignmentPutDTO from "../models/AssignmentPUTDTO";
import AssignmentPostDTO from "../models/AssignmentPostDTO";
import FileBackend from "../models/FileBackend";

const url = '/api/Assignment';

export async function getAllAssignments(): Promise<Assignment[]> {
  try {
    const response = await fetch(url+'/related', {
      method: 'GET'
    });
    if (response.status != 200) {
      throw response;
    }
    
    const data = await response.json();

    console.log("DATA",data);

    const res : Assignment[] = [];
    for (const iterator of data) {
      res.push({
        title: iterator.title,
        description: iterator.description,
        content: iterator.content,
        created: iterator.created,
        modified: iterator.modified,
        due: iterator.due,
        group: iterator.group,
        subject: iterator.subject,
        user: iterator.user,
        userId: iterator.userId,
        groupId: iterator.groupId,
        subjectId: iterator.subjectId,
        id: iterator.id,
        version: iterator.version,
      })
    }

    console.log("RES",res);
    return res;
  } catch (error) {
    
    throw error;
  }
};

export async function getAssignmentById(id: number): Promise<Assignment> {
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

    // map AssignmentBackend to Assignment
    const res : Assignment = {
      title: data.title,
      description: data.description,
      content: data.content,
      created: data.created,
      modified: data.modified,
      due: data.due,
      group: data.group,
      subject: data.subject,
      user: data.user,
      userId: data.userId,
      groupId: data.groupId,
      subjectId: data.subjectId,
      id: data.id,
      version: data.version,
      files: data.files.filter((file) => file.instruction === false).map((file) => file.fileId),
      instructions: data.files.filter((file) => file.instruction === true).map((file) => file.fileId)
    }
    
    return res;
  } catch (error) {
    
    throw error;
  }
}

export async function createAssignment(assignment: AssignmentDTO){
  const tmpFiles: FileBackend[] = [];

  const dto:AssignmentPostDTO = {
    title: assignment.title,
    description: assignment.description,
    content: assignment.content,
    subjectId: assignment.subjectId,
    due: assignment.due,
    groupId:  assignment.groupId,
    files: [],
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
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
    return response;
  } catch (error) {
    
    throw error;
  }
}

export async function updateAssignment(assignment: Assignment){

  const tmpFiles: FileBackend[] = [];

  for (const iterator of assignment.files) {
    tmpFiles.push({
      fileId: iterator,
      instruction: false,
      assignmentId: assignment.id,
      id: null
    })
  }

  for (const iterator of assignment.instructions) {
    tmpFiles.push({
      fileId: iterator,
      instruction: true,
      assignmentId: assignment.id,
      id: null
    })
  }

  const dto:AssignmentPutDTO = {
    id: assignment.id,
    title: assignment.title,
    description: assignment.description,
    content:  assignment.content,
    subjectId: assignment.subjectId,
    due: assignment.due,
    groupId: assignment.groupId,
    files: tmpFiles,
  }

  console.log("UPDAERES",JSON.stringify(dto));
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
    return response;
  } catch (error) {
    
    throw error;
  }
}

export async function getAssignmentBySubjectId(subjectId:number): Promise<Assignment[]>{
  try {
    const response = await getAllAssignments();
    console.log("RESPONSE",response);
    const res = response.filter((assignment:Assignment) => assignment.subjectId === subjectId);
    return res;
  } catch (error) {
    
    throw error;
  }
}
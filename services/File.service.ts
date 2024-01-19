import FileObject from "../models/File";

const url = '/api/File';
export async function postFiles(files : File[]):Promise<number[]> {
    const res: number[] = [];
    for (const item of files) {
        const tmpres = await postSingleFile(item);
        res.push(tmpres);
    }
    return res;
}

export async function postSingleFile(file:File): Promise<number>{
  console.log({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----'
    },
    body: file
  });
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; boundary=----'
          },
          body: file
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
        const data = await response.json();
        return data;
      } catch (error) {
        
        throw error;
      }
}

export async function getFileById(id:number){
    try{
        const response = await fetch(url+'/'+id, {
            method: 'GET'
        });

        if (response.status != 200) {
            throw response;
        }
        const data = await response.json();
          
        return data;
    }catch(error){
        throw error;
    }
}

export async function deleteFile(id:number){
    try{
        const response = await fetch(url+'/'+id, {
            method: 'DELETE'
        });

        if (response.status != 200) {
            throw response;
        }
          
        return response;
    }catch(error){
        throw error;
    }
}

export async function getFilesByIds(ids:number[]){
  const res:FileObject[] = [];
  for (const iterator of ids) {
    res.push(await getSingleFileById(iterator));
  }

  return res;
}

export async function getSingleFileById(id:number):Promise<FileObject>{
  try{
      const response = await fetch(url+'/'+id, {
          method: 'GET'
      });

      if (response.status != 200) {
          throw response;
      }
      const data = await response.json();
        
      return data;
  }
  catch(error){
      throw error;
  }
}

export async function getFileNameById(id:number){
  try{
    const response = await fetch(url+'/'+id+'/name', {
        method: 'GET'
    });

    if (response.status != 200) {
        throw response;
    }
    const data = await response.json();
      
    return data;
}
catch(error){
    throw error;
}
}

export async function getFileNamesByIds(ids:number[]){
  const res:string[] = [];
  for (const iterator of ids) {
    try{
      const filename = await getFileNameById(iterator)
      res.push(filename);
    }
    catch(error){
      throw error;
    }
  }
  return res;
}
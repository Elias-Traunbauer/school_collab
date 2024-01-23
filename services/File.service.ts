import FileObject from "../models/File";

const url = '/api/File';
export async function postFiles(files : File[]):Promise<number[]> {
    const res: number[] = [];
    for (const item of files) {
        const tmpres = await postSingleFile(item);
        res.push(tmpres);
    }
    console.log("POSTRES",res);
    return res;
}

export async function postSingleFile(file:File): Promise<number>{
  console.log("FILE",file);

  const formData = new FormData();
  formData.append('file', file);
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        });
        const data = await response.json();
        return data.id;
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
/*
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
*/

  return "MockedFileName"+id+".png"
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

export async function deleteFilesByIds(ids:number[]){
  const res:FileObject[] = [];
  for (const iterator of ids) {
    await deleteSingleFileById(iterator);
  }
}

export async function deleteSingleFileById(id:number){

}
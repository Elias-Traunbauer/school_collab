import FileObject from "../models/File";
import FileInfo from "../models/FileInfo";

const url = '/api/File';
export async function postFiles(files : File[]):Promise<number[]> {
  console.log("FILESBACKEND",files);
    const res: number[] = [];
    for (const item of files) {
      console.log("FILESBACKEND",item);
      try {
        const tmpres = await postSingleFile(item);
        res.push(tmpres);
      }
      catch (error) {
        throw error;
      }
    }
    console.log("POSTRES",res);
    return res;
}

export async function postSingleFile(file:File): Promise<number>{
  console.log("FILE",file);

  const formData = new FormData();
  formData.append('file', file);
  console.log("FORMDATA",formData);
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        });
        const data = await response.json();
        console.log("DATA",data);
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

export async function deleteFilesById(ids:number[]){
  for (const iterator of ids) {
    await deleteFile(iterator)
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

export async function getFileInfosById(id:number):Promise<FileInfo>{
  try{
    const response = await fetch(url+'/'+id+'/info', {
        method: 'GET'
    });

    if (response.status != 200) {
        throw response;
    }
    const data = await response.json();
      
    return data.value as FileInfo;
}
catch(error){
    throw error;
}
}

export async function getFileInfosByIds(ids:number[]):Promise<FileInfo[]>{
  const res:FileInfo[] = [];
  for (const iterator of ids) {
    const tmp = await getFileInfosById(iterator);
    res.push(tmp);
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

export async function downloadFileById(id:number){
  
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../serveices/config";

export async function createNote(obj)
{

  try {
      const token = await AsyncStorage.getItem("token");    

    if (!token) throw new Error("No token found");
    // make post request to stroe the new note in the database
    const response = await fetch(`${API_URL}/api/notes`,{
      method:'POST',
      headers:{
        "Accept":"application/ld+json",
        "Content-Type":"application/ld+json",
         "Authorization": `Bearer ${token}`, //  add the JWT here
      },
      body:JSON.stringify({
        text:obj.newNote,
        user:`/api/users/${obj.userId}`
      })
    });

    // Check if reposns is ok
    if(!response.ok) throw new Error('Failer to add note');

    //  parses the body into a JavaScript object 
    const data = await response.json();

    // console.log('response data :' ,data);
    return data
  }catch(error)
  {
    console.error("Error adding note:",error);
    throw Error;
    
  }
}
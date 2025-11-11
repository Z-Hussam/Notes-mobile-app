import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

export async function deleteNote(id)
{
    try{
         const token = await AsyncStorage.getItem("token");    

    if (!token) throw new Error("No token found");
        const reposns = await fetch(`${API_URL}/api/notes/${id}`,{
            method:'DELETE',
            headers:{
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json',
                "Authorization": `Bearer ${token}`, //  add the JWT here
            },
        });
        
        // if (!reposns.ok) {
            
        //   throw new Error('Failed to delete note with ID ')
        // } 
        const data = await reposns.json();
        console.log("Note deleted",data);
        // return data;
    }catch(error){
        // console.error("Error Deleting note ",error);
        
    }
}
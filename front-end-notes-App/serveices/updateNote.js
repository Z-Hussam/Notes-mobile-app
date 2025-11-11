import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

export async function updateNoteAPI(id, newText) {

    const token = await AsyncStorage.getItem("token");    

    if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/api/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
      "Accept": "application/ld+json",
      "Authorization": `Bearer ${token}`, //  add the JWT here
    },
    body: JSON.stringify({ text: newText }),
  });
  // Check if request succeeded
  if (!response.ok) {
    throw new Error(`Failed to update note: ${response.status}`);
  }

  // If the API returns 204 (No Content), don't try to parse JSON
  if (response.status === 204) {
    console.warn("API returned 204 No Content — no JSON in body");
    return null;
  }

  // Otherwise parse JSON
  const data = await response.json();
  
  return data;
}




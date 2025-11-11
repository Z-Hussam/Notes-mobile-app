import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import { useAuth } from "../../context/authContext";
import { API_URL } from "../../serveices/config";
import { createNote } from "../../serveices/createNote";
import { deleteNote } from "../../serveices/deleteNote";
import { updateNoteAPI } from "../../serveices/updateNote";
const NoteScreen = () => {

const router = useRouter();
const {user, loading:authLoading} =useAuth();


  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


  useEffect(()=>{
    if (!user && !authLoading ) {
      router.replace('/auth');
    }
  },[user,authLoading])


  useEffect(() => {
    if (user) {
      console.log(user)
      fetchNotes(user.user_id);
      
    }
  }, []);

  const fetchNotes = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      
      if (!token) throw new Error("No token found");
      

      // const response = await fetch(`${API_URL}/api/notes`, {
      const response = await fetch(`${API_URL}/api/users/${id}/notes`, {
       method: "GET",
       headers: {
         "Accept": "application/ld+json",
         "Content-Type": "application/ld+json",
         "Authorization": `Bearer ${token}`, //  add the JWT here
  },
});
    // Parse the JSON response
      const data = await response.json();
      
      // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch notes");
    }
  
      console.log(data)
      // Assuming the notes are in "member" key, but check this structure
      const notes = data["member"] || [];

      // Update state with the notes
      setNotes(notes);
    } catch (error) {
       console.error("Fetch notes error:", error);
      setError(error);
       Alert.alert("Error", error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const addNote = async () => {
    // if note value is emty do nothing
    if (newNote.trim() === "") return;
    const userId= user.user_id
    const obj = {newNote,userId}
    // use createNote function to make request to store a new note in the data
    const data = await createNote(obj);
    const updatedNotes = { id: data.id, text: data.text };

    setNotes((prev) => [...prev, updatedNotes]);

    setNewNote("");
    setModalVisible(false);
  };


  //Delete Note 
  const onDeleteNote = async (idToDelete) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            // Perform delete action
            await deleteNote(idToDelete);

            // Update state after successful delete
            const updatedNotes = notes.filter((note) => note.id !== idToDelete);

            // Set the updated notes list in state
            setNotes(updatedNotes);
          } catch (error) {
            console.error("Error deleting note:", error);
            Alert.alert("Error", "There was a problem deleting the note.");
          }
        },
      },
    ]);
  };

  //Update Note 
const saveNote = async(id,newText) =>{

  if(!newText.trim())return;

   try {
  const reponse = await updateNoteAPI(id,newText);

    

    // If the API returned no content, fallback to manual update
     setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: reponse.text } : note
      )
    );

  } catch (error) {
    console.error(" Erreur mise à jour:", error);
    Alert.alert("Erreur", "Impossible de mettre à jour la note");
  }
  
} 



  return (
    <View style={styles.container}>
      <Text style={styles.textnote}>Notes</Text>

      {/* Note Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#4169E1" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error} </Text>}
          {notes.length === 0 ? (
            <>
            <Text style={styles.noNotesText} >You have no notes </Text>
            </>
          ):(
            <NoteList notes={notes} onDelete={onDeleteNote} onEdit={saveNote} />
          ) }
          
        </>
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addBtnText}> + </Text>
      </TouchableOpacity>

      {/* Modal */}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addBtn: {
    backgroundColor: "#4169E1", // iOS blue (you can change)
    width: 66,
    height: 66,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // e.g. bottom-right corner
    bottom: 20,
    right: "6%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    marginBottom: 30,
  },
  addBtnText: {
    color: "white",
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },noNotesText:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'#555',
    margintTop:15,
  }
});

export default NoteScreen;

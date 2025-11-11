import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotesImg1 from "../assets/images/note.jpg";
import { useAuth } from "../context/authContext";
const  HomeScreen = () => {
  // const router = useRouter

  const{user,loading}=useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/notes')
    }
    
  }, [user,loading]);

  if (loading ) {
    return(
      <View style={styles.centeredContainer} >
      <ActivityIndicator size='large' color='#007bff'/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image source={NotesImg1}  style={styles.image} />
      <Text style={styles.title}> Bienvenue dans l'application notes. </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={()=> router.push('/notes')  }
        >
            <Text style={styles.buttonText} >Commencer </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:12,
    backgroundColor:'#f8f9fa'
  },
  image:
  {
   width:300,
   height:300,
   margingBottom:20,
  //  backgroundColor: '#1E90FF',
   borderRadius:10,
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    // margingBottom:28,
    color:'#666'
  },
  button:{
    backgroundColor:'#4169E1',
    paddingVertical:12,
    paddingHorizontal:25,
    borderRadius:8,
    alignItems:'center',
    marginTop:25
  },
  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },
  centeredContainer:{
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  }
});

export default HomeScreen;
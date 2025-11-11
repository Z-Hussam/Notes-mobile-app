import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/authContext";

const HeaderLogout = () => {
  const { user, logout } = useAuth();
  return user ? 
  (
    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
      <Text style={styles.logutText}>Logout</Text>
    </TouchableOpacity>
  ) 
  : null;
};
const styles = StyleSheet.create({
//   logoutBtn: {
//     marginRight: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor:'#efaeabff',
//     borderRadius: 8,
//   },
  logutText: {
    
    padding:7,
    color: "#0f4a9cff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default HeaderLogout;

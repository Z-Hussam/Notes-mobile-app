
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/authContext";

const HeaderLogout = () => {
  const { user, logout } = useAuth();
  return user ? (
    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  logoutBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffffff', // vibrant coral color
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    alignItems: 'center',
  },
  logoutText: {
    color: "#081bc6ff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeaderLogout;
/**import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
*/
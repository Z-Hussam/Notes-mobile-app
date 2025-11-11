
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";


import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../serveices/loginUser";
import { registerUser } from "../serveices/registerUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // logout()
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const decoded = jwtDecode(token);
      const { exp } = decoded;

      if (Date.now() >= exp * 1000) {
        // Token expired
        await AsyncStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(decoded);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
const register = async (obj) => {
  try {
    const data = await registerUser(obj);

    // Log the user in automatically after registration:
    const loginData = await loginUser({
      email: obj.email,
      password: obj.password,
    });

    await AsyncStorage.setItem("token", loginData.token);
    const decoded = jwtDecode(loginData.token);
    setUser(decoded);

    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      await AsyncStorage.setItem("token", data.token);

      const decoded = jwtDecode(data.token);
      setUser(decoded); // this sets user after login
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkUser,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

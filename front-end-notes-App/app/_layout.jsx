import { Stack } from "expo-router";

import HeaderLogout from "../components/HeaderLogout";
import { AuthProvider } from "../context/authContext";



const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4169E1",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerRight:()=> <HeaderLogout/>,
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Accueil" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        {/* <Stack.Screen name="auth" options={{ headerTitle: "Login" }} /> */}
      </Stack>
    </AuthProvider>
  );
};
export default RootLayout;

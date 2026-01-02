import { Stack } from 'expo-router';


const AuthLayout = () => {
    return (
       <Stack
       screenOptions={{
        headerShown:false,
        headerTitle: "Login",
       }}
       />
    );
}



export default AuthLayout;

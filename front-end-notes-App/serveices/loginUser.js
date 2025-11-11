import { API_URL } from "./config";
export async function loginUser(credentials) {
  try {
    console.log('credentials',credentials)
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    console.log('response',response);
    if (!response.ok) {
      throw new Error( "Failed to login . check your credentiales ",response);
    }
    const data = await response.json();

    // if (data.token) {
    //     await AsyncStorage.setItem('token',data.token)
    // }
    return data;
  } catch (error) {
    console.error(error);
     throw error;
  }
}

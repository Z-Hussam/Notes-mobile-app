import { API_URL } from "./config";

export async function registerUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Accept":"application/ld+json",
        "Content-Type":"application/ld+json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        roles: ["ROLE_USER"],
      }),
    });

    if (!response.ok) {
       const errData = await response.json();
      throw new Error(errData.detail || "Failed to create user account");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

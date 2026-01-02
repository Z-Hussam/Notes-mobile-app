
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/authContext";

const AuthScreen = () => {
  const { login, register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Un E-mail et un mot de passe sont requis.");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      if (isRegistering) {
        const userObject = { email, password, firstName, lastName };
        const registerResponse = await register(userObject);
        if (!registerResponse || registerResponse.error) {
          setError(registerResponse?.error?.toString() || "L'inscription a échoué");
          return;
        }
      } else {
        const credentials = { email, password };
        const response = await login(credentials);
        if (response?.error) {
          setError(response.error.toString());
          return;
        }
      }
      router.replace("/notes");
    } catch (err) {
      console.error("Erreur d'authentification:", err);
      setError(err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>{isRegistering ? "S'inscrire " : " Se connecter "}</Text>
        {error && <Text style={styles.error}>{error.toString()}</Text>}

        <TextInput
          style={styles.input}
          value={email}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          secureTextEntry
        />

        {isRegistering && (
          <>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder="Confirmez le mot de passe"
              placeholderTextColor="#aaa"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={firstName}
              placeholder="Prénom"
              placeholderTextColor="#aaa"
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Nom de famille"
              placeholderTextColor="#aaa"
              onChangeText={setLastName}
            />
          </>
        )}

        <TouchableOpacity style={styles.btn} onPress={handleAuth}>
          <Text style={styles.btnText}>{isRegistering ? "S'inscrire" : "Se connecter"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => setIsRegistering(!isRegistering)}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? "Vous avez déjà un compte ? Se connecter"
              : "Vous n'avez pas de compte ? Inscrivez-vous"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f4f8",
    paddingVertical: 40,
  },
  container: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#4169E1",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switchContainer: {
    marginTop: 15,
  },
  switchText: {
    textAlign: "center",
    color: "#4169E1",
    fontSize: 15,
  },
});

export default AuthScreen;
/*import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/authContext";

const AuthScreen = () => {
  const { login, register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    if (isRegistering && password !== confirmPassowrd) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isRegistering) {
        const userObject = { email, password, firstName, lastName };
        const registerResponse = await register(userObject);

        // Optional: check for registration success
        if (!registerResponse || registerResponse.error) {
          setError(
            registerResponse?.error?.toString() || "Registration failed"
          );
          return;
        }
      } else {
        
        const credentiels = { email, password };

        const response = await login(credentiels);
        if (response?.error) {
          setError(response.error.toString());
          return;
        }
      }

      //  Navigate after successful login
      router.replace("/notes");

    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message);
    }
        //  router.replace("/notes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {isRegistering ? "Sign up" : "Login"} </Text>

      {error ? <Text style={styles.error}>{error.toString()}</Text> : null}

      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        secureTextEntry
        textContentType="none"
      />

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            value={confirmPassowrd}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            onChangeText={setConfirmPassowrd}
            secureTextEntry
            textContentType="none"
          />
          <TextInput
            style={styles.input}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="#aaa"
            onChangeText={setFirstName}
            autoCapitalize="none"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            onChangeText={setLastName}
            autoCapitalize="none"
            keyboardType="default"
          />
        </>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleAuth}>
        <Text style={styles.btnText}>
          {isRegistering ? "Sign up" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {" "}
          {isRegistering
            ? "Already have an account ? Login"
            : "Don't have an account sign up"}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 10,
    color: "#4169E1",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 15,
  },
});

export default AuthScreen;
*/
import { View, Text , StyleSheet, TextInput, ActivityIndicator, Button} from "react-native";
import React, { useState } from "react";
import { FIREBASE_auth } from "../../Firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_auth;

  const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert('Check your Emails!');
    }
    catch (error: any) {
        console.log(error);
        alert('Login failed: ' + error.message);
    } finally {
        setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert('Check your Emails!');
    }
    catch (error: any) {
        console.log(error);
        alert('Sign up failed: ' + error.message);
    } finally {
        setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput value = {email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}>Login</TextInput>
      <TextInput secureTextEntry={true} value = {password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}>Login</TextInput>

      { loading ? <ActivityIndicator size="large" color="#0000ff"/> 
      : <>
      <Button title="Login" onPress={signIn} />
      <Button title="Create account" onPress={signUp} />
      </>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});

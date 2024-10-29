import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../../Firebaseconfig";
import { updateProfile, updateEmail, User } from "firebase/auth"; // Import update functions directly

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Account = ({ navigation }: RouterProps) => {
    const user = FIREBASE_AUTH.currentUser as User | null;
    const [username, setUsername] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        if (!user) return;

        try {
            await updateProfile(user, { displayName: username });
            await updateEmail(user, email);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account</Text>
            <Image
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/bookstore-2abd0.appspot.com/o/user%20icon.png?alt=media&token=10bbb6ea-4f1f-42d4-87c2-9214032acfd2",
                }}
                style={styles.image} 
            />
            <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                {isEditing ? (
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.text}>{username}</Text>
                )}
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                {isEditing ? (
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.text}>{email}</Text>
                )}
            </View>

            <View style={styles.buttonRow}>
                {isEditing ? (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={() => FIREBASE_AUTH.signOut()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 100,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
        height: 40,
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#121764',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#d9534f', // Different color for logout button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

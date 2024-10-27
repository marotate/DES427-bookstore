import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../../Firebaseconfig";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Account = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 20 }}>Account Screen</Text>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>
    );
};

export default Account;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebaseconfig';
import Login from './app/screens/Login';
import TabNavigation from './app/navigation/TabNavigation'; // Import TabNavigation

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          // If user is authenticated, navigate to TabNavigation which contains the Home screen
          <Stack.Screen
            name="Tabs"
            component={TabNavigation}
            options={{ headerShown: false }} // Hide the header for TabNavigation
          />
        ) : (
          // If user is not authenticated, navigate to the Login screen
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} // Hide the header for the Login screen
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebaseconfig';
import Login from './app/screens/Login';
import TabNavigation from './app/navigation/TabNavigation';
import Signup from './app/screens/SignUp'; 
import { LogBox } from 'react-native';
import CartProvider from './app/context/CartContext';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type RootStackParamList = {
  Login: undefined;
  Signup: { setIsSigningOut: React.Dispatch<React.SetStateAction<boolean>> };
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false); // add

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user && !isSigningOut ? (
            <Stack.Screen
              name="Tabs"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
                initialParams={{ setIsSigningOut }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
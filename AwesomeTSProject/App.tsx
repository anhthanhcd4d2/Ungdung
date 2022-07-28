import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/Home/Home';
import SignUp from './src/SignUp/SignUp';
import SignIn from './src/Login/SignIn/SignIn';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'signIn'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'signIn'} component={SignIn} />
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'signUp'} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
const Stack = createStackNavigator();

function AuthRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={SignIn} />
        <Stack.Screen name="cadastro" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthRoutes;

import React from 'react';
import {useState} from 'react';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';
import {Home} from './Home';
import {Chat} from './Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App(){
  const ui = (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sugn Up" component={SignUp}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  </NavigationContainer>
);

return ui;
}

export default App;
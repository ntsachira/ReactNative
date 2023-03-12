import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{useState,useEffect} from "react";
import { } from 'react-native';
import { Splash } from "./Splash";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ProfileImageSelect } from "./ProfileImageSelect";
import { Home } from "./Home";
import { SignOut } from "./SignOut";  
import { Chat } from "./Chat";
import { NewChat } from "./NewChat";
import { FriendProfileView } from "./FriendProfileView";
import { Profile } from "./Profile";
import { ChangeName } from "./ChangeName";
import { ChangePassword } from "./ChangePassword";
import { SelectCountry } from "./SelectCountry";
import { Icon } from "react-native-vector-icons/Icon";

const Stack = createNativeStackNavigator();

function App(){  
  const ui = (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerStyle:{
            backgroundColor:"#0000"
          },
            headerTintColor: '#5271FF',
            headerTransparent:true,
            animation:"slide_from_right",
            orientation:"portrait",
            
        }}>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileImageSelect" component={ProfileImageSelect} options={{title:""}}/>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={
            {
              title:"Any Chat",
              headerBackVisible:false,
              headerTitleAlign:"center",
              headerTintColor:"white",
              headerTitleStyle:{fontFamily:"RighteousRegular",fontSize:27}
            }
          }
          />
        <Stack.Screen name="SignOut" component={SignOut} />
        <Stack.Screen name="Chat" component={Chat} options={{title:""}} />
        <Stack.Screen name="NewChat" component={NewChat} />
        <Stack.Screen name="FriendProfileView" component={FriendProfileView} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangeName" component={ChangeName} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SelectCountry" component={SelectCountry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}




export default App;
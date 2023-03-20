import React from "react";
import { } from 'react-native';
//navigation libraries
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//UI files
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
import { ChangeMobile } from "./changeMobile";
import { UpdateBirthday } from "./UpdateBirthday";


const Stack = createNativeStackNavigator();

function App(){  
  const ui = (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{     
            animation:"slide_from_right",
            orientation:"portrait",
            headerShown:false           
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ProfileImageSelect" component={ProfileImageSelect}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignOut" component={SignOut} />        
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewChat" component={NewChat} />
        <Stack.Screen name="FriendProfileView" component={FriendProfileView} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangeName" component={ChangeName} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="UpdateBirthday" component={UpdateBirthday} />
        <Stack.Screen name="SelectCountry" component={SelectCountry} />
        <Stack.Screen name="ChangeMobile" component={ChangeMobile} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}




export default App;
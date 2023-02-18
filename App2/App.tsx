import React from "react";
import {Button, StyleSheet, Text, View,Alert} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

function App(){
 const ui = (
   <NavigationContainer>
    <Stack.Navigator>

        <Stack.Screen name="Home" component={Home} options={{title:"Java Institute"}}/>
        <Stack.Screen name="Profile" component={Profile} options={{title:"Profile"}}/>

    </Stack.Navigator>
   </NavigationContainer> 
 );
 return ui; 
}

export default App;

function Home({navigation}){
    const ui=(
        <View style={styles.main}>
            <Text style={styles.text1}>Home Screen</Text>
            <Button title="Go To Profile" onPress={m}/>
        </View>
    );

    function m(){
        //Alert.alert("","");
        navigation.navigate("Profile");
    }
    return ui;
}

function Profile({navigation}){
    const ui=(
        <View style={styles.main}>
            <Text style={styles.text1}>Profile Screen</Text>
            <Button title="Go To Home" onPress={n}/>
        </View>
    );

    function n(){
        //Alert.alert("","");
        navigation.navigate("Home");
    }
    return ui;
   
}

const styles = StyleSheet.create(
    {
        main:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
        },
        text1:{
            fontSize:40,
            fontWeight:"bold",
        }
    }
);
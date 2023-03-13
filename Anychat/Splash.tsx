import React,{useState,useEffect} from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  Alert
  } 
from 'react-native';
import { SignUp } from "./SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";



export function Splash({navigation}){

 
  async function checkUser() {
    
    const user = await AsyncStorage.getItem('user');  

    if(user!=null){

      const userJs = JSON.parse(user);
      //Alert.alert("Message",userJs.log);
      const screen = userJs.log!="signout"?"Home":"SignIn";
      navigation.navigate(screen);

    }else{      
      navigation.navigate("SignIn");
    }   
  }

  function start(){
    setTimeout(checkUser,1000);     
  }

  useEffect(start,[]);

  const ui = ( 
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1.png")} style={styles.image1}/>
      <Text style={styles.text1}>Anychat</Text>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  image1:{
    height:90,
    width:100,    
  },
  main:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F3F6FF"
  },
  text1:{
    fontSize:20,
    fontFamily:"RighteousRegular"
  }
});


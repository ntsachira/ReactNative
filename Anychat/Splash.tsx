import React,{useState,useEffect} from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  } 
from 'react-native';
import { SignUp } from "./SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Splash({navigation}){
  async function checkUser() {
    
    const user = await AsyncStorage.getItem('user');  
    
    const screen = user!=""?"Home":"SignIn";
    navigation.navigate(screen);

    return screen;
  }

  function start(){
    setTimeout(checkUser,400);
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


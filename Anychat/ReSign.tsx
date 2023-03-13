import React,{useState,useEffect} from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  Alert,
  TouchableOpacity
  } 
from 'react-native';
import { SignUp } from "./SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-vector-icons/Icon";



export function ReSign({navigation,route}){  
  

    const ui = ( 
      <SafeAreaView style={styles.main}>
        <TouchableOpacity onPress={()=>{navigation.navigate("SignIn")}} style={styles.main}>
        <Image source={require("./images/logIn2.png")} style={styles.image2}/>
        <Text style={styles.text1}>Sign In again</Text>
        </TouchableOpacity>        
      </SafeAreaView>
    );
    return ui;
 
  
}

const styles = StyleSheet.create({
  image2:{
    height:50,
    width:50,    
  },
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


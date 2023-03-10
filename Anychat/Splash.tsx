import React from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  } 
from 'react-native';

export function Splash(){
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


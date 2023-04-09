import React,{useEffect} from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,  
  TouchableOpacity
  } 
from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Splash({navigation,route}){
 
  async function checkUser() {    
    const user = await AsyncStorage.getItem('user');  

    if(user!=null){ 
      const userJs = JSON.parse(user);    
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
      <TouchableOpacity style={styles.main} onPress={()=>{navigation.navigate("SignIn")}}>
        <Image source={require("./images/logo1.png")} style={styles.image1}/>
        <Text style={styles.text1}>Anychat</Text>
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


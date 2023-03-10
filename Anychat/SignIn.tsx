import React,{useState,useEffect} from "react";
import {
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export function SignIn(){
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <TouchableOpacity style={styles.button1} activeOpacity={0.7}>
              <Text style={styles.text1}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
              <Text style={styles.text2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view5}>
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="mobile" color="white" size={25}/>
              </View>
              <TextInput style={styles.input1} placeholder="Mobile number"/>
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="lock" color="white" size={25}/>
              </View>
              <TextInput style={styles.input1} placeholder="Password"/>
              <TouchableOpacity style={styles.button5}>
                <Icon name="eye" size={20} />
              </TouchableOpacity>              
            </View>
            <TouchableOpacity style={styles.button4} activeOpacity={0.7}>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button3} activeOpacity={0.7}>
              <Text style={styles.text3}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  button5:{
    position:"absolute",
    end:4,
  },  
  button4:{
    width:120,    
    alignItems:"center",
    alignSelf:"flex-end"
  },
  input1:{
    height:40,
    borderBottomWidth:1,
    borderColor:"#A8A7A7",
    width:"90%",
    paddingLeft:40,
    justifyContent:"flex-end",
    fontSize:15,
    zIndex:-1
  },
  iconBack:{
    height:44,
    width:44,
    backgroundColor:"black",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:22,
    position:"absolute",
    start:0,
    top:4
  },
  inputView:{
    flexDirection:"row",   
    height:44,
    justifyContent:"center",
    alignItems:"center",
  },
  text3:{
    fontSize:18,
    fontWeight:"bold",
    color:"white",
  },
  button3:{
    width:"85%",
    backgroundColor:"#5271FF",
    alignItems:"center",
    justifyContent:"center",
    height:48,
    borderRadius:24,
    marginBottom:"25%"
  },
  view5:{
    width:"85%",
    marginVertical:20,    
    rowGap:20,
  },
  text1:{
    fontSize:18,    
    color:"white",
  },
  text2:{
    fontSize:18,    
    color:"#5271FF",
  },
  button2:{
    height:40,
    width:"50%",
    alignItems:"center",
    borderRadius:20,
    justifyContent:"center",    
  },
  button1:{
    height:40,
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#5271FF",
    borderRadius:20,
    
  },
  view4:{
    flexDirection:"row",
    width:"85%",
    height:40,
    borderWidth:1,
    borderColor:"#EAEAF5",
    borderRadius:20,  
    
  },
  view3:{    
    width:"90%",
    paddingVertical:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:70,   
  },
  view2:{    
    width:"100%",
    alignItems:"center",      
  },
  view1:{
    paddingVertical:24,
    width:"100%",
    alignItems:"center",
    justifyContent:"center", 
    height:"17%"    
  },
  appIcon:{
    height:70,
    width:70,  
  },
  image1:{
    height:"100%",
    opacity:0.4,
    position:"absolute"     
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5",    
  },
 
});


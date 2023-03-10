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

export function ProfileImageSelect(){
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <TouchableOpacity style={styles.view5}>
              <View style={styles.dpBack}>
                <View style={styles.dpView}>
                  <Icon name="user" size={60} color="black"/>
                </View>
                <View style={styles.imageSelector}>
                  <Icon name="camera" color="black" size={15}/>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.text2}>Add picture</Text>
          </View>
          <Text style={styles.text1}>OR</Text>
          <View style={styles.view6}>
            <Text style={styles.text2}>Select an avatar</Text>
            <View style={styles.view7}>
              <View style={styles.avatarStack}>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
              </View>
              <View style={styles.avatarStack}>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack}><Icon name="user" size={40} color="#5271FF"/></TouchableOpacity>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button3} activeOpacity={0.7}>
              <Text style={styles.text3}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({ 
  text2:{
    color:"#5271FF"
  },
  text1:{
    color:"black"
  },
  imageSelector:{
    height:30,
    width:30,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#5271FF",
    borderWidth:1,
    borderRadius:15,
    position:"absolute",
    end:0,
    bottom:0,
    backgroundColor:"white",
  },
  dpView:{
    height:78,
    width:78,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#5271FF",
    borderWidth:2,
    borderRadius:39,
  },
  dpBack:{
    height:80,
    width:80,
    borderRadius:40,
    borderColor:"#F3F6FF",
    borderWidth:1,
  },
  avatarBack:{
    height:70,
    width:70,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#F3F6FF",
    borderRadius:35,
  },
  avatarStack:{
    flexDirection:"row",
    columnGap:10,
  },
  view7:{    
    rowGap:10,    
  },
  view6:{      
    width:"100%",
    alignItems:"center",
    justifyContent:"center",   
    rowGap:10, 
  },
  view5:{      
    height:82,
    width:82,
    borderRadius:17    
  },
  view4:{       
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    rowGap:5,
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
    marginBottom:"10%"
  },
  
  view3:{    
    width:"90%",
    paddingVertical:25,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:35,   
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


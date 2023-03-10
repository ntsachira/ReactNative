import React,{useState,useEffect} from "react";
import {
  FlatList,
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
import Icon from 'react-native-vector-icons/dist/AntDesign';

export function SignOut(){
  
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.opacView}></View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view6}>
            <Icon name="warning" size={34} color="red" />
            <Text style={styles.text1}>Confirm sign out</Text>
          </View>
          <View style={styles.view7}>
            <Icon name="checksquareo" size={18} color="black"/>
            <Text style={styles.text2}>Remember my sign in details</Text>
          </View>
          <View style={styles.view8}>
            <TouchableOpacity style={styles.button1} activeOpacity={0.6}>
              <Text style={styles.btnText1}>Confirm</Text>
            </TouchableOpacity>                          
            <TouchableOpacity  style={styles.button3} activeOpacity={0.6}>
              <Text style={styles.btnText1}>Decline</Text>
            </TouchableOpacity>              
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}


const styles = StyleSheet.create({  
  opacView:{
    position:"absolute",
    height:"100%",
    backgroundColor:"#EAEAF5",
    width:"100%",
    opacity:0.7,
  },
  button3:{
    width:"40%",
    backgroundColor:"black",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,    
  },  
  btnText1:{
    color:"white",
    fontSize:15,
  },
  button1:{
    width:"40%",
    backgroundColor:"#5271FF",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
  },
 
  view8:{
    width:"100%",  
    alignItems:"center",
    columnGap:15,
    flexDirection:"row",
    justifyContent:"center"
  },
  view7:{
    width:"100%",    
    justifyContent:"center", 
    flexDirection:"row", 
    columnGap:7, 
    marginBottom:20,
  }, 
  view6:{
    alignItems:"center",
    rowGap:5
  },  
  text1:{       
    color:"#5271FF",
    fontSize:16,
  },
  text2:{
    fontSize:14,    
    color:"black",
  },    
  view3:{    
    width:"90%",
    paddingTop:20,
    paddingBottom:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:20, 
    borderWidth:1,
    borderColor:"#E4E4E4"    
  },
  view2:{    
    width:"100%",
    alignItems:"center",     
    height:800, 
    justifyContent:"center",
    position:"absolute"    
  },
  view1:{
    paddingVertical:24,
    width:"100%",
    alignItems:"center",
    justifyContent:"center", 
    height:130,    
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


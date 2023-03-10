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

export function FriendProfileView(){
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>                  
          <View style={styles.dpView}>
            <Icon name="user" size={60} color="black"/>
          </View>             
          <View style={styles.view6}>
            <Text style={styles.text1}>Name</Text>
            <Text style={styles.text2}>Sahan Perera</Text>
          </View> 
          <View style={styles.view6}>
            <Text style={styles.text1}>Country</Text>
            <Text style={styles.text2}>Sri Lanka</Text>
          </View>
          <View style={styles.view6}>
            <Text style={styles.text1}>Mobile</Text>
            <Text style={styles.text2}>0771112223</Text>
          </View> 
          <View style={styles.view6}>
            <Text style={styles.text1}>Birthday</Text>
            <Text style={styles.text2}>Hidden</Text>
          </View>         
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({ 
  view6:{
    alignItems:"center"
  },
  dpView:{
    height:120,
    width:120,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#5271FF",
    borderWidth:2,
    borderRadius:75,
  },   
  text1:{       
    color:"gray",
  },
  text2:{
    fontSize:18,    
    color:"#5271FF",
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
    rowGap:20,   
  },
  view2:{    
    width:"100%",
    alignItems:"center",     
    height:700, 
    paddingTop:50,      
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


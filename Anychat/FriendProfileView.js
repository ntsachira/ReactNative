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
import Icon from 'react-native-vector-icons/dist/Ionicons';

export function FriendProfileView({navigation,route}){
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>                  
          <View style={styles.dpView}>
            <Image source={{uri:"https://2d1b-192-248-3-212.ngrok.io/anychat/avatars/"+route.params.img+".png"}} style={styles.avatarBack} />
          </View>             
          <View style={styles.view6}>
            <Text style={styles.text1}>Name</Text>
            <Text style={styles.text2}>{route.params.name}</Text>
          </View> 
          <View style={styles.view6}>
            <Text style={styles.text1}>Country</Text>
            <Text style={styles.text2}>{route.params.country}</Text>
          </View>
          <View style={styles.view6}>
            <Text style={styles.text1}>Mobile</Text>
            <Text style={styles.text2}>{route.params.mobile}</Text>
          </View> 
          <View style={styles.view6}>
            <Text style={styles.text1}>Birthday</Text>
            <Text style={styles.text2}>{route.params.birthday==null?"-Not shared-":route.params.birthday}</Text>
          </View>         
        </View>
      </View>
      <TouchableOpacity 
        style={{start:4,zIndex:2,position:"absolute",bottom:10,width:"100%",height:100,alignItems:"center"}} 
        hitSlop={30} 
        onPress={()=>{navigation.navigate("Chat",route.params);}}>
         <Icon name="ios-chevron-back-circle" size={50} /> 
        </TouchableOpacity>  
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({ 
  avatarBack:{
    height:120,
    width:120,    
    borderRadius:60,
  },
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


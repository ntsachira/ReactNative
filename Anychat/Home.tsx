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
  FlatList
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

export function Home(){
  const items = [1,2,3,4,5,6,7,8,9,10];
  const ui = (
    <SafeAreaView style={styles.main}>      
      <View style={styles.view1}>
        <View style={styles.menuView}>
          <View style={styles.view5}><Icon name="filter" color="#707070" size={35}/></View>
        </View>
        <TextInput style={styles.input1} placeholder="Search chat list" placeholderTextColor={"#A8A7A7"}/>
        <View style={styles.profileView}>
          <View style={styles.view5}><Icon name="user" color="#707070" size={40}/></View>
        </View>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <FlatList data={items} renderItem={chatUI}/>
          </View>          
          <TouchableOpacity style={styles.button3} activeOpacity={0.7}>
              <Text style={styles.text3}>Start a new chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

function chatUI({item}){
  const ui = (
    <View style={styles.view9}>
        <View style={styles.view6}>
           <View style={styles.image1}><Icon name="user" color="white" size={40}/></View>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text1}>Sahan Perera</Text>
          <Text style={styles.text2}>Thank you universe</Text>
        </View>
        <View style={styles.view8}>
          <Text style={styles.text4}>6.45 pm</Text>
          <View style={styles.view10}>
            <Icon name="checkcircleo" color="#707070" size={20}/>
            <View style={styles.view11}>
              <Text style={styles.text5}>0</Text>
            </View>
          </View>                
        </View>
    </View>
  );
  return ui;
}

const styles = StyleSheet.create({ 
  text5:{
    fontSize:13,
    color:"white",
    fontWeight:"bold",
  },
  view11:{
    width:21,
    height:21,
    backgroundColor:"#5271FF",    
    alignItems:"center",
    justifyContent:"center", 
    borderRadius:10,
  },
  view10:{
    flexDirection:"row",
    columnGap:5
  },
  text4:{
    fontSize:13,
    color:"black",
  },
  text2:{
    fontSize:16,
    color:"black",
  },
  text1:{
    fontSize:18,
    color:"black",
    fontWeight:"bold",
  },
  image1:{
    height:60,
    width:60,    
    alignItems:"center",
    justifyContent:"center", 
    borderRadius:30,
    backgroundColor:"#5271FF"
  },
  view9:{
    borderWidth:1,
    borderColor:"#E4E4E4",
    width:"100%", 
    flexDirection:"row",
    height:80,
    borderRadius:34,
  },
  view6:{    
    width:"20%",
    alignItems:"center",
    justifyContent:"center",      
  },
  view7:{    
    width:"62%",    
    justifyContent:"center",  
  },
  view8:{    
    width:"18%",       
    justifyContent:"center",
    alignItems:"flex-end",
    paddingRight:5,
    rowGap:5    
  },
  view5:{
    height:58,
    width:58,
    backgroundColor:"white",
    borderRadius:29,
    alignItems:"center",
    justifyContent:"center", 
    borderColor:"#E4E4E4",   
    borderWidth:1,
  },
  profileView:{
    height:70,
    width:"19%",    
    alignItems:"center",
    justifyContent:"center", 
       
  },
  input1:{
    height:50,
    width:"62%",
    borderWidth:1,
    borderColor:"#E4E4E4",
    color:"black",
    borderRadius:25,
    backgroundColor:"white",
    paddingLeft:20,
    fontSize:16,
  },
  menuView:{
    height:70,
    width:"19%",     
    alignItems:"center",
    justifyContent:"center",
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
    width:"50%",
    backgroundColor:"#5271FF",
    alignItems:"center",
    justifyContent:"center",
    height:55,
    borderRadius:27.5,  
    zIndex:1,
    position:"absolute",
    bottom:30,
    borderColor:"#E4E4E4",   
    borderWidth:1,  
  },
  
  view3:{    
    width:"100%",    
    alignItems:"center",    
    borderRadius:34,    
    backgroundColor:"white", 
    height:"100%"          
  },
  view2:{    
    width:"100%",
    alignItems:"center",      
    height:"87%"  
  },
  view1:{    
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:"13%",
    flexDirection:"row",       
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5",    
  },
 
});

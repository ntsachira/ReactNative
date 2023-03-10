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

export function NewChat(){
  const items = [1,2,3,4,5,6,7];
  const ui = (
    <SafeAreaView style={styles.main}>      
      <View style={styles.view1}>        
        <TextInput style={styles.input1} placeholder="Search to start a new chat" placeholderTextColor={"#A8A7A7"}/>        
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <FlatList data={items} renderItem={chatUI}/>
          </View>           
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
          <Text style={styles.text1}>Sasindu Malinda</Text>
          <Text style={styles.text2}>Tap to chat</Text>
        </View>
        <View style={styles.view8}>
          <Text style={styles.text4}>Sri Lanka</Text>                          
        </View>
    </View>
  );
  return ui;
}

const styles = StyleSheet.create({  
  text4:{
    fontSize:13,
    color:"black",
  },
  text2:{
    fontSize:16,
    color:"#5271FF",
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
    paddingRight:15,       
  },  
    input1:{
    height:50,
    width:"80%",
    borderWidth:1,
    borderColor:"#E4E4E4",
    color:"black",
    borderRadius:25,
    backgroundColor:"white",
    paddingLeft:20,
    fontSize:16,
  },  
  view4:{       
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    rowGap:5,
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


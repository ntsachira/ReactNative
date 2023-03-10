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
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export function Profile(){
  const info =[
    {
      'icon':'user',
      'topic':'Name',
      'value':'Sachira Jayawardana', 
      'size':25,  
    },
    {
      'icon':'globe',
      'topic':'Country',
      'value':'Sri Lanka', 
      'size':25,      
    },
    {
      'icon':'mobile',
      'topic':'Mobile',
      'value':'0714798940',  
      'size':30,     
    },
    {
      'icon':'calendar',
      'topic':'Birthday',
      'value':'Hidden', 
      'size':20,      
    },
  ];
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>                  
            <TouchableOpacity style={styles.view5} activeOpacity={0.6}>
              <View style={styles.dpBack}>
                <View style={styles.dpView}>
                  <Icon name="user" size={60} color="black"/>
                </View>
                <View style={styles.imageSelector}>
                  <Icon name="camera" color="black" size={15}/>
                </View>
              </View>
            </TouchableOpacity>   
                         
            <FlatList data={info} renderItem={loadInfo}/>
            
            <View style={styles.view8}>
              <TouchableOpacity style={styles.button1} activeOpacity={0.6}>
                <Text style={styles.btnText1}>Update profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} activeOpacity={0.6}>
                <Text style={styles.btnText1}>Change password</Text>
              </TouchableOpacity>             
              <TouchableOpacity  style={styles.button3} activeOpacity={0.6}>
              <Text style={styles.btnText1}>Deactivate account</Text>
              </TouchableOpacity>
              
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

function loadInfo({item}){
  const ui = (
            <View style={styles.view7}>  
              <View style={styles.detailView1}>
                <View style={styles.detailView2}>
                  <View style={styles.iconView1}>
                    <Icon name={item.icon} color="white" size={item.size}/>
                  </View>
                </View>
                <View style={styles.detailView3}>
                  <Text style={styles.text1}>{item.topic}</Text>
                  <Text style={styles.text2}>{item.value}</Text>
                </View>
                <TouchableOpacity style={styles.detailView4}>
                  <Icon name="edit" color="black" size={20}/>
                </TouchableOpacity>
              </View>
            </View>  
  );
  return ui;
}

const styles = StyleSheet.create({ 
  button2:{
    width:"80%",
    backgroundColor:"red",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
  }, 
  button3:{
    width:"80%",
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
    width:"80%",
    backgroundColor:"#5271FF",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
  },
  iconView1:{
    height:40,
    width:40,
    backgroundColor:"black",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
  },
  detailView4:{
    width:"15%",    
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
  },
  detailView3:{
    width:"66%",    
    justifyContent:"center",
  },
  detailView2:{
    width:"15%",    
  },
  detailView1:{
    width:"90%",    
    flexDirection:"row",
    paddingBottom:15,
    columnGap:5,
  },
  view8:{
    width:"100%",  
    alignItems:"center",
    rowGap:10,  
  },
  view7:{
    width:"100%",    
    alignItems:"center",   
  },
  imageSelector:{
    height:30,
    width:30,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"white",
    borderWidth:2,
    borderRadius:15,
    position:"absolute",
    end:0,
    bottom:0,
    backgroundColor:"#E4E4E4",
  },
  view5:{      
    height:82,
    width:82,
    borderRadius:17    
  },
  view6:{
    alignItems:"center"
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
  text1:{       
    color:"#5271FF",
    fontSize:13,
  },
  text2:{
    fontSize:15,    
    color:"black",
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


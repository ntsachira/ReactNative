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
  Alert
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ChangeName({navigation}){

  const [name,setName] = useState("");
  const [mobile,setMobile] = useState("");   

  async function loadUsers(){       
    var userJSONText = await AsyncStorage.getItem('user');
    var text =JSON.parse(userJSONText);
    var user = text.user;
    setName(user.username);    
    setMobile(user.mobile);   
  }

  function start(){loadUsers()}

  useEffect(start,[]);

function updateName(){
    
    const form= new FormData(); 
    form.append("mobile",mobile);
    form.append("newValue",name);
    form.append("column","username");

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
          AsyncStorage.setItem('user',request.responseText);
          navigation.navigate("Profile");
       Alert.alert("Message","Name updated successfully");
       
      }
    };
    request.open('POST', 'http://192.168.1.189/anychat/updateDetails.php', true);
    request.send(form); 
  }

  
  
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
            <Text style={styles.text1}>Edit your name</Text>
          </View>
          <View style={styles.view7}> 
            <TextInput style={styles.input1} defaultValue={name} onChangeText={setName}/>           
          </View>
          <View style={styles.view8}>
            <TouchableOpacity style={styles.button1} activeOpacity={0.6} onPress={updateName}>
              <Text style={styles.btnText1}>Save</Text>
            </TouchableOpacity>                          
            <TouchableOpacity  style={styles.button3} activeOpacity={0.6} onPress={()=>{navigation.navigate("Profile")}}>
              <Text style={styles.btnText1}>Discard</Text>
            </TouchableOpacity>              
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}


const styles = StyleSheet.create({  
  input1:{
    width:"80%",
    borderBottomColor:"#5271FF",
    paddingVertical:10,
    height:40,  
    borderBottomWidth:1, 
    padding:0, 
    fontSize:16   
  },
  opacView:{
    position:"absolute",
    height:"100%",
    backgroundColor:"#EAEAF5",
    width:"100%",
    opacity:0.7,
  },
  button3:{
    width:"35%",
    backgroundColor:"black",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,    
  },  
  btnText1:{
    color:"white",
    fontSize:16,
    fontWeight:"bold",
  },
  button1:{
    width:"35%",
    backgroundColor:"#5271FF",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,    
  },
 
  view8:{
    width:"100%",  
    alignItems:"center",
    columnGap:15,
    flexDirection:"row",
    justifyContent:"center",
    paddingTop:20
  },
  view7:{
    width:"100%",    
    justifyContent:"center", 
    flexDirection:"row", 
    columnGap:7, 
    marginBottom:20,
  }, 
  view6:{     
    width:"80%",        
  },  
  text1:{       
    color:"#5271FF",
    fontSize:20,
    
  },
  text2:{
    fontSize:14,    
    color:"black",
  },    
  view3:{    
    width:"90%",
    paddingTop:40,
    paddingBottom:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white",     
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


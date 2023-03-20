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
  FlatList,
  Alert
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NewChat({navigation}){

  var i = 0;
  
  const [emptyMessage,setEmptyMessage] = useState("");
  const [items, setItems] = useState([]);
  const [dp,setDp] = useState("avatar7");
  
 
   async function loadUsers(searchText){   
     var userJSONText = await AsyncStorage.getItem('user');
     var text =JSON.parse(userJSONText);
    
     setDp(text.user.profile_url);
     const form= new FormData();
     form.append("userJson",userJSONText);
     form.append("searchText",searchText);
     form.append("users","new");
       var request = new XMLHttpRequest();
       request.onreadystatechange = function () {
         if (request.readyState == 4 && request.status == 200) {
          const jsResponseItemArray =JSON.parse(request.responseText);
           setItems(JSON.parse(request.responseText));

          if(jsResponseItemArray==""){
            Alert.alert("Message","Sorry ! no more new chats are available.");
            clearInterval(i);
            navigation.navigate("Home");
            
          }
         }
       };
       request.open('POST', 'http://192.168.1.189/anychat/load_users.php', true);
       request.send(form); 
 
   }
 
   function start(){
     loadUsers("");
   }
 function startAgain(){
  start();
    i = setInterval(start,5000);
   
 }

 useEffect(startAgain,[]);

  const ui = (
    <SafeAreaView style={styles.main}>      
      <View style={styles.view1}>   
        <TouchableOpacity style={{zIndex:2}} hitSlop={30} onPress={()=>{navigation.navigate("Home");}}>
         <Icon name="ios-chevron-back-circle" size={50} /> 
        </TouchableOpacity>      
        <TextInput 
        style={styles.input1} 
        placeholder="Search to start a new chat" 
        placeholderTextColor={"#A8A7A7"}
        onChangeText={(text)=>{loadUsers(text)}}
        />        
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

  function chatUI({item}){
    const ui = (
      
      <TouchableOpacity style={styles.view9} activeOpacity={0.5} onPress={m}>
          <View style={styles.view6}>
             <View style={styles.image1}><Image source={{uri:"http://192.168.1.189/anychat/avatars/"+item.dpName+".png"}} style={styles.avatarBack} /></View>
          </View>
          <View style={styles.view7}>
            <Text style={styles.text1}>{item.name}</Text>
            <Text style={styles.text2}>Tap to chat</Text>
          </View>
          <View style={styles.view8}>
            <Text style={styles.text4}>{item.country}</Text>                          
          </View>
      </TouchableOpacity>
    );
    return ui;

    function m(){
      //Alert.alert("Message",item.name);
  
      const obj = {"name":item.name,"id":item.id,"img":item.dpName,"country":item.country,"mobile":item.mobile};
  
      navigation.navigate("Chat",obj);
    }
  
  }
}



const styles = StyleSheet.create({  
  avatarBack:{
    height:60,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    
    borderRadius:50,
  },
  text4:{
    fontSize:13,
    color:"black",
  },
  text2:{
    fontSize:16,
    color:"#5271FF",
  },
  text1:{
    fontSize:17,
    color:"black",
    fontWeight:"bold",
  },
  image1:{
    height:59,
    width:59,    
    alignItems:"center",
    justifyContent:"center", 
    borderRadius:30,
    backgroundColor:"#707070",    
  },
  view9:{
    borderBottomWidth:1,
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
    height:"100%"  ,
    marginTop:5,        
  },
  view2:{    
    width:"100%",
    alignItems:"center",      
    height:"87%",  
    
  },
  view1:{    
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:100,
    flexDirection:"row",  
    backgroundColor:"#5271FF"  ,
    columnGap:8,   
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5",    
  },
 
});


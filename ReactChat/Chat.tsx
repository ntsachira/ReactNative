import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, Text, Image, FlatList, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";

function chat() {

    const [chatText,setChatText] = useState("");
  
    const [userName, setUserName] = useState(null);
  
    async function m() {
      var userJsonText = await AsyncStorage.getItem('user');
      var userJSObject = JSON.parse(userJsonText);
      setUserName(userJSObject.name);
    }
  
    m();
  
    const [chatHistory, setChatHistory] = useState([]);
  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
      }
    };
    request.open('GET', 'http://10.0.2.2/react_chat/load_chat.php', true);
    request.send();
  
    const ui = (
      <SafeAreaView style={styles.chat}>
        <Text style={styles.chatText1}>Chat</Text>
        <Image
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          style={styles.itemImage}
        />
        <Text style={styles.chatText2}>{userName}</Text>
  
        <FlatList
          data={chatHistory}
          renderItem={chatItem}
          style={styles.chatList}
        />
        <View style={styles.chatSendView}>
          <TextInput 
          style={styles.chatInput1} 
          placeholder="Enter your message"
          onChangeText={setChatText}
          />
          <TouchableOpacity onPress={saveChat} style={styles3.chatButton1}>
            <Icon name="paper-plane" style={styles3.chatIcon1} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ); 
   
    async function saveChat(){
  
      var userJsonText = await AsyncStorage.getItem('user');
  
      var fromUserObject = JSON.parse(userJsonText);
     
      var requestObject ={
        "from_user_id":fromUserObject.id,
        "to_user_id":3 ,
        "message":chatText,
      };
  
      var formData = new FormData();
    formData.append("requestJSON",JSON.stringify(requestObject));
  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        Alert.alert("Message",request.responseText);
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/save_chat.php', true);
    request.send(formData);
    } 
    
    return ui;
  }
  
  const styles3 = StyleSheet.create({
    chatButton1:{
      height:50,
      width:50,    
      marginLeft:5,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"white",
      borderRadius:25
    },
    chatIcon1:{
      fontSize:30,
    }
  });
  
  function chatItem({item}) {
    const ui = (
      <View
        style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
        <Text>{item.msg}</Text>
        <View style={styles.chatView1}>
          <Text style={styles.chatText3}>{item.time}</Text>
          {item.side == 'right' ? (
            <Icon
              name="check"
              size={18}
              style={item.status == 'seen' ? styles.chatIconSeen : null}
            />
          ) : null}
        </View>
      </View>
    );
    return ui;
  }
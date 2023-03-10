import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView, 
  Text, 
  Image, 
  FlatList, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

export function Chat({route,navigation}) {

    const [chatText,setChatText] = useState("");
  
    const [id, setId] = useState(null);
  
    // async function m() {
    //   var userJsonText = await AsyncStorage.getItem('user');
    //   var userJSObject = JSON.parse(userJsonText);
    //   setId(userJSObject.id);
    // }  
    // m();
  
    const [chatHistory, setChatHistory] = useState([]);
    //Alert.alert("Message","Hello");
    async function sendRequest(){
    const form = new FormData();
      //get data fro async store
    var userJsonText = await AsyncStorage.getItem('user');
    var userJSObject = JSON.parse(userJsonText);

    form.append("id1",userJSObject.id);
    form.append("id2",route.params.id);

    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
      }
    };
    request.open('POST', 'http://192.168.1.189/react_chat/load_chat.php', true);
    request.send(form);
  } 

  //called onPress
  async function saveChat(){
  
    var userJsonText = await AsyncStorage.getItem('user');

    var fromUserObject = JSON.parse(userJsonText);
   
    var requestObject ={
      "from_user_id":fromUserObject.id,
      "to_user_id":route.params.id ,
      "message":chatText,
    };

    var formData = new FormData();
  formData.append("requestJSON",JSON.stringify(requestObject));

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      //Alert.alert("Message",request.responseText);
    }
  };
  request.open('POST', 'http://192.168.1.189/react_chat/save_chat.php', true);
  request.send(formData); 
 
  }  
  
    const ui = (
      <SafeAreaView style={styles.chat}>
        <Text style={styles.chatText1}>Chat</Text>
        <Image
          source={{uri: "http://192.168.1.189/react_chat/"+route.params.img }}
          style={styles.itemImage}
        />
        <Text style={styles.chatText2}>{route.params.name}</Text>
  
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
   
  //calling sendRequest function looking for new chats in the database
   function start(){
    setInterval(sendRequest,2000);
   }  

   useEffect(start,[]);
    
    return ui;
  }
  
 
  
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

  const styles = StyleSheet.create({
    itemImage: {
      height: 70,
      width: 70,
      borderRadius: 50,
    },
    chatSendView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#9999',
      },
      chatInput1: {
        width: '80%',
        height: 45,
        borderStyle: 'solid',
        borderRadius: 22,
        paddingHorizontal: 15,
        backgroundColor: 'white',
      },
      chatIcon1: {
        paddingLeft: 10,
        color: '#0099',
        fontSize: 25,
      },
      chatText3: {
        fontSize: 10,
      },
      chatIconSeen: {
        color: 'green',
      },
      chatList: {
        width: '100%',
      },
      chatView1: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
      },
      chatViewLeft: {
        alignSelf: 'flex-start',
        backgroundColor: '#0001',
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: 'black',
        borderRadius: 20,
        margin: 5,
      },
      chatViewRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#0001',
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: 'black',
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 5,
      },
      chatText2: {
        fontSize: 20,        
        color: '#000000',
        paddingVertical: 15,
        fontFamily: 'RighteousRegular',
      },
      chatText1: {
        fontSize: 28,
        paddingVertical: 15,
        color: '#0461c3',
        fontFamily: 'RighteousRegular',        
      },
      chat: {
        flex: 1,
        alignItems: 'center',
      },
  });
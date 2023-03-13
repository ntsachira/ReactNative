import React,{useState,useEffect,useRef} from "react";
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


  export function Chat({navigation,route}){
    const [chatText,setChatText] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const flatlistRef = useRef();
   
    async function loadChat(scroll){

      var userJsonText = await AsyncStorage.getItem('user');
      var userJSObject = JSON.parse(userJsonText);

      const form = new FormData();
      form.append("id1",userJSObject.user.id);
      form.append("id2",route.params.id);
      
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
        //Alert.alert("Message",request.responseText);
       //scroll the view send a new message
        if(scroll){
        flatlistRef.current.scrollToEnd();
       }
      }
    };
    request.open('POST', 'http://192.168.1.189/anychat/load_chat.php', true);
    request.send(form);  
     
    }

    async function saveChat(){
  
      var userJsonText = await AsyncStorage.getItem('user');
  
      var fromUserObject = JSON.parse(userJsonText);
     
      var requestObject ={
        "user_from_id":fromUserObject.user.id,
        "user_to_id":route.params.id ,
        "message":chatText,
      };
  
      var formData = new FormData();
    formData.append("requestJSON",JSON.stringify(requestObject));
  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        loadChat(true);        
      }
    };
    request.open('POST', 'http://192.168.1.189/anychat/saveChat.php', true);
    request.send(formData); 
   
    }  
  
  const ui = (
    <SafeAreaView style={styles.main}>      
      <View style={styles.view1}>        
        <View style={styles.nameView}><Text style={styles.text5}>{route.params.name}</Text></View>
        <View style={styles.profileView}>
            <View style={styles.view5}>
              <Image source={{uri:"http://192.168.1.189/anychat/avatars/"+route.params.img+".png"}} style={styles.avatarBack} />
            </View>
        </View>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <FlatList data={chatHistory} renderItem={messageList} ref={flatlistRef}/>                     
        </View>
      </View>
      <View style={styles.view6}>
          <TextInput 
          style={styles.input1} 
          placeholder="Type your message here" 
          placeholderTextColor={"#A8A7A7"}
          autoCorrect={false}
          multiline 
          ref={input => { this.textInput = input }}
          onChangeText={(text)=>{setChatText(text);flatlistRef.current.scrollToEnd();}}
          />
          <TouchableOpacity style={styles.button3} activeOpacity={0.7} onPress={()=>{saveChat();flatlistRef.current.scrollToEnd();this.textInput.clear()}}>
              <Icon name="send" color="white" size={25} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  function start(){
    
    loadChat(false);
    
  }
  function startAgain(){
    setInterval(start,2000);
  }
  useEffect(startAgain,[]);

  return ui;
} 

function messageList({item}){
  const ui = (
          <View style={item.side=='right'?styles.messageViewRight:styles.messageViewLeft}>
            <View style={item.side=='right'?styles.messageRight:styles.messageLeft}>
              <View style={styles.messageView3}>
                <Text style={styles.chatText1}>{item.message}</Text>
              </View>
              <View style={styles.messageView4}>
                <Text style={styles.chatText2}>{item.time}</Text>
                {item.side=='right'?<Icon name="ios-checkmark-circle-outline" color={item.status=='seen'?"blue":"gray"} size={20}/>:null}
              </View>
            </View>
          </View> 
  );
  return ui;
}

const styles = StyleSheet.create({ 
  avatarBack:{
    height:60,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#F3F6FF",
    borderRadius:35,
  },
  chatText2:{
    color:"#707070",
    fontSize:14
  },
  chatText1:{
    color:"black",
    fontSize:15
  },
  messageView4:{     
    flexDirection:"row",
    height:25,
    alignSelf:"flex-end",
    alignItems:"center",
    columnGap:1,
    paddingRight:2,    
  },
  messageView3:{       
    paddingLeft:15,
    paddingVertical:10,    
  },
  messageLeft:{       
    alignSelf:"flex-start",
    flexDirection:"row",
    borderTopLeftRadius:24,    
    borderTopRightRadius:24,
    borderBottomRightRadius:24,
    backgroundColor:"#EAEAF5",  
    columnGap:12, 
    paddingRight:7
  },
  messageRight:{       
    alignSelf:"flex-end",
    flexDirection:"row",
    borderTopLeftRadius:24,
    borderBottomLeftRadius:24, 
    borderTopRightRadius:20,
    backgroundColor:"#E4E4E4",  
    columnGap:12, 
  },
  messageViewLeft:{
    width:"90%",    
    alignSelf:"flex-start",
    paddingTop:4
  },
  messageViewRight:{
    width:"90%",    
    alignSelf:"flex-end",
    paddingBottom:6
  },
  input1:{
    height:53,
    width:"84%",
    borderWidth:1,
    borderColor:"#E4E4E4",
    color:"black",
    borderRadius:26.5,
    backgroundColor:"white",
    paddingLeft:20,
    fontSize:16,     
  },
  text5:{
    fontSize:22,
    color:"white",
    fontWeight:"bold",
  }, 
  view6:{    
    width:"100%",    
    alignItems:"center",
    justifyContent:"center", 
    flexDirection:"row", 
     columnGap:3,
     bottom:3,
  },
  view5:{
    height:65,
    width:65,
    backgroundColor:"white",
    borderRadius:33,
    alignItems:"center",
    justifyContent:"center",     
    
  },
  profileView:{
    height:70,
    width:"28%",    
    alignItems:"center",
    justifyContent:"center",        
  },
  nameView:{
    height:50,
    width:"75%",       
    justifyContent:"center",  
    alignItems:"center",
    paddingLeft:45
  },
  
  button3:{
    width:55,
    backgroundColor:"#5271FF",
    alignItems:"center",
    justifyContent:"center",
    height:55,
    borderRadius:27.5,  
    zIndex:1,     
    borderColor:"#E4E4E4",   
    borderWidth:1,     
  },  
  view3:{    
    width:"100%",       
    borderRadius:34,    
    backgroundColor:"white", 
    height:"100%",
    paddingHorizontal:10,
    
    
  },
  view2:{    
    width:"100%",
    alignItems:"center",
    padding:0,      
    flex:1,    
  },
  view1:{    
    width:"100%",
    alignItems:"center",
    
    height:90,
    flexDirection:"row", 
    borderBottomLeftRadius:1,    
    backgroundColor:"#5271FF",
    borderBottomRightRadius:1
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5", 
    rowGap:5   
  },
 
});


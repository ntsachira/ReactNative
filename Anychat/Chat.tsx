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
import Icon from 'react-native-vector-icons/dist/Ionicons';

  export function Chat({navigation,route}){

    const items = [
      {
        'side':'right',
        'message':'Hello!',
        'status':'1',
      },
      {
        'side':'left',
        'message':'Hi, how are you!',
        'status':null,
      },
      {
        'side':'right',
        'message':'Hi, how are you!',
        'status':'2',
      },

    ];
  
  const ui = (
    <SafeAreaView style={styles.main}>      
      <View style={styles.view1}>
        <View style={styles.menuView}>
          <View style={styles.view5}><Icon name="ios-color-filter" color="#707070" size={35}/></View>
        </View>
        <View style={styles.nameView}><Text style={styles.text5}>{route.params.name}</Text></View>
        <View style={styles.profileView}>
          <View style={styles.view5}><Icon name="person" color="#707070" size={40}/></View>
        </View>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <FlatList data={items} renderItem={messageList}/>                     
        </View>
      </View>
      <View style={styles.view6}>
          <TextInput 
          style={styles.input1} 
          placeholder="Search chat list" 
          placeholderTextColor={"#A8A7A7"}
          autoCorrect={false}
          multiline          
          />
          <TouchableOpacity style={styles.button3} activeOpacity={0.7}>
              <Icon name="send" color="white" size={25} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
                <Text style={styles.chatText2}>6.45 pm</Text>
                {item.side=='right'?<Icon name="ios-checkmark-circle-outline" color={item.status=='1'?"green":"gray"} size={20}/>:null}
              </View>
            </View>
          </View> 
  );
  return ui;
}

const styles = StyleSheet.create({ 
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
    paddingBottom:4
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
    fontSize:20,
    color:"black",
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
  nameView:{
    height:50,
    width:"55%",    
    alignItems:"center",
    justifyContent:"center",  
  },
  menuView:{
    height:70,
    width:"19%",     
    alignItems:"center",
    justifyContent:"center",
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
    height:670,
    paddingHorizontal:10,
    paddingTop:15,
  },
  view2:{    
    width:"100%",
    alignItems:"center",
    padding:0,      
    flex:1
  },
  view1:{    
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:90,
    flexDirection:"row", 
    borderRadius:34,    
    backgroundColor:"white",
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5", 
    rowGap:10   
  },
 
});


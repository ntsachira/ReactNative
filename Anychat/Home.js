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
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "./Profile";

export function Home({navigation}){

  const [items, setItems] = useState([]);
  const [dp,setDp] = useState("http://192.168.1.189/anychat/avatars/avatar7.png");
  

  async function loadUsers(searchText){   
    
    var userJSONText = await AsyncStorage.getItem('user');
    var text =JSON.parse(userJSONText);    
    var url = text.user.profile_url;
    
    //var imageURL = "http://192.168.1.189/anychat/avatars/"+url+".png?time=" + new Date();
    
    //setting new url 
    setDp(url);

    const form= new FormData();
    form.append("userJson",userJSONText);
    form.append("searchText",searchText);
    form.append("users","old");

      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          setItems(JSON.parse(request.responseText));
         
         
        }
      };
      request.open('POST', 'http://192.168.1.189/anychat/load_users.php', true);
      request.send(form); 
  }

  function start(){
    loadUsers("");    
  }
  function startAgain(){
    loadUsers("");
  
    setInterval(start,3000);  
  } 

  useEffect(startAgain,[]);
  

  const ui = (
    <SafeAreaView style={styles.main}> 
      <View style={styles.iconView}>
        <View style={styles.iconBackView}><Image source={{uri:"http://192.168.1.189/anychat/logo1.png"}} style={styles.iconImage}/></View>        
        <Text style={styles.iconText}>NY CHAT</Text>
      </View>     
      <View style={styles.view1}>
        <TouchableOpacity 
          style={styles.menuView} 
          activeOpacity={0.5}
          onPress={()=>{navigation.navigate("Profile")}}
          >
          <View style={styles.view5}>
            <Image  source={{uri:"http://192.168.1.189/anychat/avatars/"+dp+".png",cache:"reload"}} style={styles.dp} /></View>
        </TouchableOpacity>
        <TextInput 
          style={styles.input1} 
          placeholder="Search chat list" 
          placeholderTextColor={"gray"} 
          onChangeText={(text)=>{loadUsers(text)}}
        />
        <TouchableOpacity style={styles.profileView} activeOpacity={0.5} onPress={()=>{ navigation.navigate("SignOut")}}>
          <View style={styles.logOutView}>
            <Image source={require("./images/avatars/logOut2.png")} style={styles.viewPower}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <FlatList data={items} renderItem={chatUI}/>
          </View>          
          <TouchableOpacity style={styles.button3} activeOpacity={0.7} onPress={()=>{navigation.navigate("NewChat")}}>
              <Text style={styles.text3}>Start a new chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );

  function chatUI({item}){
    const ui = (
      <TouchableOpacity style={styles.view9} activeOpacity={0.5} onPress={m}>
          <View style={styles.view6}>
             <View style={styles.image1}><Image source={{uri:"http://192.168.1.189/anychat/avatars/"+item.dpName+".png"}} style={styles.avatarBack} /></View>
          </View>
          <View style={styles.view7}>
            <Text style={styles.text1}>{item.name}</Text>
            <Text style={styles.text2}>{item.message}</Text>
          </View>
          <View style={styles.view8}>
            <Text style={styles.text4}>{item.time}</Text>
            <View style={styles.view10}>
              {item.status!="null"?<Icon name="checkcircleo" color={item.status!='seen'?"#707070":"blue"} size={20}/>:null}
              <View style={styles.view11}>
                <Text style={styles.text5}>{item.count}</Text>
              </View>
            </View>                
          </View>
      </TouchableOpacity>
    );
    return ui;
  
    function m(){
      //Alert.alert("Message",item.name);
  
      const obj = {
        "name":item.name,
        "id":item.id,
        "img":item.dpName,
        "country":item.country,
        'mobile':item.mobile,
        'birthday':item.birthday,
      };
      navigation.navigate("Chat",obj);
      
    }
  }

  return ui;
}



const styles = StyleSheet.create({  
  iconBackView:{
    height:40,
    width:43,
    backgroundColor:"white",
    borderRadius:20,
    start:-2,
    elevation:8
  },
  iconText:{
    color:"white",
    fontSize:30,
    fontFamily:"RighteousRegular",    
  },
  iconView:{
    flexDirection:"row",
    position:"absolute",
    zIndex:1,
    alignItems:"center",
    justifyContent:"center",
    columnGap:2,
    top:4
  },
  iconImage:{
    height:35,
    width:35, 
    start:3,    
  },
  logOutView:{
    height:60,
    width:60,
    alignItems:"center",    
    borderRadius:30,
    top:-5,     
  },
  dp:{
    height:57,
    width:57,    
    borderRadius:30,        
  },
  viewPower:{
    height:45,
    width:45,  
    marginTop:4,
    top:5 ,
    start:5
  },
  avatarBack:{
    height:60,
    width:60,
    alignItems:"center",
    justifyContent:"center",   
    borderRadius:50,
  },
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
    color:"gray",
  },
  text1:{
    fontSize:17,
    color:"#5271FF",
    fontWeight:"bold",
  },
  image1:{
    height:60,
    width:60,    
    alignItems:"center",
    justifyContent:"center", 
    borderRadius:30,    
  },
  view9:{
    borderBottomWidth:1,
    borderColor:"#C1CDFF",
    width:"100%", 
    flexDirection:"row",
    height:80,
    borderRadius:34,
    backgroundColor:"white",
    borderLeftWidth:1,
    paddingRight:5,
    borderBottomRightRadius:0,
    
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
    height:61,
    width:61,
    backgroundColor:"white",
    borderRadius:30,
    alignItems:"center", 
    justifyContent:"center",     
    borderWidth:1,
    borderColor:"white",
    elevation:9
  },
  profileView:{
    height:40,
    width:"18%",    
    alignItems:"center",
    justifyContent:"center", 
    
  },
  input1:{
    height:50,
    width:"64%",
    
    color:"black",
    borderRadius:25,
    backgroundColor:"white",
    paddingLeft:20,
    fontSize:16,
    zIndex:1,
  },
  menuView:{
    height:50,
    width:"18%",     
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
    height:60,
    borderRadius:30,  
    zIndex:1,
    position:"absolute",
    bottom:30,    
    elevation:25,
    
  },
  
  view3:{    
    width:"100%",    
    alignItems:"center",    
    borderRadius:34,    
    backgroundColor:"white", 
    height:"85%"  ,
    overflow:"hidden",
    
  },
  view2:{    
    width:"100%",
    justifyContent:"flex-end",      
    height:"100%",
    zIndex:-1
  },
  view1:{    
    width:"100%",
    alignItems:"flex-end",
    justifyContent:"center",
    height:125,
    flexDirection:"row", 
    backgroundColor:"#5271FF", 
    paddingBottom:20  ,
    elevation:9,
    position:"absolute"
    
    
  },
  main:{
    flex:1,    
    alignItems:"center",
    backgroundColor:"#EAEAF5",    
  },
 
});

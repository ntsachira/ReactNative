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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({navigation}){
  const [profileImage,setProfileImage] = useState(null);
  const [mobile,setMobile] = useState("");   
  const [name,setName] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("-Set your birthday-");
  const [dp,setDp] = useState(null);

  const info =[
    {
      'icon':'user',
      'topic':'Name',
      'value':name, 
      'size':25, 
      'navigate':'ChangeName' 
    },
    {
      'icon':'globe',
      'topic':'Country',
      'value':country, 
      'size':25,      
      'navigate':'SelectCountry' 
    },
    {
      'icon':'mobile',
      'topic':'Mobile',
      'value':mobile,  
      'size':30,  
      'navigate':'ChangeName'    
    },
    {
      'icon':'calendar',
      'topic':'Birthday',
      'value':birthday, 
      'size':20,    
      'navigate':'ChangeName'   
    },
  ];


  async function selectProfilePicture(){
    
    const options={
      "mediaType":"photo"
    };

    const result = await launchImageLibrary(options);

    if(result.didCancel){
      Alert.alert("Message","No Image selected");
    }else{
     const imageObject = {
        "uri":result.assets[0].uri,
        "name":"profile.png",
        "type":"image/png",
      };

      setProfileImage(imageObject);
      //loadSignUp(0);
      
    }
  
  }

  async function loadUsers(){   
    
    var userJSONText = await AsyncStorage.getItem('user');
    var text =JSON.parse(userJSONText);
    var user = text.user;
    setName(user.username);
    if(user.birthday!=null){
      setBirthday(user.birthday);
    }
    setMobile(user.mobile);
    setCountry(text.country);
    setDp(user.profile_url);
  }

  function start(){
    loadUsers();    
  }
  useEffect(start,[]);

  function updateDp(){
    if(profileImage==null){
      Alert.alert("Message","No any changes");
      navigation.navigate("Home");
    }else{
      //Alert.alert("Message","New Profile image detected");
      const form= new FormData();    
      form.append("profileImage",profileImage);
      form.append("mobile",mobile);
      form.append("url",dp);
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            AsyncStorage.setItem(`user`,request.responseText);
            navigation.navigate("Home");
         
         
        }
      };
      request.open('POST', 'http://192.168.1.189/anychat/updateDp.php', true);
      request.send(form); 
    }
      
  }
  
  const ui = (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity style={{start:8,zIndex:2,position:"absolute",top:15,opacity:0.6}} hitSlop={30} onPress={()=>{navigation.navigate("Home");}}>
      <Image source={require("./images/back.png")} style={{height:50,width:50}}/>
        </TouchableOpacity> 
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>  
           <TouchableOpacity style={styles.view5} onPress={selectProfilePicture}>
              <View style={styles.dpBack}>
                <View style={styles.dpView}>
                <Image source={{uri:profileImage!=null?profileImage.uri:"http://192.168.1.189/anychat/avatars/"+dp+".png",cache:"reload"}} style={styles.avatarBack}/>
                </View>
                <View style={styles.imageSelector}>
                  <Icon name="camera" color="white" size={20}/>
                </View>
              </View>
            </TouchableOpacity>            
                         
            <FlatList data={info} renderItem={loadInfo}/>
            
            <View style={styles.view8}>
              <TouchableOpacity style={styles.button1} activeOpacity={0.6} onPress={updateDp}>
                <Text style={styles.btnText1}>Update profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} activeOpacity={0.6} onPress={()=>{navigation.navigate("ChangePassword")}}>
                <Text style={styles.btnText1}>Change password</Text>
              </TouchableOpacity>             
              <TouchableOpacity  style={styles.button3} activeOpacity={0.6} onPress={()=>{Alert.alert("Alert !","This facility not is not supported yet.")}}>
              <Text style={styles.btnText1}>Deactivate account</Text>
              </TouchableOpacity>
              
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;

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
                  <TouchableOpacity style={styles.detailView4} onPress={()=>{navigation.navigate(item.navigate)}}>
                    <Icon name="edit" color="#5271FF" size={25}/>
                  </TouchableOpacity>
                </View>
              </View>  
    );
    return ui;
  }
}



const styles = StyleSheet.create({ 
  avatarBack:{
    height:130,
    width:130,
   
    borderRadius:65,
  },
  button2:{
    width:"80%",
    backgroundColor:"black",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
  }, 
  button3:{
    width:"80%",
    backgroundColor:"red",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,    
  },  
  btnText1:{
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  },
  button1:{
    width:"80%",
    backgroundColor:"#5271FF",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
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
    height:45,
    width:45,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"white",
    borderWidth:2,
    borderRadius:25,
    position:"absolute",
    end:0,
    bottom:-2,
    backgroundColor:"#5271FF",
  },
  view5:{      
    height:130,
    width:130,
    borderRadius:17    
  },
  view6:{
    alignItems:"center"
  },
  dpView:{
    height:130,
    width:130,
    alignItems:"center",
    justifyContent:"center",    
    borderRadius:65,
  },
  dpBack:{
    height:130,
    width:130,
    borderRadius:50,   
  },   
  text1:{       
    color:"#5271FF",
    fontSize:13,
  },
  text2:{
    fontSize:17,    
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
    paddingBottom:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:20,  
    paddingTop:25, 
  },
  view2:{    
    width:"100%",
    alignItems:"center",     
    height:700, 
    paddingTop:40,      
  },
  view1:{    
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-end", 
    height:100,    
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


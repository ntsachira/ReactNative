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
  Alert
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export function ProfileImageSelect({navigation,route}){
  
  const [avatarUrl,setAvatarUrl] = useState("avatar7");
  const [profileImage,setProfileImage] = useState(null);
  const [skipButton,setSkipButton] = useState("Finish");
  const [imageStatus,setImageStatus] = useState("");

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
      setAvatarUrl(route.params.mobile);
    }
   
   setImageStatus("image");
  }

  function loadSignUp(){
    
    const form = new FormData();
    form.append("profileImage",profileImage);
    form.append("signUpDetails",JSON.stringify(route.params));
    form.append("avatarUrl",avatarUrl);
   form.append("imageStatus",imageStatus);

    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
        if(request.responseText=="avatar7"){
          setSkipButton("Skip? and finish");
        }else{
          setSkipButton("Finish");
        }
        setAvatarUrl(request.responseText);
        Alert.alert("nice",request.responseText);
      }
    };
    request.open("POST","http://192.168.1.189/anychat/signUpProcess.php",true);
    request.send(form);
  }
  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <TouchableOpacity style={styles.view5} onPress={selectProfilePicture}>
              <View style={styles.dpBack}>
                <View style={styles.dpView}>
                <Image source={{uri:avatarUrl==route.params.mobile?(profileImage.uri):("http://192.168.1.189/anychat/avatars/"+avatarUrl+".png")}} style={styles.avatarBack}/>
                </View>
                <View style={styles.imageSelector}>
                  <Icon name="camera" color="black" size={15}/>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.text2}>Add picture</Text>
          </View>
          <Text style={styles.text1}>OR</Text>
          <View style={styles.view6}>
            <Text style={styles.text2}>Select an avatar</Text>
            <View style={styles.view7}>
              <View style={styles.avatarStack}>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar5");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar5.png")} style={styles.avatarBack}/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar2");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar2.png")} style={styles.avatarBack}/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar3");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar3.png")} style={styles.avatarBack}/></TouchableOpacity>
              </View>
              <View style={styles.avatarStack}>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar4");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar4.png")} style={styles.avatarBack}/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar1");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar1.png")} style={styles.avatarBack}/></TouchableOpacity>
                <TouchableOpacity style={styles.avatarBack} onPress={()=>{setAvatarUrl("avatar6");setImageStatus("avatar")}}>
                  <Image source={require("./images/avatars/avatar6.png")} style={styles.avatarBack}/></TouchableOpacity>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button3} activeOpacity={0.7} onPress={loadSignUp}>
              <Text style={styles.text3}>{skipButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}


const styles = StyleSheet.create({ 
  text2:{
    color:"black",
    fontWeight:"bold",
    fontSize:15,
  },
  text1:{
    color:"#5271FF",
    fontWeight:"bold",
    fontSize:17,
  },
  imageSelector:{
    height:30,
    width:30,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#5271FF",
    borderWidth:1,
    borderRadius:15,
    position:"absolute",
    end:0,
    bottom:0,
    backgroundColor:"white",
  },
  dpView:{
    height:100,
    width:100,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#5271FF",
    borderWidth:2,
    borderRadius:50,
  },
  dpBack:{
    height:100,
    width:100,
    borderRadius:40,
    borderColor:"#F3F6FF",
    borderWidth:1,
  },
  avatarBack:{
    height:90,
    width:90,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#F3F6FF",
    borderRadius:50,
  },
  avatarStack:{
    flexDirection:"row",
    columnGap:10,
  },
  view7:{    
    rowGap:10,    
  },
  view6:{      
    width:"100%",
    alignItems:"center",
    justifyContent:"center",   
    rowGap:10, 
  },
  view5:{      
    height:100,
    width:100,
    borderRadius:17    
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
    width:"85%",
    backgroundColor:"#5271FF",
    alignItems:"center",
    justifyContent:"center",
    height:48,
    borderRadius:24,
    marginBottom:"10%"
  },
  
  view3:{    
    width:"90%",
    paddingVertical:25,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:20,   
  },
  view2:{    
    width:"100%",
    alignItems:"center",      
  },
  view1:{
    paddingVertical:24,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:"17%"    
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


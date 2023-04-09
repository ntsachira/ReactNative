import React,{useState} from "react";
import {
  Alert,
  Image,
  SafeAreaView, 
  StyleSheet, 
  Text,
  TextInput,  
  TouchableOpacity,
  View,
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignIn({navigation}){

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [hide1,setHide1] = useState(1);
  
  
  function loadSignIn(){
    const jsRequestObject ={"mobile":mobile,"password":password};
    
    const form = new FormData();
    form.append("requestJSON",JSON.stringify(jsRequestObject));

    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState == 4 && request.status == 200) {
          var jsonResponseText = request.responseText;          
          var jsResponseObject = JSON.parse(jsonResponseText);  

          if(jsResponseObject.msg=="Error"){
            setError("Invalid username or password");
          }else{
            Alert.alert("Sign In success as ->",jsResponseObject.user.username);
            const navObject = {
              'user':jsResponseObject.user,
            };
            AsyncStorage.setItem(`user`,jsonResponseText);
            navigation.navigate("Home",navObject);
          }
      } 
  };
  request.open("POST","https://2d1b-192-248-3-212.ngrok.io/anychat/signIn.php",true);
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
            <View style={styles.button1}  >
              <Text style={styles.text1}>Sign In</Text>
            </View>
            <TouchableOpacity style={styles.button2} activeOpacity={0.7} onPress={()=>{navigation.navigate("SignUp")}}>
              <Text style={styles.text2}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Invalid username or password Error Message */}
          <Text style={{color:"red", fontSize:14,bottom:-10}}>{error}</Text>

          <View style={styles.view5}>
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="mobile" color="white" size={28}/>
              </View>
              <TextInput 
                style={error==""?styles.input1:styles.input1Warn} 
                placeholder="Mobile number" 
                placeholderTextColor={"#A8A7A7"} 
                onChangeText={setMobile}    
                autoCorrect={false} 
                inputMode="numeric" 
                maxLength={10}                                                        
              />
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="lock" color="white" size={25}/>
              </View>
              <TextInput 
                style={error==""?styles.input1:styles.input1Warn} 
                placeholder="Password" 
                placeholderTextColor={"#A8A7A7"} 
                onChangeText={setPassword}
                autoCorrect={false} 
                secureTextEntry={hide1==1?true:false}              
              />
              <TouchableOpacity style={styles.button5} onPress={()=>{hide1==1?setHide1(2):setHide1(1);}} hitSlop={20}>
                <Icon name={hide1==1?"eye-slash":"eye"} size={20} color={hide1==1?"gray":"black"}/>
              </TouchableOpacity>              
            </View>
            <TouchableOpacity 
            style={styles.button4} 
            activeOpacity={0.7} 
            onPress={()=>{Alert.alert("Forgot Password?","Who cares, LOL")}}
            hitSlop={20}
            >
              <Text style={styles.text4}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button3} activeOpacity={0.7} onPress={loadSignIn}>
              <Text style={styles.text3}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  text4:{
    color:"#5271FF"
  },
  button5:{
    position:"absolute",
    end:4,
  },  
  button4:{
    width:120,    
    alignItems:"center",
    alignSelf:"flex-end"
  },
  input1Warn:{
    height:40,
    borderBottomWidth:1,
    borderColor:"#5271FF",
    width:"90%",
    paddingLeft:40,
    justifyContent:"flex-end",
    fontSize:17,
    zIndex:-1,
    color:"black",
  },
  input1:{
    height:40,
    borderBottomWidth:1,
    borderColor:"#A8A7A7",
    width:"90%",
    paddingLeft:40,
    justifyContent:"flex-end",
    fontSize:17,
    zIndex:-1,
    color:"black",
  },
  iconBack:{
    height:44,
    width:44,
    backgroundColor:"black",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:22,
    position:"absolute",
    start:0,
    top:4
  },
  inputView:{
    flexDirection:"row",   
    height:44,
    justifyContent:"center",
    alignItems:"center",
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
    marginBottom:20,
    marginTop:100,
  },
  view5:{
    width:"85%",
    marginVertical:20,    
    rowGap:20,
  },
  text1:{
    fontSize:18,    
    color:"white",
    fontWeight:"bold",
  },
  text2:{
    fontSize:18,    
    color:"#5271FF",
    fontWeight:"bold",
  },
  button2:{
    height:40,
    width:"50%",
    alignItems:"center",
    borderRadius:20,
    justifyContent:"center",    
  },
  button1:{
    height:40,
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#5271FF",
    borderRadius:20,
    
  },
  view4:{
    flexDirection:"row",
    width:"85%",
    height:42,
    borderWidth:1,
    borderColor:"#EAEAF5",
    borderRadius:21,  
    alignItems:"center",
  },
  view3:{    
    width:"90%",
    paddingVertical:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:20,  
    borderColor:"#E4E4E4" 
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


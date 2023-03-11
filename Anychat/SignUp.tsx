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
  Alert,
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Dropdown from '@febfeb/react-native-dropdown';

export function SignUp({navigation,route}){
  
  const [countryArray,setCountryArray] = useState([]);

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [verifyPassword,setVerifyPassword] = useState("");
  const [name,setName] = useState("");
  const [countryId, setSetCountryId] = useState(0);

  const [detail,setDetail] = useState(
    {
      'mobile':null,
      'password':null,
      'verifyPassword':"0",
      'name':"0",
      'countryId':0,
    }
  );

  
  const [hide1,setHide1] = useState(1);
  const [hide2,setHide2] = useState(1);

  const [passwordErrorText,setPasswordErrorText] = useState("");
  const [mobileErrorText,setMobileErrorText] = useState("");
  const [verifyErrorText,setVerifyErrorText] = useState("");
  const [nameErrorText,setnameErrorText] = useState("");
  const [countryErrorText,setCountryErrorText] = useState("");
  
  function loadDetails(text1,text,text3,text4,text5){
    setDetail(
      {
        'mobile':text1,
        'password':text,
        'verifyPassword':text3,
        'name':text4,
        'countryId':text5,
      }
    );    
  }
  
  function loadCountries(){   
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
        //Alert.alert(request.responseText);
        const jsResponseObject = JSON.parse(request.responseText);
        setCountryArray(jsResponseObject);
      }
    };
    request.open("GET","http://192.168.1.189/anychat/loadCountries.php",true);
    request.send();
  }
  function startLoadCountries(){
    loadCountries();
  }
  useEffect(startLoadCountries,[]);

  function checkError(text){   
    const form =new FormData();
    form.append("checkError",text);
    form.append("userDetails",JSON.stringify(detail));
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
          const status =JSON.parse(request.responseText);
          setPasswordErrorText(status.passwordStatus);
          setMobileErrorText(status.mobileStatus);
          setVerifyErrorText(status.verifyStatus);
          setnameErrorText(status.nameStatus);
          setCountryErrorText(status.countryStatus);
          if(status.countryStatus=="Success"){
            navigation.navigate("ProfileImageSelect");
          }
      }
    };
    request.open("POST","http://192.168.1.189/anychat/signUpCheck.php",true);
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
            <TouchableOpacity style={styles.button2} activeOpacity={0.7} onPress={()=>navigation.navigate("SignIn")}>
              <Text style={styles.text2}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.button1} >
              <Text style={styles.text1}>Sign Up</Text>
            </View>
          </View>
          <View style={styles.view5}>
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="mobile" color="white" size={25}/>
              </View>
              <TextInput 
              style={styles.input1} 
              placeholder="Mobile number"
              onChangeText={(text1)=>{setMobile(text1);loadDetails(text1,password,verifyPassword,name,countryId)}}
              maxLength={10} 
              inputMode="numeric"             
              />              
            </View>

            <Text style={{alignSelf:"flex-end",fontSize:12,color:"red"}}>
              {mobileErrorText=="Success"?<Icon name="check" size={15} color="#5271FF"/>:mobileErrorText}
            </Text>

            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="lock" color="white" size={25}/>
              </View>
              <TextInput 
              style={styles.input1} 
              placeholder="Password" 
              secureTextEntry={hide2==1?true:false} 
              onChangeText={(text)=>{checkError(text);setPassword(text);loadDetails(mobile,text,verifyPassword,name,countryId)}}
              />
              <TouchableOpacity style={styles.button5} onPress={()=>{hide2==1?setHide2(2):setHide2(1);}} hitSlop={20}>
                <Icon name={hide2==1?"eye-slash":"eye"} size={20}  color={hide2==1?"gray":"black"}/>
              </TouchableOpacity>              
            </View>
            
            <Text style={{alignSelf:"flex-end",fontSize:12,color:"red"}}>
              {passwordErrorText=="Success"?<Icon name="check" size={15} color="#5271FF"/>:passwordErrorText}
            </Text>
            
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name={"lock"} color="white" size={25}/>
              </View>
              <TextInput 
              style={styles.input1} 
              placeholder="Verify password" 
              secureTextEntry={hide1==1?true:false} 
              onChangeText={(text3)=>{setVerifyPassword(text3);loadDetails(mobile,password,text3,name,countryId)}}
              />
              <TouchableOpacity style={styles.button5} onPress={()=>{hide1==1?setHide1(2):setHide1(1);}} hitSlop={20}>
                <Icon name={hide1==1?"eye-slash":"eye"} size={20} color={hide1==1?"gray":"black"}/>
              </TouchableOpacity>              
            </View>
            
            <Text style={{alignSelf:"flex-end",fontSize:12,color:"red"}}>
              {verifyErrorText=="Success"?<Icon name="check" size={15} color="#5271FF"/>:verifyErrorText}
            </Text>
            
            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="user" color="white" size={25}/>
              </View>
              <TextInput 
              style={styles.input1} 
              placeholder="Name" 
              onChangeText={(text4)=>{setName(text4);loadDetails(mobile,password,verifyPassword,text4,countryId)}}/>
            </View>

            <Text style={{alignSelf:"flex-end",fontSize:12,color:"red"}}>
              {nameErrorText=="Success"?<Icon name="check" size={15} color="#5271FF"/>:nameErrorText}
            </Text>

            <View style={styles.inputView}>
              <View style={styles.iconBack}>
                <Icon name="globe" color="white" size={25}/>
              </View>    
           
              <View style={{justifyContent:"center",width:"91%",paddingLeft:20,zIndex:-1}}>
              <Dropdown            
            value={countryId}
            data={countryArray}
            onChange={(val) => { setSetCountryId(val);loadDetails(mobile,password,verifyPassword,name,val)}}
            theme={{
              boxStyle: {
              borderRadius:0,
              borderBottomColor: '#A8A7A7',                
              borderColor:"white", 
              paddingLeft:20,
              paddingRight:0                              
              },
              textContentStyle: {
              color: 'black',
              },             
              modalContentStyle: {
              borderRadius:34,
              width:"90%",              
              },              
              searchWrapperStyle: {
              borderRadius:20,
              height:40,                          
            },                    
            }}
            showSearchBar={true}            
            />
              </View>      
            </View>
            
            <Text style={{alignSelf:"flex-end",fontSize:12,color:"red"}}>
              {countryErrorText=="Success"?<Icon name="check" size={15} color="#5271FF"/>:countryErrorText}
            </Text> 

          </View>
          <TouchableOpacity style={styles.button3} activeOpacity={0.7} onPress={()=>{checkError("submit");}}>
              <Text style={styles.text3}>Next</Text>
              <View style={{width:"90%",alignItems:"flex-end",position:"absolute"}}>
                <Icon name="arrow-circle-right" size={30} color="white"/>
              </View>              
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;

  
}



const styles = StyleSheet.create({
  button5:{    
    position:"absolute",
    end:4,
  },  
  button4:{
    width:120,    
    alignItems:"center",
    alignSelf:"flex-end"
  },
  input1:{
    height:40,
    borderBottomWidth:1,
    borderColor:"#A8A7A7",
    width:"90%",
    paddingLeft:40,
    justifyContent:"flex-end",
    fontSize:15,
    zIndex:-1
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
    marginBottom:15,
    marginTop:10,
    flexDirection:"row"
  },
  view5:{
    width:"85%",
    marginVertical:20,    
    rowGap:1,
  },
  text1:{
    fontSize:18,    
    color:"white",
  },
  text2:{
    fontSize:18,    
    color:"#5271FF",
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
    height:40,
    borderWidth:1,
    borderColor:"#EAEAF5",
    borderRadius:20,  
    
  },
  view3:{    
    width:"90%",
    paddingVertical:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white", 
    rowGap:35,   
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


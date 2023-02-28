import React, { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import SelectDropdown from "react-native-select-dropdown";

export function SignUp({navigation}) {
  const [mobileNumber,setMobileNumber] = useState("");  
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [verifyPassword,setVerifyPassword] = useState("");
  const [country,setContry] = useState("");
  const [profileImage,setProfileImage] = useState(null);

  const [countries,setCountries] =useState([]) ;

  const ui = (
    <SafeAreaView style={styles2.signUpMain}>
      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1}
      autoCorrect={false}
      maxLength={10}
      keyboardType={'numeric'}
      onChangeText={setMobileNumber}
      placeholder={"Mobile"}
      />        
      </View>

      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setName}
      placeholder={"Name"}
      />        
      </View>

      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setPassword}
      placeholder={"Password"}
      secureTextEntry={true}
      />        
      </View>

      <View style={styles2.view1}>     
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setVerifyPassword}
      placeholder={"Verify Password"}
      secureTextEntry={true}
      />        
      </View>

      <View style={styles2.view1}>      
      <SelectDropdown 
      data={countries}
      defaultButtonText={"Select Country"}
      buttonStyle={styles2.select1}
      onSelect={setContry}
      />       
      </View>

      <View style={styles2.view2}>
       
        <Button title='select Profile Picture' onPress={selectProfilePicture}/>
        <Button title='Sign Up' onPress={signUpRequest}/>

      </View>

    </SafeAreaView>
  );


  function loadCountries(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
       var countryArray = JSON.parse(request.responseText);
       setCountries(countryArray);
    }
    };
    request.open("GET","http://10.0.2.2/react_chat/loadCountries.php",true);
    request.send();
  }

  loadCountries();

  async function selectProfilePicture(){

    const options={
      "mediaType":"photo"
    };

    const result = await launchImageLibrary(options);

    if(result.didCancel){
      Alert.alert("Message","No Image");
    }else{
     const imageObject = {
        "uri":result.assets[0].uri,
        "name":"profile.png",
        "type":"image/png",
      };

      setProfileImage(imageObject);
    }

  }

  function signUpRequest(){
    
    //Alert.alert("Message",profileImage.uri);
    
    var form = new FormData();
    form.append("mobile",mobileNumber);
    form.append("name",name);
    form.append("password",password);
    form.append("verifyPassword",verifyPassword);
    form.append("country",country);
    form.append("profile_picture",profileImage);
  
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200){
            Alert.alert("Response",request.responseText);
        }
    };
    request.open("POST","http://10.0.2.2/react_chat/signUp.php",true);
    request.send(form);   
  }

  return ui;
}

const styles2 = StyleSheet.create({
  signUpMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select1:{
    width:"70%",
    height:40,
    borderStyle:"solid",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    paddingStart:10,
    fontSize:16,
    backgroundColor:"white",

  },
  view2:{
    padding:10,
    width:"70%", 
    gap:10,           
  },
  view1:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10,
  },
  text1:{
    fontSize:20,
    paddingEnd:10,
  },
  input1:{
    width:"70%",
    height:40,
    borderStyle:"solid",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    paddingStart:10,
    fontSize:16,
   
  },
});
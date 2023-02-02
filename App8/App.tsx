import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput,Alert, Switch, StatusBar } from "react-native";

function App(){

  const [mobile,setMobile] = useState("07");
  const [password,setPassword] = useState("");
 

  const ui =(
    <SafeAreaView style={styles.main}>
      <StatusBar hidden={true }/>
      <Text style={styles.text1}>Mobile</Text>
      <TextInput style={styles.input1} onChangeText={setMobile} keyboardType="numeric" maxLength={10} value={mobile} />
      <Text style={styles.text1}>Password</Text>
      <TextInput style={styles.input1} secureTextEntry={true} onChangeText={setPassword}/>
      <Switch />
      <Button title="Login" onPress={login}/>
    </SafeAreaView>
  );

  return ui;


  function login(){

    var requestObject = {
      mobile:mobile,
      password:password,
    };
  
    var json = JSON.stringify(requestObject);
  
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState==4&&request.status==200){
        var response = request.responseText;
        var JS_Object = JSON.parse(response);
        Alert.alert("Message",JS_Object.msg);
      }
    };
    request.open("POST","http://10.0.2.2/react_php_mysql_2/index.php",true);
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send("login="+json);
  }
}



export default App;


const styles = StyleSheet.create(
  {
    main:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      gap:10,
    },
    text1:{
      fontSize:20,
      width:"80%",      
    },
    input1:{
      fontSize:20,
      borderWidth:1,
      borderRadius:10,
      width:"80%",
      paddingHorizontal:10,
      height:50,
    }
  }
);
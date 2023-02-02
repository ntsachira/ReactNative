import React, { useState } from 'react';
import { SafeAreaView,Button,Text, StyleSheet, Alert, } from 'react-native';


function App(){

  const [t1,setT1]=useState("Response");
  const [t2,setT2]=useState("Response");
  const [t3,setT3]=useState("Response");
  const [t4,setT4]=useState("Response");
  const [t5,setT5]=useState("Response");

  const ui =(
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>{t1}</Text>
      <Text style={styles.text}>{t2}</Text>
      <Text style={styles.text}>{t3}</Text>
      <Text style={styles.text}>{t4}</Text>
      <Text style={styles.text}>{t5}</Text>
      <Button title='Send Request' onPress={f1}/>
      <Button title='reverse' onPress={f2}/>
    </SafeAreaView>
   
  );
  function f1(){
    var obj2 = {"x":10,"y":20};
    var json2 = JSON.stringify(obj2);
   
    var requestObject ={
      method:"GET",
    }


    var request = fetch("http://10.0.2.2/react_php/index.php?json2="+json2,requestObject);

    request.then(response=>response.json()).then(json=>{
      setT1(json.name);
      setT2(json.gender);
      setT3(json.mobile);
      setT4(json.x);
      setT5(json.y);

    }).catch(error=>{
      Alert.alert("Error",error);
    });

  }

  function f2(){
    setT1("Response");
    setT2("Response");
    setT3("Response");
    setT4("Response");
    setT5("Response");
  }
  return ui;
}

export default App;

const styles = StyleSheet.create(
  {
    main:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      rowGap:10,
    },
    text:{
        fontSize:35,
    }
  }
);
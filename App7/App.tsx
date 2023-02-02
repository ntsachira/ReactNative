import React, { useState } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet, Text,Alert,View } from "react-native";

function App(){  

  const [x,setX] = useState([]);
  

  const ui = (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text1}>Load Data From MySQL Databases</Text>
      <Button title="Load Data" onPress={n}/>
      <FlatList data={x} renderItem={m}/>
    </SafeAreaView>
  );

  function n(){
   
    fetch("http://10.0.2.2/react_php_mysql/index.php",{Method:"GET"})
    .then(response=>{return response.json()})
    .then(json=>{setX(json.names)})
    .catch(error=>{Alert.alert("Error",error)});
   
  }
  return ui;
}

function m({item}){
  const itemUI =(
    <View style={styles.view1}>
        <View style={styles.circle}>
          <Text style={styles.text3}>{item.substring(0,1)}</Text>
        </View>
        <View>
        <Text style={styles.text2}>{item}</Text>
        <Text style={styles.test4}>This is the last Message from the user</Text>
        </View>
        <Text style={styles.test4}>Seen</Text>
    </View>
    
  );

  return itemUI;
}

export default App;


const styles = StyleSheet.create(
  {
    main:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      rowGap:20,
    },
    text1:{
      fontSize:20,      
    },
    text2:{
      fontSize:17,
      color:"white",
      fontWeight:"bold",
    },
    view1:{
      flexDirection:"row",
      paddingLeft:25,
      paddingTop:20,
      paddingBottom:20,
      marginBottom:1,
      alignItems:"center",
      columnGap:15,
      backgroundColor:"#000",
      width:400,
      
    },
    circle:{
      height:48,
      width:48,
      backgroundColor:"white",
      borderRadius:24,
      justifyContent:"center",
      alignItems:"center",
    },
    text3:{
      fontSize:25,
      fontWeight:"bold",

    },
    test4:{
      color:"white",
    }
  }
);

import React from 'react';
import {View,
   SafeAreaView, 
   Text, 
   StyleSheet,
   Pressable,
   Alert,
   TouchableOpacity,
   Image,
   TouchableHighlight,
  } 
  from 'react-native';

function App() {
  const ui = (
    <SafeAreaView style={styles.main}>
      <Pressable 
        style={styles.btn} 
        onPress={f1}
        hitSlop={{top:50}}    
               
      >        
        <Image 
        source={require("./logo1.png")} 
        style={styles.img}
        />
        <Text style={styles.btnText}>Create Account</Text>
        
      </Pressable>
    </SafeAreaView>
  );

  return ui;
}

function f1(){
  //Alert.alert("Niyamai");
  Alert.alert("Message","onPress");
}


const styles = StyleSheet.create({
  main: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  btn:{   
    width:"60%", 
    backgroundColor:"black",
    borderRadius:20,   
    flexDirection:"row",
    columnGap:20,
    alignItems:"center",
    justifyContent:"center",
    height:50,    
      },
  btnText:{
    color:"white",
    fontSize:18,
    fontWeight:"bold",
  },
  img:{
    height:40,
    width:40,
  },
  view1:{
    
  }
});

export default App;

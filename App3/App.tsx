
import React from 'react';
import { SafeAreaView,View,Text, StyleSheet, Image, TextInput, Button } from 'react-native';

function App(){

  const ui = (
    <SafeAreaView style={styles.main}>
      <Image 
      source={{uri:"https://reactjs.org/logo-og.png"}} 
      style={styles.img1}
      />
      <View style={styles.view1}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.view1}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} secureTextEntry={true}/>
      </View>
      <View style={styles.view2}>
        <Button title='Create Account' color={"black"}/>
        <Button title='Sign In'/>
      </View>
    </SafeAreaView>
    
  );
return ui;
}

export default App;

const styles = StyleSheet.create({
img1:{
  marginTop:40,
  width:200,
  height:200,
  borderRadius:90
},
main:{
  flex:1,
  
  alignItems:"center",
},
view1:{
  width:"100%",  
  paddingHorizontal:20,
  paddingVertical:8
},
input:{
  fontSize:18,
  borderWidth:2,
  padding:10,
  borderRadius:10 
},
view2:{
  flexDirection:"row",
  columnGap:10,
  padding:10,
},
text:{
  fontSize:18,
  marginBottom:5
}

});
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
  } 
from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dropdown from '@febfeb/react-native-dropdown';

export function SelectCountry(){  
  const fruits = [
    { id: 1, label: 'Apple'},
    { id: 2, label: 'Orange'},
    { id: 4, label: 'Pineapple'},
    { id: 5, label: 'Sri Lanka'},
    { id: 6, label: 'India'},
    { id: 7, label: 'Japan'},
];

const [fruit, setFruit] = useState(5);

  const ui = (
    <SafeAreaView style={styles.main}>
      <Image source={require("./images/logo1Large.png")} style={styles.image1}/>
      <View style={styles.view1}>
        <Image source={require("./images/logo1.png")} style={styles.appIcon}/>
      </View>
      <View style={styles.opacView}></View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view6}>            
            <Text style={styles.text1}>Edit your country</Text>
          </View>
          
          <View style={styles.view7}>             
          <Dropdown            
            value={fruit}
            data={fruits}
            onChange={(val) => { setFruit(val);}}
            theme={{
              boxStyle: {
              borderRadius:0,
              borderBottomColor: '#5271FF',                
              borderColor:"white", 
              marginBottom:40               
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
          <View style={styles.view8}>
            <TouchableOpacity style={styles.button1} activeOpacity={0.6}>
              <Text style={styles.btnText1}>Save</Text>
            </TouchableOpacity>                          
            <TouchableOpacity  style={styles.button3} activeOpacity={0.6}>
              <Text style={styles.btnText1}>Discard</Text>
            </TouchableOpacity>              
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;
}


const styles = StyleSheet.create({  
  
  opacView:{
    position:"absolute",
    height:"100%",
    backgroundColor:"#EAEAF5",
    width:"100%",
    opacity:0.7,
  },
  button3:{
    width:"35%",
    backgroundColor:"black",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,    
  },  
  btnText1:{
    color:"white",
    fontSize:15,
  },
  button1:{
    width:"35%",
    backgroundColor:"#5271FF",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,    
  },
 
  view8:{
    width:"100%",  
    alignItems:"center",
    columnGap:15,
    flexDirection:"row",
    justifyContent:"center",
    paddingTop:20
  },
  view7:{
    width:"80%",    
    justifyContent:"center",     
  }, 
  view6:{     
    width:"80%",  
    marginBottom:15,      
  },  
  text1:{       
    color:"#5271FF",
    fontSize:18,
  },
  text2:{
    fontSize:14,    
    color:"black",
  },    
  view3:{    
    width:"90%",
    paddingTop:40,
    paddingBottom:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:34,    
    backgroundColor:"white",     
    borderWidth:1,
    borderColor:"#E4E4E4"    
  },
  view2:{    
    width:"100%",
    alignItems:"center",     
    height:800, 
    justifyContent:"center",
    position:"absolute"    
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


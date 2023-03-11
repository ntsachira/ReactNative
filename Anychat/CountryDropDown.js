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

function CountryDropDown(){  
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
          
  );
  return ui;
}



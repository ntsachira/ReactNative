import React,{useState,useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView,View,StyleSheet,Text } from 'react-native';



export function Splash({navigation}){

    async function checkUser() {
    
        const user = await AsyncStorage.getItem('user');  
        
        const screen = user!=null?"Home":"Sign In";
        navigation.navigate(screen);

        return screen;
      }

      function start(){
        setTimeout(checkUser,200);
      }

      useEffect(start,[]);

    const ui =(
        <SafeAreaView style={styles.main}>
            <Text style={styles.text1}>Splash</Text>
        </SafeAreaView>
    );

    return ui;
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text1:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        fontFamily:"RighteousRegular"
    },
});
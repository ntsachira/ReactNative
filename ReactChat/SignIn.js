import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { 
    SafeAreaView, 
    Image, 
    View, 
    TextInput, 
    Pressable, 
    Text, 
    Alert,  
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 



export function SignIn({navigation}) {  
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);    
 
    const ui = (
      <SafeAreaView style={styles.signInMain}>
        <Image
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          style={styles.signInImage}
        />
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name="mobile" />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={'Enter your mobile'}
            onChangeText={setMobile}
            
          />
        </View>
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name="lock" />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            placeholder={'Enter your password'}
            onChangeText={setPassword}
          />
        </View>
  
        <TouchableOpacity style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInButtonText1}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton2} onPress={()=>{navigation.navigate("Sign Up")}}>
          <Text style={styles.signInButtonText1}>New user? Sign Up</Text>
        </TouchableOpacity> 
       
        
      </SafeAreaView>
      
    );
    return ui;
  
    function signInProcess() {
      var jsRequestObject = {mobile: mobile, password: password};
      var jsonRequestText = JSON.stringify(jsRequestObject);
  
      var formData = new FormData();
      formData.append('jsonRequestText', jsonRequestText);
  
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          var jsonResponseText = request.responseText;
          var jsResponseObject = JSON.parse(jsonResponseText);
  
          if (jsResponseObject.msg == 'Error') {
            Alert.alert('Message', 'Invalid Entry');
          } else {
            var userObject = jsResponseObject.user;
            Alert.alert('Message', 'Hello ' + userObject.name);
            AsyncStorage.setItem('user', JSON.stringify(userObject));

            //Navigate to Home
            navigation.navigate("Home");
          }
        }
      };
      request.open('POST', 'http://192.168.1.189/react_chat/signIn.php', true);
      request.send(formData);
    }
  }

  const styles = StyleSheet.create({
    signInButtonText1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      signInButton1: {
        width: '80%',
        height: 50,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      },
      signInButton2: {
        width: '80%',
        height: 50,
        backgroundColor: '#19548c',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
      },
      signInView1: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      signInIcon1: {
        fontSize: 24,
        position: 'absolute',
        start: 15,
      },
      signInInput1: {
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 18,
        width: '80%',
        paddingStart: 40,
        borderRadius: 25,
      },
      signInImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor:"#5271FF",        
      },
      signInMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
      },
  });
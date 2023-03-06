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
    StyleSheet
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
  
        <Pressable style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInButtonText1}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.signInButton2} onpress>
          <Text style={styles.signInButtonText1}>New user? Sign Up</Text>
        </Pressable> 
       
        
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
      request.open('POST', 'http://10.0.2.2/react_chat/signIn.php', true);
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
        borderRadius: 10,
      },
      signInImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
      },
      signInMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
      },
  });
import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  FlatList,  
  Button,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; //this is not a syntax error
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {M} from './Test';

function home() {
  const [items, setItems] = useState([]);

  async function loadFriendList() {
    const userJSONText = await AsyncStorage.getItem('user');
    const formData = new FormData();
    formData.append('userJSONText', userJSONText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/load_users.php', true);
    request.send(formData);
  }

  const ui = (
    <SafeAreaView style={styles.home}>
      <Text style={styles.homeText1}>Message</Text>
      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} />
        <Icon
          name="search"
          size={30}
          color="#303030"
          style={styles.homeImage1}
        />
      </View>

      <FlatList data={items} renderItem={itemUI} />
    </SafeAreaView>
  );

  loadFriendList();
  return ui;
}

function itemUI({item}) {
  const ui = (
    <View style={styles.item}>
      <Image source={{uri: `${item.pic}`}} style={styles.itemImage} />
      <View style={styles.itemView1}>
        <Text style={styles.itemText1}>{item.name}</Text>
        <Text style={styles.itemText2}>{item.msg}</Text>
      </View>
      <View style={styles.itemView2}>
        <Text style={styles.itemText3}>{item.time}</Text>
        <View style={styles.itemShape1}>
          <Text style={styles.itemText4}>{item.count}</Text>
        </View>
      </View>
    </View>
  );

  return ui;
}

function chat() {

  const [chatText,setChatText] = useState("");

  const [userName, setUserName] = useState(null);

  async function m() {
    var userJsonText = await AsyncStorage.getItem('user');
    var userJSObject = JSON.parse(userJsonText);
    setUserName(userJSObject.name);
  }

  m();

  const [chatHistory, setChatHistory] = useState([]);

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var responseText = request.responseText;
      var responseArray = JSON.parse(responseText);
      setChatHistory(responseArray);
    }
  };
  request.open('GET', 'http://10.0.2.2/react_chat/load_chat.php', true);
  request.send();

  const ui = (
    <SafeAreaView style={styles.chat}>
      <Text style={styles.chatText1}>Chat</Text>
      <Image
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={styles.itemImage}
      />
      <Text style={styles.chatText2}>{userName}</Text>

      <FlatList
        data={chatHistory}
        renderItem={chatItem}
        style={styles.chatList}
      />
      <View style={styles.chatSendView}>
        <TextInput 
        style={styles.chatInput1} 
        placeholder="Enter your message"
        onChangeText={setChatText}
        />
        <TouchableOpacity onPress={saveChat} style={styles3.chatButton1}>
          <Icon name="paper-plane" style={styles3.chatIcon1} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ); 
 
  async function saveChat(){

    var userJsonText = await AsyncStorage.getItem('user');

    var fromUserObject = JSON.parse(userJsonText);
   
    var requestObject ={
      "from_user_id":fromUserObject.id,
      "to_user_id":3 ,
      "message":chatText,
    };

    var formData = new FormData();
  formData.append("requestJSON",JSON.stringify(requestObject));

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      Alert.alert("Message",request.responseText);
    }
  };
  request.open('POST', 'http://10.0.2.2/react_chat/save_chat.php', true);
  request.send(formData);
  } 
  
  return ui;
}

const styles3 = StyleSheet.create({
  chatButton1:{
    height:50,
    width:50,    
    marginLeft:5,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white",
    borderRadius:25
  },
  chatIcon1:{
    fontSize:30,
  }
});

function chatItem({item}) {
  const ui = (
    <View
      style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text style={styles.chatText3}>{item.time}</Text>
        {item.side == 'right' ? (
          <Icon
            name="check"
            size={18}
            style={item.status == 'seen' ? styles.chatIconSeen : null}
          />
        ) : null}
      </View>
    </View>
  );
  return ui;
}

function signIn() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

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
      <Pressable style={styles.signInButton2}>
        <Text style={styles.signInButtonText1}>New user? Sign Up</Text>
      </Pressable>

      <M/>

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
        }
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/signIn.php', true);
    request.send(formData);
  }
}

function signUp() {
  const [mobileNumber,setMobileNumber] = useState("");  
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [verifyPassword,setVerifyPassword] = useState("");
  const [country,setContry] = useState("");
  const [profileImage,setProfileImage] = useState(null);

  const [countries,setCountries] =useState([]) ;

  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1}
      autoCorrect={false}
      maxLength={10}
      keyboardType={'numeric'}
      onChangeText={setMobileNumber}
      placeholder={"Mobile"}
      />        
      </View>

      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setName}
      placeholder={"Name"}
      />        
      </View>

      <View style={styles2.view1}>      
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setPassword}
      placeholder={"Password"}
      secureTextEntry={true}
      />        
      </View>

      <View style={styles2.view1}>     
      <TextInput 
      style={styles2.input1} 
      autoCorrect={false}      
      onChangeText={setVerifyPassword}
      placeholder={"Verify Password"}
      secureTextEntry={true}
      />        
      </View>

      <View style={styles2.view1}>      
      <SelectDropdown 
      data={countries}
      defaultButtonText={"Select Country"}
      buttonStyle={styles2.select1}
      onSelect={setContry}
      />       
      </View>

      <View style={styles2.view2}>
       
        <Button title='select Profile Picture' onPress={selectProfilePicture}/>
        <Button title='Sign Up' onPress={signUpRequest}/>

      </View>

    </SafeAreaView>
  );


  function loadCountries(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
       var countryArray = JSON.parse(request.responseText);
       setCountries(countryArray);
    }
    };
    request.open("GET","http://10.0.2.2/react_chat/loadCountries.php",true);
    request.send();
  }

  loadCountries();

  async function selectProfilePicture(){

    const options={
      "mediaType":"photo"
    };

    const result = await launchImageLibrary(options);

    if(result.didCancel){
      Alert.alert("Message","No Image");
    }else{
     const imageObject = {
        "uri":result.assets[0].uri,
        "name":"profile.png",
        "type":"image/png",
      };

      setProfileImage(imageObject);
    }

  }

  function signUpRequest(){
    
    //Alert.alert("Message",profileImage.uri);
    
    var form = new FormData();
    form.append("mobile",mobileNumber);
    form.append("name",name);
    form.append("password",password);
    form.append("verifyPassword",verifyPassword);
    form.append("country",country);
    form.append("profile_picture",profileImage);
  
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200){
            Alert.alert("Response",request.responseText);
        }
    };
    request.open("POST","http://10.0.2.2/react_chat/signUp.php",true);
    request.send(form);   
  }

  return ui;
}

const styles2 = StyleSheet.create({
  select1:{
    width:"70%",
    height:40,
    borderStyle:"solid",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    paddingStart:10,
    fontSize:16,
    backgroundColor:"white",

  },
  view2:{
    padding:10,
    width:"70%", 
    gap:10,           
  },
  view1:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10,
  },
  text1:{
    fontSize:20,
    paddingEnd:10,
  },
  input1:{
    width:"70%",
    height:40,
    borderStyle:"solid",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    paddingStart:10,
    fontSize:16,
   
  },
});



export default signIn;

const styles = StyleSheet.create({
  signUpView2: {
    width: '80%',
  },
  signUpIcon3: {
    fontSize: 24,
    color: 'black',
    position: 'absolute',
    start: 10,
    top: 13,
    zIndex: 1,
  },
  signUpDropdown1Container1: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    paddingStart: 0,
    zIndex: 0,
  },
  signUpDropdown1: {
    borderRadius: 20,
  },
  signUpMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpImage1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#9993',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpIcon1: {
    fontSize: 24,
    color: 'black',
    position: 'absolute',
    start: 10,
    top: 13,
  },
  signUpIcon2: {
    fontSize: 24,
    color: 'black',
  },
  signUpView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpInput1: {
    height: 50,
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    borderRadius: 20,
    paddingStart: 40,
    paddingEnd: 10,
    fontSize: 15,
  },
  signUpButton1: {
    height: 50,
    width: '80%',
    marginBottom: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19548c',
    marginTop: 15,
    zIndex: -1,
  },
  signUpButton2: {
    height: 50,
    width: '80%',
    marginBottom: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: -1,
  },
  signUpButtonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  chatSendView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#9999',
  },
  chatInput1: {
    width: '80%',
    height: 45,
    borderStyle: 'solid',
    borderRadius: 22,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  chatIcon1: {
    paddingLeft: 10,
    color: '#0099',
    fontSize: 25,
  },
  chatText3: {
    fontSize: 10,
  },
  chatIconSeen: {
    color: 'red',
  },
  chatList: {
    width: '100%',
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  chatViewLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#0001',
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: 'black',
    borderRadius: 20,
    margin: 5,
  },
  chatViewRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#0001',
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: 'black',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  chatText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingVertical: 15,
  },
  chatText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#0461c3',
    fontFamily: 'RighteousRegular',
  },
  chat: {
    flex: 1,
    alignItems: 'center',
  },
  itemView1: {
    padding: 15,
    width: '60%',
    rowGap: 5,
  },
  itemView2: {
    alignItems: 'flex-end',
    padding: 15,
    rowGap: 5,
    marginLeft: -5,
  },
  itemShape1: {
    height: 24,
    width: 24,
    backgroundColor: 'blue',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText4: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  itemText3: {
    fontSize: 14,
    color: '#808080',
  },
  itemText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemText2: {
    fontSize: 16,
    color: '#808080',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  itemImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  home: {
    flex: 1,
    alignItems: 'center',
  },
  homeText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#0461c3',
    fontFamily: 'RighteousRegular',
  },
  homeInput1: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    width: '90%',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingEnd: 45,
    borderColor: '#0461c3',
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  homeImage1: {
    position: 'absolute',
    right: 15,
    height: 28,
    width: 28,
  },
});

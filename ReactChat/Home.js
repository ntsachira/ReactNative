import React,{ useState,useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { 
    SafeAreaView, 
    Text, 
    View, 
    TextInput, 
    FlatList, 
    Image,
    StyleSheet,
    Alert,
    Pressable,
    TouchableOpacity
 } from "react-native";
 import Icon from 'react-native-vector-icons/FontAwesome'; 


export function Home({navigation}) { 

    const [items, setItems] = useState([]);
  
    async function loadFriendList(text) {
      const userJSONText = await AsyncStorage.getItem('user');
     
      const formData = new FormData();
      formData.append('userJSONText', userJSONText);
      formData.append("text",text);
      //sAlert.alert(searchText);
  
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          setItems(JSON.parse(request.responseText));
        }
      };
      request.open('POST', 'http://192.168.1.189/react_chat/load_users.php', true);
      request.send(formData);
    }

   function loadSearchText(text){   
   loadFriendList(text);
   }

   function start (){
    loadFriendList("");
  }
  useEffect(start,[]);
  
    const ui = (
      <SafeAreaView style={styles.home}>
        <Text style={styles.homeText1}>Message</Text>
        <View style={styles.homeView1}>
          <TextInput 
          style={styles.homeInput1} 
          autoCorrect={false}
          onChangeText={(text)=>{loadFriendList(text)}}
          placeholder="Search chat list"
          />    
          
        </View>
  
        <FlatList data={items} renderItem={itemUI} />
      </SafeAreaView>
    );
  
    
    
    return ui;

    function itemUI({item}) {
      const ui = (
        <Pressable style={styles.item} onPress={m}>
          <Image source={{uri:"http://192.168.1.189/react_chat/"+item.pic}} style={styles.itemImage} />
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
        </Pressable>
      );
    
      return ui;  
      
      function m(){
        //Alert.alert("Message",item.name);
  
        const obj = {"name":item.name,"id":item.id,"img":item.url};
  
        navigation.navigate("Chat",obj);
      }
    }
    
  }  
  

  const styles = StyleSheet.create({
    itemView1: {
        paddingLeft:10 ,
        width: '60%',
        rowGap: 5,
        justifyContent: 'center',
       
      },
      itemView2: {
        alignItems: 'flex-end',
        padding: 0,
        rowGap: 5,
        marginLeft: 0,
        width:"21%",
        justifyContent: 'center',
        
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
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      itemImage: {
        height: 70,
        width: 70,
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
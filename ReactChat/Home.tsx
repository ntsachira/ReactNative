import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView, Text, View, TextInput, FlatList, Image } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";

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
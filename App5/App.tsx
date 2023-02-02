import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';


function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState('Niyamai');

  const ui = (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>{x}</Text>
      <Text style={styles.text}>{y}</Text>
      <Pressable style={styles.btn} onPress={m}>
        <Text style={styles.btnText}>Button</Text>
      </Pressable>
    </SafeAreaView>
  );

  function m() {
    if (y =="Niyamai") {
      setY('Patta');
     
    } else {
      setY('Niyamai');
      
    }
    setX(x + 1);
  }

  function n() {
    setX(x - 1);
  }
  return ui;
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 40,
  },
  btn: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: '50%',
    borderRadius:20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
  },
});

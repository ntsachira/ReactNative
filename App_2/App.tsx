import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function App() {
  const ui = (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background1}>
        <Text style={styles.t1}>Java Institute</Text>
      </View>
      <View style={styles.background2}>
        <Text style={styles.t1}>Software Engineering</Text>
      </View>
    </SafeAreaView>
  );

  return ui;
}

export default App;

const styles = StyleSheet.create({
  background2:{
    flex:5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  safe:{
    flex:1
  },
  background1: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  t1: {
    color: 'white',
    fontSize: 30,
    fontWeight:'bold'
  },
});

import React, { Component } from 'react';
import Homepage from './components/Homepage.js';
import PaginatedHomepage from './components/PaginatedHomepage.js';
import DinosaurPaginationHomepage from './components/DinosaurPaginationHomepage.js';
import { StyleSheet, Text, View } from 'react-native';

global.self = global;


export default class App extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Homepage
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

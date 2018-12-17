import React, { Component } from 'react';
import HeroImageCarousel from './components/HeroImageCarousel.js';
import PaginatedHomepage from './components/PaginatedHomepage.js';
import DinosaurPaginationHomepage from './components/DinosaurPaginationHomepage.js';
import { StyleSheet, Text, View } from 'react-native';

global.self = global;


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DinosaurPaginationHomepage/>
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

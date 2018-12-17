import React, { Component } from 'react';
import HeroImageCarousel from './components/HeroImageCarousel.js';
import PaginatedHomepage from './components/PaginatedHomepage.js';
import { StyleSheet, Text, View } from 'react-native';

global.self = global;


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PaginatedHomepage/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

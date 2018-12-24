import React, { Component } from 'react';
import Homepage from './components/Homepage.js';
import { StyleSheet, Text, View } from 'react-native';
import AppStyle from './Stylesheets/AppStyle.js';

global.self = global;


export default class App extends React.Component {


  render() {
    return (
      <View style={AppStyle.container}>
        <Homepage
        />
      </View>
    );
  }
}

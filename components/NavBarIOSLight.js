import React, { Component } from 'react'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import {StyleSheet} from 'react-native';

export default class NavBarIOSLight extends Component {
  render() {
    return (
      <NavBar style={styles}>
        <NavButton onPress={this.props.home}>
          <NavButtonText style={styles.buttonText}>
            {"Main"}
          </NavButtonText>
        </NavButton>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText style={styles.buttonText}>
            {"Button"}
          </NavButtonText>
        </NavButton>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText style={styles.buttonText}>
            {"Button"}
          </NavButtonText>
        </NavButton>
      </NavBar>
    )
  }
}

const styles = StyleSheet.create({
 statusBar: {
   backgroundColor: 'black',
   height: 20
 },
 navBar: {
   backgroundColor: 'black',
   height: 40
 },
 title: {
   color: '#fff',
 },
 buttonText: {
   color: '#b5b5b5',
 },
})

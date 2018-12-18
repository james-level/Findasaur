import React, { Component } from 'react';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'

export default class NavBarAndroidLight extends Component {
  render() {
    return (
      <NavBar>

        <NavGroup>
          <NavButton onPress={this.props.home}>
            <NavButtonText>
              {"Main"}
            </NavButtonText>
            </NavButton>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Button"}
            </NavButtonText>
              </NavButton>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Button"}
            </NavButtonText>
              </NavButton>
        </NavGroup>
      </NavBar>
    )
  }
}

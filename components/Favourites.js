import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';

import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';

export default class Favourites extends Component {
  render() {

    retrieveFavourites = async () => {
      try {
        const value = await AsyncStorage.getItem('dinosaur');
        if (value !== null) {
          // We have data!!
          console.log(value);
          return value;
        }
       } catch (error) {
         // Error retrieving data
       }
    }

    renderFavourites(){
      favourite = this.retrieveFavourites();

      return
      <Text> {favourite} <Text>
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

        <LinearGradient
        colors={['black', '#1e932d']}
        style={{ padding: 25 }}>

          <View style={InfoModalStyle.infoModal}>

          {this.renderFavourites()}


            </View>
          </LinearGradient>
        </View>
      </Modal>

    </View>
    )
  }
}

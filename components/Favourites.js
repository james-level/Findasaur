import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';

export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourite: null
    };
  }

  retrieveFavourites(){
      AsyncStorage.getItem('dinosaur').then((value) => {
        return JSON.parse(value)
      }).catch((error) => {
        var text = <Text style={{color: 'white'}}> {JSON.parse(value)} </Text>
        console.log(error)
       }
     )
      }

  renderFavourites(value){
    return   <Text> value </Text>
  }

  render() {

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.favouritesVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

        <LinearGradient
        colors={['black', '#1e932d']}
        style={{ padding: 25 }}>

          <View style={InfoModalStyle.infoModal}>

          <Text> {this.retrieveFavourites()} </Text>


            </View>
          </LinearGradient>
        </View>
      </Modal>

    </View>
    )
  }
}

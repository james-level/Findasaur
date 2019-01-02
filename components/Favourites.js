import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

import FavouritesStyle from '../Stylesheets/FavouritesStyle.js';

export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourites: null
    };
  }

  componentDidMount(){
    this.retrieveFavourites()
  }

  retrieveFavourites(){
      AsyncStorage.getItem('favios').then((value) => {
        this.setState({
          favourites: value
        })
      }).catch((error) => {
        console.log(error)
       }
     )
      }

  renderFavourites(){

    var favourites = JSON.parse(this.state.favourites);

    return favourites.map((favourite, i) =>
      <View key={i} style={FavouritesStyle.modalHeader}>
        <Text key={i} style={FavouritesStyle.modalFavourite}> {favourite} </Text>
      </View>
    )
  }

  render() {

    var self = this;

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

          <View style={FavouritesStyle.favouritesModal}>
            <ScrollView>

            <Text style={FavouritesStyle.favouritesModalHeader}> Favourites </Text>

          {
            this.state.favourites ? (
              self.renderFavourites()
             ) : null
        }

        <TouchableHighlight
          onPress={() => {
            this.props.setFavouritesVisible();
          }}>
        <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
        </TouchableHighlight>

        </ScrollView>

            </View>
          </LinearGradient>
        </View>
      </Modal>

    </View>
    )
  }
}

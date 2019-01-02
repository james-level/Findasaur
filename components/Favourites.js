import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

import FavouritesStyle from '../Stylesheets/FavouritesStyle.js';

export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourite: null
    };
  }

  componentDidMount(){
    this.retrieveFavourites()
  }

  retrieveFavourites(){
      AsyncStorage.getItem('dinosaur').then((value) => {
        console.log(value);
        this.setState({
          favourite: value
        })
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

          <View style={FavouritesStyle.favouritesModal}>
            <ScrollView>

            <Text style={FavouritesStyle.favouritesModalHeader}> Favourites </Text>

          {
            this.state.favourite ? (
              <View style={FavouritesStyle.modalHeader}>
              <Text style={FavouritesStyle.modalFavourite}> {this.state.favourite} </Text>
              </View>
             ) : null
        }

        </ScrollView>

            </View>
          </LinearGradient>
        </View>
      </Modal>

    </View>
    )
  }
}

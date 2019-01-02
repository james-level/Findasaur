import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"
import FavouriteModal from './FavouriteModal.js';
import FavouritesStyle from '../Stylesheets/FavouritesStyle.js';

export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourites: null,
      favouriteModalVisible: false
    };
    this.toggleFavouriteModal = this.toggleFavouriteModal.bind(this);
  }

  componentDidMount(){
    this.retrieveFavourites()
  }

  toggleFavouriteModal(){
    this.setState({
      favouriteModalVisible: !this.state.favouriteModalVisible
    })
  }

  retrieveFavourites(){
      AsyncStorage.getItem('favvs').then((value) => {
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
      <TouchableOpacity onPress={() => this.setState({clickedFavourite: favourites[i]}, function(){ this.toggleFavouriteModal() })} key={i}>
        <Text key={i} style={FavouritesStyle.modalFavourite}> {favourite.name} </Text>
      </TouchableOpacity>
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

        <FavouriteModal clickedFavourite={this.state.clickedFavourite} favouriteModalVisible={this.state.favouriteModalVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.state.fontLoaded} />

            </View>
          </LinearGradient>
        </View>
      </Modal>

    </View>
    )
  }
}

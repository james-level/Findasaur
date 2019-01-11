import React, { Component } from 'react'
import { Alert, Modal,Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"
import FavouriteModal from './FavouriteModal.js';
import FavouritesStyle from '../Stylesheets/FavouritesStyle.js';
import * as ImageFinder from './ImageFinder.js'

export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  findDinosaurObject(dinosaurs, name){
    for (dinosaur of dinosaurs){
      if (dinosaur.name === name){
        return dinosaur;
      }
    }
  }

  deleteFavourite(dinoToDelete){
    AsyncStorage.getItem('dinosaur_favourites').then((dinos) => {
      var dinos = JSON.parse(dinos);
      var dinoObjectToDelete = this.findDinosaurObject(dinos, dinoToDelete.name);
      var index = dinos.indexOf(dinoObjectToDelete);
      dinos.splice(index, 1)
      console.log("Dino to delete", dinoObjectToDelete);
      AsyncStorage.setItem('dinosaur_favourites', JSON.stringify(dinos)).then((dinos) => {
        AsyncStorage.getItem('dinosaur_favourites').then((dinos) => {
          this.setState({
            favourites: dinos
          }, function(){
            if (JSON.parse(dinos).length === 0){
              this.setState({
                favourites: null
              })
            }
          })
        }).catch((error) => {
          console.log(error)
         }
        )
      }).catch((error) => {
        console.log(error)
       }
      )
        Alert.alert(
               `${dinoToDelete.name} has been deleted from your favourites.`
            )
    }).catch((error) => {
      console.log(error)
  }
)
}

  retrieveFavourites(){
      AsyncStorage.getItem('dinosaur_favourites').then((dinos) => {
        this.setState({
          favourites: dinos
        }, function(){
          if (dinos){
          if (JSON.parse(dinos).length === 0){
            this.setState({
              favourites: null
            })
          }
          }
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
        <Text key={i} style={[FavouritesStyle.modalFavourite, {fontFamily: 'PoiretOne-Regular'}]}> {favourite.name} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.setState({deletedFavourite: favourites[i]}, function(){ this.deleteFavourite(this.state.deletedFavourite) })} key={Date.now()}>
        <Text key={Date.now()} style={[FavouritesStyle.deleteFavourite, {fontFamily: 'PoiretOne-Regular'}]}> Delete </Text>
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

          {
            this.props.fontLoaded ? (


          <View>

        <LinearGradient
        colors={['#1D976C', '#93F9B9']}
        style={{ height: Dimensions.get('window').height, padding: 25 }}>

          <View style={FavouritesStyle.favouritesModal}>
            <ScrollView>


            <Text style={[FavouritesStyle.favouritesModalHeader, {fontFamily: 'PoiretOne-Regular'}]}>Your Favourite Dinosaurs: </Text>

            <View style={{alignItems: "center"}}>
              <Image source={require('../assets//Dino_images/runningdino.gif')} style={{height: 100, width: 200, padding:20 }}/>
            </View>

          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={[FavouritesStyle.favouritesText, , {fontFamily: 'PoiretOne-Regular'}]}>Oh no! Your favourites are currently empty. Find dinosaurs in the app and click the ⭐️ to add them to this list. </Text>
        }

        <TouchableHighlight
          onPress={() => {
            this.props.setFavouritesVisible();
          }}>
        <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 3, marginTop: 30, marginLeft: '50%'}}/>
        </TouchableHighlight>

        </ScrollView>

        <FavouriteModal clickedFavourite={this.state.clickedFavourite} favouriteModalVisible={this.state.favouriteModalVisible} toggleFavouriteModal={this.toggleFavouriteModal} fontLoaded={this.state.fontLoaded} />

            </View>
          </LinearGradient>
        </View>

      ) : null

    }

      </Modal>

    </View>
    )
  }
}

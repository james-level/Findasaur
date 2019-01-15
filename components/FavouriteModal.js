import React, { Component } from 'react'
import { Alert, Dimensions, FlatList, ScrollView, Image, TouchableHighlight, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import FavouriteModalStyle from '../Stylesheets/FavouriteModalStyle.js';
import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import * as ImageFinder from './ImageFinder.js'
import * as Pronunciations from './Pronunciations.js'
import * as Meanings from './Meanings.js'
import * as Types from './Types.js'
import * as Lengths from './Lengths.js'

export default class FavouriteModal extends Component {
  render() {

    var self = this;

    return (

      <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.favouriteModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>

        <View>

      <LinearGradient
      colors={['black', 'black']}
      style={{ height: Dimensions.get('window').height, padding: 25}}>

        <View style={FavouriteModalStyle.infoModal}>

        {

          this.props.clickedFavourite ? (

            <ScrollView>

            <TouchableHighlight
              onPress={() => {
                this.props.toggleFavouriteModal();
              }}>
            <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginTop: 20, marginBottom: 20, marginLeft: '48%'}}/>
            </TouchableHighlight>

            <View style={{alignItems: "center", marginBottom: 15}}>

            <AutoHeightImage
              width={Dimensions.get('window').width*0.9}
              source={{uri: `${this.props.clickedFavourite.image}`}}
            />

            {
                ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/omnivore.png") ? (

                <View style={FavouriteModalStyle.modalHeader}>

                <Text style={FavouriteModalStyle.infoModalHeader}>{this.props.clickedFavourite.name}</Text>
                <Image source={ ImageFinder.getDietImage(this.props.clickedFavourite.diet) } style={{width: 65, height: 20, marginTop: 10, marginRight: 20}}/>
                </View>
            ) :

/* Faves Modal, Fave Dino name */
            <View style={FavouriteModalStyle.modalHeader}>
              <Text style={[FavouriteModalStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}>Name: {this.props.clickedFavourite.name}
              </Text>
            </View>
            }

/* Faves Modal, Fave Dino diet icon */
            <View style={FavouriteModalStyle.modalHeader}>
              <Text style={[FavouriteModalStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}>Diet:
                <Image source={ ImageFinder.getDietImage(this.props.clickedFavourite.diet)} style={{}}/>
              </Text>
            </View>

{/* Faves Modal, Fossil Map Link*/}
            <View style={FavouriteModalStyle.modalHeader}>
                <Text onPress={this.setFossilMapVisible}  style={[FavouriteModalStyle.modalMapLink, {fontFamily: 'PoiretOne-Regular'}]}>Fossil Map: 🌎<Image source={"./assets/icons/globesmall.png"} style={{width: 30, height: 30 }}/>
                </Text>
              </View>

/* Faves Modal, Dino-Era (text) */
            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}>Lived during the {this.props.clickedFavourite.era}</Text>
            </View>

            {
/* Faves Modal, Dino Pronunciation & Meaning (text) */
              this.props.clickedFavourite.pronunciation ? (

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}>Pronounced: '{this.props.clickedFavourite.pronunciation}'
            </Text>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}>Meaning: {this.props.clickedFavourite.meaning}
            </Text>
            </View>

          ) : null

          }

          {
/* Faves Modal, Dino Length & Type (Text)*/
            this.props.clickedFavourite.length ? (

          <View style={FavouriteModalStyle.modalHeader}>
          <Text style={[FavouriteModalStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}>Length: {this.props.clickedFavourite.length}
          </Text>
          <Text style={[FavouriteModalStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}>Type: {this.props.clickedFavourite.type}
          </Text>
          </View>

        ) : null

        }

        {

        ImageFinder.findSizeComparisonImage(this.props.clickedFavourite.name) ? (

            <AutoHeightImage width={Dimensions.get('window').width*1.0} style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.props.clickedFavourite.name)}/>

          ) : null
        }
/* Results Modal, Dino Description */
            <Text style={[FavouriteModalStyle.infoModalText, {fontFamily: 'PoiretOne-Regular'}]}>Description: {this.props.clickedFavourite.description}
              </Text>

            </View>

            <TouchableHighlight
              onPress={() => {
                this.props.toggleFavouriteModal();
              }}>
            <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginTop: 20, marginBottom: 20, marginLeft: '48%'}}/>
            </TouchableHighlight>

              </ScrollView>
            ) : null

          }
            </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>

    )
  }
}

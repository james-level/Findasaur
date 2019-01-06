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
      colors={['black', '#1e932d']}
      style={{ padding: 25 }}>

        <View style={FavouriteModalStyle.infoModal}>

        {

          this.props.clickedFavourite ? (

            <ScrollView>

            <TouchableHighlight
              onPress={() => {
                this.props.toggleFavouriteModal();
              }}>
            <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginTop: 10, marginBottom: 10, marginLeft: '92%'}}/>
            </TouchableHighlight>

            <View style={{alignItems: "center"}}>

            <AutoHeightImage
              width={300}
              source={{uri: `${this.props.clickedFavourite.image}`}}
            />

            {
                ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/omnivore.png") ? (

                <View style={FavouriteModalStyle.modalHeader}>

                <Text style={FavouriteModalStyle.infoModalHeader}>{this.props.clickedFavourite.name}</Text>
                <Image source={ ImageFinder.getDietImage(this.props.clickedFavourite.diet) } style={{width: 65, height: 20, marginTop: 10, marginRight: 20}}/>
                </View>
            ) :

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={FavouriteModalStyle.infoModalHeader}>{this.props.clickedFavourite.name}</Text>
            <Image source={ ImageFinder.getDietImage(this.props.clickedFavourite.diet) } style={{width: 30, height: 20, marginTop: 10, marginRight: 20}}/>
            </View>

            }

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={FavouriteModalStyle.modalPronunciation}>Lived during the {this.props.clickedFavourite.era}</Text>
            </View>

            {

              this.props.clickedFavourite.pronunciation ? (

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={FavouriteModalStyle.modalPronunciation}>{this.props.clickedFavourite.pronunciation} | {this.props.clickedFavourite.meaning}</Text>
            </View>

          ) : null

          }

          {

            this.props.clickedFavourite.length ? (

          <View style={FavouriteModalStyle.modalHeader}>
          <Text style={FavouriteModalStyle.modalPronunciation}>Length: {this.props.clickedFavourite.length} | Type: {this.props.clickedFavourite.type}</Text>
          </View>

        ) : null

        }

            <Image style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.props.clickedFavourite.name)}/>

            <Text style={FavouriteModalStyle.infoModalText}>{this.props.clickedFavourite.description} </Text>

            </View>

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

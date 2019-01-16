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
import FossilMap from './FossilMap.js';

export default class FavouriteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fossilMapVisible: false
    }

    this.setFossilMapVisible = this.setFossilMapVisible.bind(this);
    this.closeFossilMap = this.closeFossilMap.bind(this);

  }


  setFossilMapVisible(){
    this.setState({
      fossilMapVisible: true
    },
  function(){
    this.props.toggleFavouriteModal()
  })
  }

  closeFossilMap(){
    this.setState({
      fossilMapVisible: false
    },
  function(){
    this.props.toggleFavouriteModal()

  })
  }

  getDietTextFromImageName(){

    if (ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/omnivore.png")){
      return "Omnivore"
    }
    else if (ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/carnivore.png")){
      return "Carnivore"
    }
    else if (ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/herbivore.png")){
      return "Herbivore"
    }
    else if (ImageFinder.getDietImage(this.props.clickedFavourite.diet) === require("../assets/icons/diet_unknown.png")){
      return "Research inconclusive"
    }
    else {
      return
    }

  }

  render() {

    var self = this;

    return (

      <View>

      {
        this.props.clickedFavourite ? (

        <FossilMap mappedDinosaur={this.props.clickedFavourite} fossilMapVisible={this.state.fossilMapVisible} closeFossilMap={this.closeFossilMap} />

      ) : null

    }

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

        <TouchableHighlight
        style={{alignItems: 'center'}}
          onPress={() => {
            this.props.toggleFavouriteModal();
          }}>
        <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginTop: 20, marginBottom: 20}}/>
        </TouchableHighlight>

        {

          this.props.clickedFavourite ? (

            <ScrollView>

            <View style={{alignItems: "center", marginBottom: 15}}>

            <AutoHeightImage
              width={Dimensions.get('window').width*0.9}
              source={{uri: `${this.props.clickedFavourite.image}`}}
            />

/* Faves Modal, Fave Dino name */
            <View style={FavouriteModalStyle.modalHeader}>
              <Text style={[FavouriteModalStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Name: </Text>{this.props.clickedFavourite.name}
              </Text>
            </View>


            {
/* Faves Modal, Dino Pronunciation (text) */
              this.props.clickedFavourite.pronunciation ? (

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Pronounced: </Text> '{this.props.clickedFavourite.pronunciation}'
            </Text>
            </View>

          ) : null

          }

            {

            /* Faves Modal, Dino name Meaning (text) */

            this.props.clickedFavourite.meaning ? (

            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Meaning: </Text> {this.props.clickedFavourite.meaning}
            </Text>
            </View>

          ) : null

          }

          {
  /* Faves Modal, Dino Type (Text)*/
            this.props.clickedFavourite.type ? (

          <View style={FavouriteModalStyle.modalHeader}>
          <Text style={[FavouriteModalStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Type: </Text>{this.props.clickedFavourite.type}
          </Text>
          </View>

        ) : null

      }

/* Faves Modal, Fave Dino diet icon */
          {
            ImageFinder.getDietImage(this.props.clickedFavourite.diet) != require("../assets/icons/diet_unknown.png") ? (

            <View style={FavouriteModalStyle.modalHeader}>
              <Text style={[FavouriteModalStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.getDietTextFromImageName()}<Text style={{color: 'black'}}>::::: </Text>
                <Image source={ ImageFinder.getDietImage(this.props.clickedFavourite.diet)} style={{}}/>
              </Text>
            </View>

          ) :

          <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.getDietTextFromImageName()}
            </Text>
          </View>

        }

{/* Faves Modal, Fossil Map Link*/}
            <View style={FavouriteModalStyle.modalHeader}>
                <Text onPress={this.setFossilMapVisible}  style={[FavouriteModalStyle.modalMapLink, {fontFamily: 'PoiretOne-Regular'}]}>View Fossil Map: <Image source={require("../assets/icons/globesmall.png")} style={{width: 20, height: 20 }}/>
                </Text>
              </View>

/* Faves Modal, Dino-Era (text) */
            <View style={FavouriteModalStyle.modalHeader}>
            <Text style={[FavouriteModalStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Era: </Text>{this.props.clickedFavourite.era}</Text>
            </View>

          {
/* Faves Modal, Dino Length (Text)*/
            this.props.clickedFavourite.length ? (

          <View style={FavouriteModalStyle.modalHeader}>
          <Text style={[FavouriteModalStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Length: </Text>{this.props.clickedFavourite.length}
          </Text>
          </View>

        ) : null

        }

        {

        ImageFinder.findSizeComparisonImage(this.props.clickedFavourite.name) ? (

            <AutoHeightImage width={Dimensions.get('window').width*1.0} style={{marginTop:20, marginBottom: 20}} source={ImageFinder.findSizeComparisonImage(this.props.clickedFavourite.name)}/>

          ) : null
        }
/* Results Modal, Dino Description */
          <View style={FavouriteModalStyle.modalDescription}>
            <Text style={[FavouriteModalStyle.infoModalText, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Description: </Text>{this.props.clickedFavourite.description}
              </Text>
            </View>

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

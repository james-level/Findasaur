import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';

import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';

export default class FavouriteModal extends Component {
  render() {
    return (
      {
        self.state.searchedDinosaurData ? (

      <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.dinosaurViewVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View>

      <LinearGradient
      colors={['black', '#1e932d']}
      style={{ padding: 25 }}>

        <View style={DinoListViewStyle.infoModal}>

            <ScrollView>

            {
              self.state.searchDataLoading ? (
                <View style={{height: 200}}>
                  < BallIndicator count={7} size={65} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
                </View>
            ) :

            <View style={{alignItems: "center"}}>
            <TouchableHighlight
              onPress={() => {
                this.addDinosaurToFavourites();
                }}>
                  <Image source={require('../assets/icons/favourite.png')} style={{height: 25, width: 25, marginBottom: 10, position: 'relative'}}/>
            </TouchableHighlight>

            <AutoHeightImage
              width={300}
              source={{uri: `${this.state.searchedDinosaurImage}`}}
            />

            {
              ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/omnivore.png") ? (

                <View style={DinoListViewStyle.modalHeader}>

                <Text style={DinoListViewStyle.infoModalHeader}>{this.returnClickedDinosaur()}</Text>
                <Image source={ ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 65, height: 20, marginTop: 10, marginRight: 20}}/>
                </View>
            ) :

            <View style={DinoListViewStyle.modalHeader}>
            <Text style={DinoListViewStyle.infoModalHeader}>{this.returnClickedDinosaur()}</Text>
            <Image source={ ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 30, height: 20, marginTop: 10, marginRight: 20}}/>
            </View>

            }

            {

              Pronunciations.getPronunciation(this.returnClickedDinosaur()) ? (

            <View style={DinoListViewStyle.modalHeader}>
            <Text style={DinoListViewStyle.modalPronunciation}>{Pronunciations.getPronunciation(this.returnClickedDinosaur())} | {Meanings.getNameMeaning(this.returnClickedDinosaur())}</Text>
            </View>

          ) : null

          }

          {

            Lengths.getLength(this.returnClickedDinosaur()) ? (

          <View style={DinoListViewStyle.modalHeader}>
          <Text style={DinoListViewStyle.modalPronunciation}>Length: {Lengths.getLength(this.returnClickedDinosaur())} | Type: {Types.getType(this.returnClickedDinosaur())}</Text>
          </View>

        ) : null

        }

            <Image style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.returnClickedDinosaur())}/>

            <Text style={DinoListViewStyle.infoModalText}>{this.renderDescriptionElements(this.state.searchedDinosaurDescription)} </Text>

            </View>

        }

              <TouchableHighlight
                onPress={() => {
                  this.closeDinosaurView();
                }}>
              <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
              </TouchableHighlight>
              </ScrollView>
            </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>

    ) : null
  }
    )
  }
}

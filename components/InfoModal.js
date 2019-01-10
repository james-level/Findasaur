import React, { Component } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';

import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';

export default class InfoModal extends Component {
  render() {
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
        colors={['#52c1ad', '#52c1ad']}
        style={{ height: Dimensions.get('window').height, padding: 25 }}>

          <View style={InfoModalStyle.infoModal}>

          {
            this.props.fontLoaded ? (

              <ScrollView>
                <Text style= {[InfoModalStyle.infoModalHeading, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>

                  <View style={{alignItems: "center"}}>
                    <Image source={require('../assets/Dino_images/dino.gif')} style={{height: 150, width: 225}}/>
                  </View>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Explore the world of dinosaurs with Findasaur. Search through images and fossil records from prehistoric eras, read about thier diets and see how big the they were compared to you. 🦖</Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>The Tech Stuff: Findasaur utilises three Application Programming Iinbterace's (APIs) - Wikipedia, The Paleobiology Database and Google Maps - to fetch dinosaur data. Dinosaurs are  presented in an address book form with each clickable preview image leads to a modal dino-page with more details. Findasaur also features a predictive search bar and the ability to favourite individual dinosaurs by era. Findasaur sourced additional data for 270 dinosaurs from the Natural History Museum website via Python scraping methods.</Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>The concept behind Findasaur came from an exisitng web app/project ('Findasaurus'), however the conversion to ReactNative is soley that of LevelApp's. The various in-app icons are provided by 'FlatIcons'. Findasaur is not-for-profit project. If you have enjoyed it and want to help - please donate to Wikipedia or one of the data providers - or visit the Natural History Museum to help support thier work. 🦕 </Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur / LevelApps by DJS</Text>
                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>January 2019</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.props.setModalVisible();
                  }}>
                <Image source={require('../assets/icons/back.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
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

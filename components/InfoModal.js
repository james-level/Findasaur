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

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Explore the world of dinosaurs with Findasaur. Search through images & fossil records from seven prehistoric eras,  read about thier diets and compare thier size to you. 🦖</Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>The Tech Stuff: Findasaur utilises three APIs - Wikipedia, The Paleobiology Database and Google Maps (with additional data from the Natural History Museum via a Python scraping method) - to fetch and display dino-data. The dino's are presented in an address book format with each clickable preview leads to a modal dino-page with full info. Findasaur also features a predictive search bar and the ability to favourite individual dinosaurs.</Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>The concept came from an exisitng web app/project ('Findasaurus'), now converted to ReactNative by LevelApps. The various in-app icons are provided by 'FlatIcons'. Findasaur is not-for-profit project. If you have enjoyed it and want to help - please donate to Wikipedia, one of the data providers - or visit the Natural History Museum to help support thier work. 🦕 </Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur / LevelApps</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.props.setModalVisible();
                  }}>
                <Image source={require('../assets/icons/back2.png')} style={{height: 25, width: 25, marginTop: 40, marginBottom: 10, marginLeft: '50%'}}/>
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

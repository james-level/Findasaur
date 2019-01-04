import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';

import InfoModalStyle from '../Stylesheets/InfoModalStyle.js';

export default class EraModal extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.eraModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

        <LinearGradient
        colors={['black', '#1e932d']}
        style={{ padding: 25 }}>

          <View style={InfoModalStyle.infoModal}>

          {
            this.props.fontLoaded ? (

              <ScrollView>
                <Text style= {[InfoModalStyle.infoModalHeading, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                  <View style={{alignItems: "center"}}>
                    <Image source={require('../assets/Dino_images/friendlydino.gif')} style={{height: 150, width: 225}}/>
                  </View>
                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur - an app from 'LevelApps' (<Text style={{fontSize: 17, fontFamily: 'PoiretOne-Regular', color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/jah1603')}>James Henderson</Text><Text style={{fontSize: 17, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/SFR1981')}>, Stephen Rooney</Text> &<Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/DavidAPears')}> David Pears </Text>).<Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}> These three creators can usually be found in an Edinburgh cafe, trying to figure out <Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://www.reactnative.com')}>ReactNative</Text>. All three are potentailly available to hire for your team or project.</Text></Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur looks to educate users about prehistoric animals. It utilises a Wikipedia API to provide information relating to aspects of various dinosaur species, providing data on diet and the location of fossil finds.</Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>The concept behind Findasaur is based on an exisitng web app/project ('Findasaurus'), however the conversion to ReactNative is soley that of James, Stephen and David. The various in-app icons are provided by 'FlatIcons' and 'IonIcons'. Findasaur is a profit free project. If you have enjoyed it and want to help - please donate to Wikipedia, the data providers 🦕 </Text>

                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                <Text style= {[InfoModalStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>January 2019</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.props.setEraModalVisible();
                  }}>
                <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
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

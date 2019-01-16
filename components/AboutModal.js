import React, { Component } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';

import AboutModalStyle from '../Stylesheets/AboutModalStyle.js';

export default class AboutModal extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.aboutModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

        <LinearGradient
        colors={['#a0cac8', '#a0cac8']}
        style={{ height: Dimensions.get('window').height, padding: 25 }}>

          <View style={AboutModalStyle.aboutModal}>

          {
            this.props.fontLoaded ? (

              <ScrollView>

                <Text style= {[AboutModalStyle.aboutModalHeading, { fontFamily: 'PoiretOne-Regular'}]}>LevelApps</Text>

                <View style={{alignItems: "center"}}>
                  <Image source={require('../assets/coffee.gif')} style={{height: 150, width: 225, padding:100 }}/>
                </View>

                <Text style= {[AboutModalStyle.aboutModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur, another app from those talented guys at LevelApps - <Text style={{fontSize: 17, fontFamily: 'PoiretOne-Regular', color: '#2f0f07'}} onPress={()=>Linking.openURL('https://github.com/jah1603')}>James Henderson</Text>,
                <Text style={{fontSize: 18, color: '#2f0f07'}} onPress={()=>Linking.openURL('https://github.com/DavidAPears')}> David Pears</Text><Text style= {[AboutModalStyle.aboutModalText, { fontFamily: 'PoiretOne-Regular'}]}></Text> & <Text style={{fontSize: 17, color: '#2f0f07'}} onPress={()=>Linking.openURL('https://github.com/SFR1981')}>Stephen Rooney.</Text>
                {"\n"}{"\n"}<Text>These three creative developers can usually be found lurking in Edinburgh cafes, trying to figure out all things <Text style={{fontSize: 18, color: '#2f0f07'}} onPress={()=>Linking.openURL('https://www.reactnative.com')}>ReactNative</Text>.{"\n"}
                {"\n"}David, James and Stephen are all (potentially) available for hire for your team or project.</Text></Text>

                <Text style= {[AboutModalStyle.aboutModalText, { fontFamily: 'PoiretOne-Regular'}]}>See more of their work in the <Text style={{fontSize: 17, fontFamily: 'PoiretOne-Regular', color: '#2f0f07'}} onPress={()=>Linking.openURL('https://play.google.com/store/apps/developer?id=LevelApps+by+DJS')}>Google Play Store</Text> or click their names above to visit their GitHub profiles.</Text>

                <Text style= {[AboutModalStyle.aboutModalText, { fontFamily: 'PoiretOne-Regular'}]}>LevelApps</Text>
                <Text style= {[AboutModalStyle.aboutModalText, { fontFamily: 'PoiretOne-Regular'}]}>January 2019</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.props.setAboutModalVisible();
                  }}>
                <Image source={require('../assets/icons/aboutback.png')} style={{height: 40, width: 40, marginBottom: 5, marginLeft: '45%'}}/>
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

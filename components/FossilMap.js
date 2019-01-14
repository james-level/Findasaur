import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FossilMapStyle from '../Stylesheets/FossilMapStyle.js';
import MapView from 'react-native-maps';

export default class FossilMap extends Component {
  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.fossilMapVisible} onClose={this.props.closeFossilMap} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
      childrenWrapperStyle={{backgroundColor: 'black', borderRadius: 15}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <View style={{backgroundColor: 'white', borderRadius: 5, marginTop: 5, borderWidth: 2, borderColor: 'black'}}>
          <Text style={FossilMapStyle.fossilMapDescription}>Fossil finds for {this.props.dinosaur}</Text>
          </View>
              <MapView style={FossilMapStyle.map}
              scrollEnabled={true}
              toolbarEnabled={false}
              zoomEnabled={true}
              zoomControlEnabled={true}
              region={{
                latitude: 23.5505,
                longitude: 46.6333,
                latitudeDelta: 40,
                longitudeDelta: 40
              }}
              >
            </MapView>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

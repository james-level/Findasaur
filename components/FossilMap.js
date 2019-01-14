import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FossilMapStyle from '../Stylesheets/FossilMapStyle.js';
import MapView from 'react-native-maps';

export default class FossilMap extends Component {

  returnDinosaur(){
    return "Fossil finds for " + this.props.dinosaur
  }

  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.fossilMapVisible} onClose={this.props.closeFossilMap} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'transparent'}}
      childrenWrapperStyle={{backgroundColor: 'transparent', borderRadius: 15, height: Dimensions.get('window').height*0.8, width: Dimensions.get('window').width*0.8}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <View style={{backgroundColor: 'green', borderRadius: 5, marginTop: 5, marginBottom: 10, borderWidth: 2, borderColor: 'green'}}>
          <Text style={FossilMapStyle.fossilMapDescription}>{this.returnDinosaur()}</Text>
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

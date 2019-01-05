import React, { Component, Fragment } from 'react'
import { Modal, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import EraOverlayStyle from '../Stylesheets/EraOverlayStyle.js';

export default class EraOverlay extends Component {
  render() {
    return (
      <Overlay visible={this.props.eraModalVisible} onClose={this.props.closeEraModal} closeOnTouchOutside
      animationType="zoomIn" containerStyle={{backgroundColor: 'rgba(8, 10, 37, 0.78)'}}
      childrenWrapperStyle={{backgroundColor: '#00003f', borderRadius: 15}}
      animationDuration={750}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <Text style={EraOverlayStyle.eraOverlayHeader}>{this.props.eraTitle}</Text>
            <Text style={EraOverlayStyle.eraOverlayDescription}>The Late Cretaceous (100.5 to 66 million years ago) is the younger of two epochs into which the Cretaceous period is divided in the geologic timescale. Rock strata from this epoch form the Upper Cretaceous series. The Cretaceous is named after the white limestone known as chalk which occurs widely in northern France and is seen in the white cliffs of south-eastern England, and which dates from this time. </Text>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

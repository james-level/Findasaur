import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import EraOverlayStyle from '../Stylesheets/EraOverlayStyle.js';

export default class GlobalSearch extends Component {
  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.searchOverlayVisible} onClose={this.props.closeSearchOverlay} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(8, 10, 37, 0.78)'}}
      childrenWrapperStyle={{backgroundColor: '#00003f', borderRadius: 15}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <Text style={EraOverlayStyle.eraOverlayHeader}>{this.props.eraTitle}</Text>
            <Text style={EraOverlayStyle.eraOverlayDescription}>{this.props.eraDescription}</Text>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import EraOverlayStyle from '../Stylesheets/EraOverlayStyle.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class AddFavouriteOverlay extends Component {
  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.favouriteOverlayVisible} onClose={this.props.closeFavouriteOverlay} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
      childrenWrapperStyle={{backgroundColor: 'black', borderRadius: 15}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <AutoHeightImage width={Dimensions.get('window').width*0.7} style={{borderRadius: 20}} source={require('../assets/dancingstar.gif')}/>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

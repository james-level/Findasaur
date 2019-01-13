import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FavouriteAnimationOverlayStyle from '../Stylesheets/FavouriteAnimationOverlayStyle.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class AddFavouriteOverlay extends Component {
  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.favouriteOverlayVisible} onClose={this.props.closeFavouriteOverlay} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'transparent'}}
      childrenWrapperStyle={{backgroundColor: 'transparent', borderRadius: 15}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <AutoHeightImage width={Dimensions.get('window').width*0.7} style={{borderRadius: 20}} source={require('../assets/dancingstar.gif')}/>
          <View style={{backgroundColor: 'black', borderRadius: 5, marginTop: 5}}>
          <Text style={FavouriteAnimationOverlayStyle.favouriteOverlayDescription}>New Findasaur favourite added - looks like you're coming up on a full set!</Text>
          </View>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

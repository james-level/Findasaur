import React, { Component, Fragment } from 'react'
import { Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, Asset, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FavouriteAnimationOverlayStyle from '../Stylesheets/FavouriteAnimationOverlayStyle.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class AddFavouriteOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifLoaded: false
    };
  }

  async componentDidMount(){
    await Asset.loadAsync([
         require('../assets/dancingstar.gif'),
       ]);

      this.setState({
        gifLoaded: true
      })
  }

  render() {
    return (
      <Overlay visible={this.props.favouriteOverlayVisible} onClose={this.props.closeFavouriteOverlay} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
      childrenWrapperStyle={{backgroundColor: 'transparent', borderRadius: 15}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          { this.state.gifLoaded === true ? (
          <AutoHeightImage width={Dimensions.get('window').width*0.7} style={{borderRadius: 20}} source={require('../assets/dancingstar.gif')}/>
        ) : null
      }
      { this.state.gifLoaded === true ? (
          <View style={{backgroundColor: 'black', borderRadius: 5, marginTop: 0, borderWidth: 2, borderColor: 'black'}}>
          <Text style={FavouriteAnimationOverlayStyle.favouriteOverlayDescription}>Favourite added!</Text>
          </View>

        ) : null
      }
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

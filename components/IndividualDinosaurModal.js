import React, { Component } from 'react'
import {StyleSheet} from 'react-native';
import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';

export default class IndividualDinosaurModal extends Component {
  render() {
    return (
      <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.dinosaurViewVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View>

      <LinearGradient
      colors={['black', '#1e932d']}
      style={{ padding: 25 }}>

        <View style={DinoListViewStyle.infoModal}>

            <ScrollView>

            {
              this.props.searchDataLoading ? (
                <View style={{height: 200}}>
                  < BallIndicator count={7} size={65} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
                </View>
            ) :

            <View style={{alignItems: "center"}}>
            <AutoHeightImage
              width={300}
              source={{uri: `${this.props.searchedDinosaurImage}`}}
            />

              <Text style={DinoListViewStyle.infoModalText}>{this.props.returnClickedDinosaur} {this.props.searchedDinosaurData.diet}  </Text>

              <Text style={DinoListViewStyle.infoModalText}>{this.props.renderDescriptionElements} </Text>

            </View>

          }

              <TouchableHighlight
                onPress={() => {
                  this.props.closeDinosaurView;
                }}>
              <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
              </TouchableHighlight>
              </ScrollView>
            </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    )
  }
}

import React, { Component } from 'react'
import { ScrollView, Image, TouchableHighlight, Text, TouchableOpacity, View, Modal } from 'react-native';
import IndividualDinosaurModalStyle from '../Stylesheets/IndividualDinosaurModalStyle.js';
import { BallIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo';

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

        <View style={IndividualDinosaurModalStyle.infoModal}>

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

              <Text style={DinoListViewStyle.infoModalText}>{this.props.returnClickedDinosaur()} {this.props.searchedDinosaurData.diet}  </Text>

        

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

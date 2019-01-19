import React, { Component } from 'react'
import { Modal, Dimensions, Platform, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import * as ImageFinder from './ImageFinder.js'
import * as Pronunciations from './Pronunciations.js'
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import * as Meanings from './Meanings.js'
import * as Types from './Types.js'
import * as Lengths from './Lengths.js'
import FossilMap from './FossilMap.js'
import AutoHeightImage from 'react-native-auto-height-image';

import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';

export default class ViewDinosaurModal extends Component {
  render() {
    var self = this;
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
      colors={['black', 'black']}
      style={{ padding: 25, height: Dimensions.get('window').height }}>

        <View style={DinoListViewStyle.infoModal}>

            <ScrollView>

            {
              self.props.searchDataLoading || !self.props.searchedDinosaurImage ? (
                <View style={{height: Dimensions.get('window').height}}>
                  < BallIndicator count={7} size={80} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
                </View>
            ) :

            <View style={{alignItems: "center", marginBottom: 15}}>

            {this.props.newFavouriteAdded || this.props.clickedDinoAlreadyFavourite === true ? (

            <View style={{borderRadius: 25, justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 10}}>
            <Text style={{paddingTop: 15, fontSize: 22, marginRight: 15, color: 'yellow', fontFamily: 'PoiretOne-Regular', padding: 10}}>Favourite</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.addDinosaurToFavourites();
                }}>
                  <Image source={require('../assets/icons/star.png')} style={{height: 30, width: 30, marginRight: 7, marginBottom: 10, marginTop: 10, position: 'relative'}}/>
            </TouchableHighlight>
            </View>

          ) :
          <View style={{borderRadius: 25, justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 10}}>
          <Text
            style={{
              paddingTop: 15,
              fontSize: 22,
              marginRight: 15,
              color: 'limegreen',
              fontFamily: 'PoiretOne-Regular',
              padding: 10,
              paddingTop: 20 }}
              >Add to Favourites
          </Text>
          <TouchableHighlight
            onPress={() => {
              this.props.addDinosaurToFavourites();
              }}>
                <Image
                source={require('../assets/icons/grey_star.png')} style={{
                  height: 30,
                  width: 30,
                  marginRight: 7,
                  marginBottom: 10,
                  marginTop: 10,
                  position: 'relative'
              }}/>
          </TouchableHighlight>
          </View>
        }

            {

              self.props.addressBookImage && self.props.addressBookImageWidth && self.props.addressBookImageHeight ? (


            <Image
              style={{width: this.props.addressBookImageWidth, height: this.props.addressBookImageHeight}}
              source={{uri: `${this.props.addressBookImage}`}} onLoad={this.props.onDinosaurProfilePictureLoad}
            />

            ) : null
          }

          {
            self.props.imagesLoading ? (

              <View style={{height: Dimensions.get('window').height*0.12}}>
                <DotIndicator count={5} size={10} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
              </View>

            ) : null

          }

            {
              ImageFinder.getDietImage(this.props.searchedDinosaurData.diet) === require("../assets/icons/omnivore.png") ? (


                <View style={DinoListViewStyle.modalHeader}>
                <Text style={[DinoListViewStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Name: </Text>{this.props.returnClickedDinosaur}
                </Text>
                </View>
            ) :


            <View style={DinoListViewStyle.modalHeader}>
              <Text style={[DinoListViewStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Name: </Text>{this.props.returnClickedDinosaur}
              </Text>
            </View>
            }


                  {
                      Meanings.getNameMeaning(this.props.returnClickedDinosaur) ? (

                      <View style={DinoListViewStyle.modalHeader}>

                      <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Meaning: </Text>{Meanings.getNameMeaning(this.props.returnClickedDinosaur)}
                      </Text>

                      </View>

                    ) : null
                    }


                    {

                  Pronunciations.getPronunciation(this.props.returnClickedDinosaur) ? (

                    <View style={DinoListViewStyle.modalHeader}>
                      <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Pronunciation: </Text>{Pronunciations.getPronunciation(this.props.returnClickedDinosaur)}
                      </Text>
                    </View>

                  ) : null
                  }

                  {
                    Types.getType(this.props.returnClickedDinosaur) ? (
                      <View style={DinoListViewStyle.modalHeader}>
                      <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Type: </Text>
                      {Types.getType(this.props.returnClickedDinosaur)}
                      </Text>
                      </View>

                    ) : null

                  }



                                  {
                                    Platform.OS === 'ios' && ImageFinder.getDietImage(this.props.searchedDinosaurData.diet) != require("../assets/icons/diet_unknown.png") ? (

                                        <View style={DinoListViewStyle.modalHeader}>
                                          <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.props.getDietTextFromImageName}<Text style={{color: 'black'}}>::::: </Text> <Image source={ ImageFinder.getDietImage(this.props.searchedDinosaurData.diet)}/>
                                          </Text>
                                        </View>

                                      )  :

                                    null

                                      }

                                      {

                                      Platform.OS === 'ios' && ImageFinder.getDietImage(this.props.searchedDinosaurData.diet) == require("../assets/icons/diet_unknown.png")  ? (

                                      <View style={DinoListViewStyle.modalHeader}>
                                        <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.props.getDietTextFromImageName}</Text>
                                        </Text>
                                      </View>

                                    ) : null

                                  }
                      }

                      {
                        Platform.OS === 'android' && ImageFinder.getDietImage(this.props.searchedDinosaurData.diet) != require("../assets/icons/diet_unknown.png") ? (

                            <View style={DinoListViewStyle.modalHeader}>
                              <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.props.getDietTextFromImageName}
                              </Text>
                            </View>

                          )  :

                        null

                          }


                          {
                            Platform === 'android' ? (

                            <View style={DinoListViewStyle.modalHeader}>
                              <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.props.getDietTextFromImageName}</Text>
                              </Text>
                            </View>

                          ) : null

                        }


                    {
                      Platform.OS === 'ios' ? (
                  <View style={DinoListViewStyle.modalHeader}>
                    <Text onPress={this.props.setFossilMapVisible} style={[DinoListViewStyle.modalMapLink, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>View Fossil Map: </Text><Image source={require("../assets/icons/globesmall.png")} style={{width: 20, height: 20 }}/>
                    </Text>
                  </View>
                ) :

                <View style={DinoListViewStyle.modalHeader}>
                  <Text onPress={this.props.setFossilMapVisible} style={[DinoListViewStyle.modalMapLink, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>View Fossil Map: 🌏
                  </Text>
                  </Text>
                </View>

              }

          {

          Lengths.getLength(this.props.returnClickedDinosaur) ? (

          <View style={DinoListViewStyle.modalHeader}>
              <Text style={[DinoListViewStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Length: </Text>{Lengths.getLength(this.props.returnClickedDinosaur)}
              </Text>
          </View>

        ) : null

        }


        {
          ImageFinder.findSizeComparisonImage(this.props.returnClickedDinosaur) ? (

        <AutoHeightImage width={Dimensions.get('window').width*1.0} style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.props.returnClickedDinosaur)}/>

      ) : null

    }

    {this.props.searchedDinosaurData != null ? (

      <FossilMap mappedDinosaur={this.props.searchedDinosaurData} fossilMapVisible={this.props.fossilMapVisible} closeFossilMap={this.props.closeFossilMap} dinosaur={this.props.dinosaurClicked} />

    ) : null

  }

        {
          self.props.searchedDinosaurDescription ? (

      <View style={DinoListViewStyle.modalHeader}>
        <Text style={[DinoListViewStyle.infoModalText, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Description: </Text>{this.props.renderDescriptionElements(this.props.searchedDinosaurDescription)}
        </Text>
      </View>

          ) : null
        }

          </View>

        }
        <TouchableHighlight
  onPress={() => {
      this.props.closeDinosaurView();
      }}>
        <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
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

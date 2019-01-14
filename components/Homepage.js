import React, { Component } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View, Linking, Image, TouchableHighlight, Modal, ScrollView, ImageBackground } from 'react-native';
import { Font, Asset, LinearGradient  } from 'expo';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import HomepageStyle from '../Stylesheets/HomepageStyle.js';
import ChooseTimePeriod from './ChooseTimePeriod.js';
import InfoModal from './InfoModal.js';
import AboutModal from './AboutModal.js';
import Favourites from './Favourites.js';
import ExploreButton from './ExploreButton.js';
import HeroImageCarousel from './HeroImageCarousel.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      fontLoaded: false,
      modalVisible: false,
      favouritesVisible: false,
      aboutModalVisible: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setFavouritesVisible = this.setFavouritesVisible.bind(this);
    this.setAboutModalVisible = this.setAboutModalVisible.bind(this);
  }

  async componentDidMount() {

  await Font.loadAsync({
     'PoiretOne-Regular': require('../assets/fonts/PoiretOne-Regular.ttf'),
   });
   await Asset.loadAsync([
        require('../assets/dancingstar.gif'),
      ]);
    this.setState({ fontLoaded: true });
  }
    handleButtonClick(){
      this.setState({
      buttonClicked: !this.state.buttonClicked
    })
  }

  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  setFavouritesVisible() {
  this.setState({favouritesVisible: !this.state.favouritesVisible});
  }

  setAboutModalVisible() {
  this.setState({aboutModalVisible: !this.state.aboutModalVisible});
  }

  render() {

  if (this.state.buttonClicked === false){

    return (
      <SafeAreaView style={HomepageStyle.container}>

{/* 'APP TITLE' SECTION*/}
      <View style={HomepageStyle.content1}>
      {
        this.state.fontLoaded ? (
        <Text style= {[HomepageStyle.contentText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
        ) : null
    }
      </View>

{/* 'IMAGE CAROUSEL' SECTION*/}
    <HeroImageCarousel />

      <ExploreButton fontLoaded={this.state.fontLoaded} handleButtonClick={this.handleButtonClick} />


{/* 'INFO' MODAL SECTION*/}
  <InfoModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} fontLoaded={this.state.fontLoaded} />

{/* 'FAVOURITE' MODAL SECTION*/}
  <Favourites favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.state.fontLoaded} />

{/* 'ABOUT' MODAL SECTION*/}
  <AboutModal aboutModalVisible={this.state.aboutModalVisible} setAboutModalVisible={this.setAboutModalVisible} fontLoaded={this.state.fontLoaded} />


    <View style={HomepageStyle.iconsContainer}>

          {/* USER FAVOURITE MODAL LAUNCH */}
          <TouchableHighlight
            onPress={() => {
              this.setFavouritesVisible();
              }}>
                <Image source={require('../assets/icons/favourite.png')} style={{height: 25, width: 25, marginBottom: 10, marginRight: 20, position: 'relative'}}/>
          </TouchableHighlight>

          {/* INFO RE APP MODAL LAUNCH  */}
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible();
              }}>
                <Image source={require('../assets/icons/info2.png')} style={{height: 25, width: 25, marginBottom: 10, marginRight: 20, position: 'relative'}}/>
          </TouchableHighlight>

          {/* ABOUT US MODEL LAUNCH */}
          <TouchableHighlight
            onPress={() => {
              this.setAboutModalVisible();
              }}>
                <Image source={require('../assets/icons/aboutus.png')} style={{height: 25, width: 25, marginBottom: 10, marginRight: 20, position: 'relative'}}/>
          </TouchableHighlight>

        </View>

  </SafeAreaView>

    );
  }

  else {

    return (
      <ChooseTimePeriod home={this.handleButtonClick} fontLoaded={this.state.fontLoaded}
      />

    )
  }
  }
}

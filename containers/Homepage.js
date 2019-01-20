import React, { Component } from 'react';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, Dimensions, View, Linking, Image, TouchableHighlight, Modal, ScrollView, ImageBackground } from 'react-native';
import { Font, Asset, LinearGradient  } from 'expo';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import HomepageStyle from '../Stylesheets/HomepageStyle.js';
import ChooseTimePeriod from './ChooseTimePeriod.js';
import InfoModal from '../components/InfoModal.js';
import AboutModal from '../components/AboutModal.js';
import Favourites from './Favourites.js';
import ExploreButton from '../components/ExploreButton.js';
import HeroImageCarousel from '../components/HeroImageCarousel.js';
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
        require('../assets/Dino_images/dino.gif'),
        require('../assets/Dino_images/friendlydino.gif'),
        require('../assets/Dino_images/greendino.gif'),
        require('../assets/Dino_images/runningdino.gif'),
        require('../assets/blackfootbutton.png'),
        require('../assets/coffee.gif'),
        require('../assets/globe.png'),
        require('../assets/globegrey.png'),

        require('../assets/icons/aboutback.png'),
        require('../assets/icons/aboutus.png'),
        require('../assets/icons/back.png'),
        require('../assets/icons/back2.png'),
        require('../assets/icons/back3.png'),
        require('../assets/icons/carnivore.png'),
        require('../assets/icons/close.png'),
        require('../assets/icons/diet_unknown.png'),
        require('../assets/icons/dinoprint.png'),
        require('../assets/icons/dinosaur.png'),
        require('../assets/icons/downscroll.gif'),
        require('../assets/icons/favourite.png'),
        require('../assets/icons/footprint.png'),
        require('../assets/icons/fossil.png'),
        require('../assets/icons/garbage.png'),
        require('../assets/icons/garbage2.png'),
        require('../assets/icons/globesmall.png'),
        require('../assets/icons/grey_search.png'),
        require('../assets/icons/grey_star.png'),
        require('../assets/icons/herbivore.png'),
        require('../assets/icons/home.png'),
        require('../assets/icons/info.png'),
        require('../assets/icons/info2.png'),
        require('../assets/icons/infowhite.png'),
        require('../assets/icons/omnivore.png'),
        require('../assets/icons/play-button.png'),
        require('../assets/icons/plus.png'),
        require('../assets/icons/scroll.png'),
        require('../assets/icons/scrolldown.gif'),
        require('../assets/icons/search.png'),
        require('../assets/icons/star.png'),
        require('../assets/icons/toggleview.png'),

        require('../assets/era_images/early_cretaceous.png'),
        require('../assets/era_images/early_jurassic.png'),
        require('../assets/era_images/earlyCrtcs.png'),
        require('../assets/era_images/earlyCrtcs3.png'),
        require('../assets/era_images/earlyJrsc.png'),
        require('../assets/era_images/late_cretaceous.png'),
        require('../assets/era_images/late_jurassic.png'),
        require('../assets/era_images/late_triassic.png'),
        require('../assets/era_images/lateCrtcs.png'),
        require('../assets/era_images/lateJrsc.png'),
        require('../assets/era_images/mid_jurassic.png'),
        require('../assets/era_images/middle_triassic.png'),
        require('../assets/era_images/middle_triassic2.png'),
        require('../assets/era_images/midJrsc.png'),
        require('../assets/era_images/midTrsc.png'),
        require('../assets/era_images/midTrsc2.png'),

        require('../assets/Dino_images/transparent_dinos/ank.jpg'),
        require('../assets/Dino_images/transparent_dinos/brachiosaurus.png'),
        require('../assets/Dino_images/transparent_dinos/carnotaurus.png'),
        require('../assets/Dino_images/transparent_dinos/gallimimus.png'),
        require('../assets/Dino_images/transparent_dinos/Metriacanthosaurus.png'),
        require('../assets/Dino_images/transparent_dinos/stegosaurus.png'),
        require('../assets/Dino_images/transparent_dinos/suchomimus.jpeg'),
        require('../assets/Dino_images/transparent_dinos/trex.png'),
        require('../assets/Dino_images/transparent_dinos/trex2.png'),
        require('../assets/Dino_images/transparent_dinos/triceratops.png'),
        require('../assets/Dino_images/transparent_dinos/veloc.png'),


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
          {/*
          <TouchableHighlight
            onPress={() => {
              this.setFavouritesVisible();
              }}>
                <Image source={require('../assets/icons/favourite.png')} style={{height: 25, width: 25, marginBottom: 10, marginRight: 20, position: 'relative'}}/>
          </TouchableHighlight>

          /*}

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
                <Image source={require('../assets/icons/aboutus.png')} style={{height: 25, width: 25, marginBottom: 10,  position: 'relative'}}/>
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

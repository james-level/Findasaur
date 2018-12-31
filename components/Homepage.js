import React, { Component } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View, Linking, Image, TouchableHighlight, Modal, ScrollView, ImageBackground } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import HomepageStyle from '../Stylesheets/HomepageStyle.js';
import ChooseTimePeriod from './ChooseTimePeriod.js';
import InfoModal from './InfoModal.js';
import ExploreButton from './ExploreButton.js';
import HeroImageCarousel from './HeroImageCarousel.js';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      fontLoaded: false,
      modalVisible: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  async componentDidMount() {

  await Font.loadAsync({
     'PoiretOne-Regular': require('../assets/fonts/PoiretOne-Regular.ttf'),
   });
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

  render() {

  if (this.state.buttonClicked === false){

    return (
      <SafeAreaView style={HomepageStyle.container}>

{/* 'HOME PAGE BACKGROUBND IMAGE' SECTION*/}
    {/*<ImageBackground
      source={require('../assets/Dino_images/foliage.png')}
      style={HomepageStyle.backgroundImage}
    >*/}

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


    {/* 'ABOUT/INFO' MODAL SECTION*/}

  <InfoModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} fontLoaded={this.state.fontLoaded} />

    {/*</ImageBackground>*/}
  </SafeAreaView>

    );
  }

  else {

    return (
      <ChooseTimePeriod home={this.handleButtonClick}
      />

    )
  }
  }
}

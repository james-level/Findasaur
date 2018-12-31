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
    const images = [
    'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0001_trex.png',
    'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0000_triceratops.png',
    'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0009_carnotaurus.png',
    'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0006_mosasaurus_0.png',
    'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0015_ankylosaurus.png',
    'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0002_stygimoloch.png',
    'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0011_blue.png',
    'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0004_pteranodon_0.png',
    ];

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
    <ImageSlider
      loopBothSides
      autoPlayWithInterval={1500}
      images={images}
      customSlide={({ index, item, style, width }) => (
        <View key={index} style={[style, HomepageStyle.customSlide]}>
          <Image source={{ uri: item }} style={HomepageStyle.customImage} />
        </View>
        )}

      customButtons={(position, move) => (
        <View style={HomepageStyle.buttons}>
          {images.map((image, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor="white"
                onPress={() => move(index)}
                style={HomepageStyle.button}
              >
              <Text>
              </Text>
              </TouchableHighlight>
              );
            })}
          </View>
        )}
       />

      <View style={HomepageStyle.content2}>
        {
            this.state.fontLoaded ? (
              <Button
              onPress={this.handleButtonClick}
      textStyle={{fontSize: 25, textShadowColor: 'white', textShadowOffset: {width: -5, height: 5}, textShadowRadius: 25, color: 'black', fontWeight: "700", fontFamily: "PoiretOne-Regular"}}
      title="Explore"
      titleStyle={{ fontFamily: "PoiretOne-Regular" }}
      buttonStyle={{
        backgroundColor: "limegreen",
        width: 175,
        height: 55,
        borderRadius: 20
      }}
      containerStyle={{ marginTop: 20 }}
    />
          ) : null
        }
      </View>


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

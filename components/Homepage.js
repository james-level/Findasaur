import React, { Component } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native';
import HomepageStyle from '../CSS/HomepageStyle.js';
import DinosaurPaginationHomepage from './DinosaurPaginationHomepage.js';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      fontLoaded: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  async componentDidMount() {

    await Font.loadAsync({

      'FrederickatheGreat-Regular': require('../assets/fonts/FrederickatheGreat-Regular.ttf'),

    });

     this.setState({ fontLoaded: true });

  }

  handleButtonClick(){
    this.setState({
      buttonClicked: !this.state.buttonClicked
    })
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
        <View style={HomepageStyle.content1}>
          <Text style={HomepageStyle.contentText}>Findasaur</Text>
        </View>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={1500}
          images={images}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
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
            <AwesomeButtonRick type="anchor" onPress={this.handleButtonClick}>EXPLORE ERAS</AwesomeButtonRick>
        </View>
      </SafeAreaView>
    );
  }

  else {

    return (
      <DinosaurPaginationHomepage home={this.handleButtonClick}
      />

    )
  }
  }
}

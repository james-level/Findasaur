import React, { Component } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal } from 'react-native';
import { Font } from 'expo';
import { SafeAreaView } from 'react-native';
import HomepageStyle from '../Stylesheets/HomepageStyle.js';
import ChooseTimePeriod from './ChooseTimePeriod.js';


export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      fontLoaded: false,
      modalVisible: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

        {
            this.state.fontLoaded ? (
            <AwesomeButtonRick textColor='black' backgroundColor='#66CD00' type="anchor" onPress={this.handleButtonClick}>Explore</AwesomeButtonRick>
          ) : null
        }
        </View>


{/* 'ABOUT/INFO' MODAL SECTION*/}
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
            }}>
              <Text style={{color:'white'}}>Show Modal</Text>
            </TouchableHighlight>
          </View>


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

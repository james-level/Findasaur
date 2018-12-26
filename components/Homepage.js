import React, { Component } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View, Linking, Image, TouchableHighlight, Modal, ScrollView, ImageBackground } from 'react-native';
import { Font, LinearGradient  } from 'expo';
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

      {/*<ImageBackground
        source={require('../assets/Dino_images/foliage.png')}
        style={HomepageStyle.backgroundImage}
      >*/}

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
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View>

          <LinearGradient
          colors={['black', '#1e932d']}
          style={{ padding: 25 }}>

            <View style={HomepageStyle.infoModal}>

                <ScrollView>
                  <Text style= {[HomepageStyle.infoModalHeading, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                    <View style={{alignItems: "center"}}>
                      <Image source={require('../assets/Dino_images/friendlydino.gif')} style={{height: 150, width: 225}}/>
                    </View>
                  <Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur, an app by<Text style={{fontSize: 17, fontFamily: 'PoiretOne-Regular', color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/jah1603')}>James Henderson</Text><Text style={{fontSize: 17, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/SFR1981')}>, Stephen Rooney</Text> &<Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/DavidAPears')}> David Pears.</Text><Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>They can usually be found in an Edinburgh cafe, trying to figure out <Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://www.reactnative.com')}>ReactNative.</Text></Text></Text>

                  <Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur looks to educate users on various dinosaurs from a range of eras. It utilises the Wikipedia API to provide information relating to aspects of each speciment, such as diet and location (of fossil finds)</Text>

                  <Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur is based on an exisitng webproject (Findasaurus), however the conversion to ReactNative is soley ours. Icons provided by 'FlatIcons'. This app is an not-for-profit project.</Text>

                  <Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                  <Text style= {[HomepageStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>January 2019</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                  <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
                  </TouchableHighlight>
                  </ScrollView>
                </View>
                </LinearGradient>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
            }}>
              <Image source={require('../assets/icons/info.png')} style={{height: 25, width: 25, marginBottom: 10, position: 'relative'}}/>
            </TouchableHighlight>
          </View>
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

import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import HeroImageCarouselStyle from '../Stylesheets/HeroImageCarouselStyle.js';

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

const HeroImageCarousel = () => (

  <ImageSlider
  loopBothSides
  autoPlayWithInterval={1500}
  images={images}
  customSlide={({ index, item, style, width }) => (
    <View key={index} style={[style, HeroImageCarouselStyle.customSlide]}>
      <Image source={{ uri: item }} style={HeroImageCarouselStyle.customImage} />
    </View>
    )}

  customButtons={(position, move) => (
    <View style={HeroImageCarouselStyle.buttons}>
      {images.map((image, index) => {
        return (
          <TouchableHighlight
            key={index}
            underlayColor="white"
            onPress={() => move(index)}
            style={HeroImageCarouselStyle.button}
          >
          <Text>
          </Text>
          </TouchableHighlight>
          );
        })}
      </View>
    )}
   />

 )

 export default HeroImageCarousel;

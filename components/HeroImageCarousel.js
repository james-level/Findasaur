import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View } from 'react-native';

export default class HeroImageCarousel extends React.Component {

  render() {
    return (
      <ImageSlider images = {[
        'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0001_trex.png',
        'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0000_triceratops.png',
        'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0009_carnotaurus.png',
        'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0006_mosasaurus_0.png',
        'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0015_ankylosaurus.png',
        'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0002_stygimoloch.png',
        'http://www.jurassicworld.com/sites/default/files/2018-05/960x540_0011_blue.png',
        'http://www.jurassicworld.com/sites/default/files/2018-06/960x540_0004_pteranodon_0.png',
      ]} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

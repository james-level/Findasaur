import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import { StyleSheet, Text, View } from 'react-native';

export default class HeroImageCarousel extends React.Component {

  render() {
    return (
      <ImageSlider images = {[
        'assets/Dino_images/transparent_dinos/ank.jpg',
        'assets/Dino_images/transparent_dinos/brachiosaurus.png',
        'assets/Dino_images/transparent_dinos/carnotaurus.png',
        'assets/Dino_images/transparent_dinos/Metriacanthosaurus.png',
        'assets/Dino_images/transparent_dinos/suchomimus.jpeg',
        'assets/Dino_images/transparent_dinos/trex.png',
        'assets/Dino_images/transparent_dinos/trex2.png',
        'assets/Dino_images/transparent_dinos/triceratops.png',
        'assets/Dino_images/transparent_dinos/veloc.png'
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

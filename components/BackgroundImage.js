import React, { Component } from 'react';
import {AppRegistry, Image} from 'react-native';

const remote = 'https://www.desktopbackground.org/p/2010/10/01/88550_abstract-pattern-hd-wallpapers-hd-images-new_1613x1008_h.jpg';

export default class BackgroundImage extends Component {
  render() {
    const resizeMode = 'center';

    return (
      <Image
        style={{
          flex: 1,
          resizeMode,
        }}
        source={{ uri: remote }}
      />
    );
  }
}

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);

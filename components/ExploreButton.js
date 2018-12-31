import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View } from 'react-native';
import HomepageStyle from '../Stylesheets/HomepageStyle.js';

export default class ExploreButton extends Component {
  render() {
    return (

      <View style={HomepageStyle.content2}>
        {
            this.props.fontLoaded ? (
              <Button
              onPress={this.props.handleButtonClick}
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

    )
  }
}

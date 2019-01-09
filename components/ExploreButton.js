import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View } from 'react-native';
import ExploreButtonContainerStyle from '../Stylesheets/ExploreButtonContainerStyle.js';

export default class ExploreButton extends Component {

  render() {
    return (

      <View style={ExploreButtonContainerStyle.content}>

        {
            this.props.fontLoaded ? (
              <Button
                onPress={this.props.handleButtonClick}
                textStyle={{fontSize: 25, color: 'black', fontFamily: "PoiretOne-Regular"}}
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

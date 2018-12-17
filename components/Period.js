import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
const darkColor = 'black',
      lightColor = 'white',
      // Import randomcolor from 'randomcolor';
      { width, height } = Dimensions.get('window');
import _ from 'lodash';
import PropTypes from 'prop-types';

const bonesIcon = require('../assets/app_icons/bones.png');

export default class Period extends Component {

  eraImage(index){

    console.log(index);

    switch(index) {

    case 0: return require("../assets/era_images/middle_triassic.png");
    case 1: return require("../assets/era_images/late_triassic.png");
    case 2: return require("../assets/era_images/early_jurassic.png");
    case 3: return require("../assets/era_images/mid_jurassic.png");
    case 4: return require("../assets/era_images/late_jurassic.png");
    case 5: return require("../assets/era_images/early_cretaceous.png");
    case 6: return require("../assets/era_images/late_cretaceous.png");

  }
  }


  render() {

    const {
      id,
      index,
      key,
      title,
      city,
      type,
      color,
      description,
      image
    } = this.props;
    // Console.warn(" image: ",image);
    return (
      <View style={{
        flex: 1,
        // MarginTop:40,
        backgroundColor: color,
        opacity: 1,
        width,
        // Margin:5,
        borderRadius: 0
      }}
        >
            <View style={{
          marginTop: 35,
          flexDirection: 'column' }}
        >
      {/*    <Image
                  style={s.profilePicture}
                  source={require('../assets/app_icons/bones.png') }
                /> */}
                <Image
                            style={s.profilePicture}
                            source={ this.eraImage(id) }
                          />

          <View style={[
            { height: 20 },
            s.badgeSection
          ]}
                >

                </View>
        </View>
        <View>
        <Text style={[
          s.displayName
        ]}  >   {title}
                </Text>
        </View>

        <View>

          <Text style={s.bodyText}>
                {description}
            </Text>


          </View>

        <View style={s.reactionBox}>
              <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              LayoutAnimation.easeInEaseOut();

              /*
               * This.setState({
               * footerText: this.state.footerText + 1
               * })
               */
            }}
          >
              <Text style={[
              s.description,
              {
                textShadowColor: darkColor
              },
              { color: darkColor }
            ]}
            >

            </Text>
          </TouchableHighlight>
          </View>
        </View>
    );
}
}

// CSS for this period page


const s = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    color: 'white'
  },
  linearGradient: {
    flex: 1,
    borderRadius: 0
  },
  reactionBox: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  description: {
    width: 0,
    height: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  // -------
  profilePicture: {
    width: "100%",
    height: 224.9,
    backgroundColor: 'black'
  },
  displayName: {
    color: 'white',
    marginTop: 22,
    fontSize: 33,
    marginBottom: 5
  },
  badgeSection: {
    // Flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    marginRight: 10,
    // MarginTop: 15,
    justifyContent: 'center'
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  }
});
Period.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  city: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};
Period.DefaultProps = {

  /*
   * Title:PropTypes.string,
   * image:PropTypes.string,
   * tag:"",
   */
  selected: false,
  createTagColor: true
};

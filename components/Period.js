import React, { Component } from 'react';
import { Font } from 'expo';
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';

const darkColor = 'black',
      lightColor = 'white',
      // Import randomcolor from 'randomcolor';
      { width, height } = Dimensions.get('window');
import _ from 'lodash';
import PropTypes from 'prop-types';

import axios from 'axios';

const bonesIcon = require('../assets/app_icons/bones.png');

export default class Period extends Component {

  constructor(props) {

    super(props);

  this.state = {
    text: null,
    fontLoaded: false,
    dinosaurs: null
  }

  this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);

}


  componentDidMount(){
    console.log("HHHII");
    this.getDinosaursForPeriod(237, 247);
  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  getDinosaursForPeriod(earliest_date, latest_date){
    console.log("HHHHHHHH");
    var self = this;

    const url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${earliest_date}&max_ma=${latest_date}`

    axios.get(url).then((response) => {
      console.log("Dinosaurs:", response.data);
      self.setState({
        dinosaurs: response.data
      }, function(){this.populateDropdown()})
    })
  }

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

  async componentDidMount() {
    await Font.loadAsync({
      'FrederickatheGreat-Regular': require('../assets/fonts/FrederickatheGreat-Regular.ttf'),
    });

     this.setState({ fontLoaded: true });

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
    {

        this.state.fontLoaded ? (

        <View>
        <Text style={[
          s.displayName
        ]}  >   {title}
                </Text>
        </View>

      ) : null

    }

    </View>

        <View style={{backgroundColor: 'black', justifyContent: 'center'}}>

          <Text style={s.bodyText}>
                {description}
            </Text>

            <Text style={s.filterText}>
                  Filter dinosaurs by diet:
              </Text>

              <MultiToggleSwitch>
  <MultiToggleSwitch.Item primaryColor={'green'} onPress={() => console.log("First tapped!")}>
      <Icon name={'flower'} size={30} />
  </MultiToggleSwitch.Item>
  <MultiToggleSwitch.Item primaryColor={'#CF4647'}>
      <Icon name={'pig'} size={30} />
  </MultiToggleSwitch.Item>
  <MultiToggleSwitch.Item>
      <Icon name={'food'} size={30}/>
  </MultiToggleSwitch.Item>
  <MultiToggleSwitch.Item primaryColor={'orange'}>
      <Icon name={'all-inclusive'} size={30} />
  </MultiToggleSwitch.Item>
</MultiToggleSwitch>

  <AwesomeButtonRick style={{marginTop: 20}} type="anchor" onPress={this.handleButtonClick}>EXPLORE BY PERIOD</AwesomeButtonRick>

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
  filterText: {
    fontWeight: 'bold',
    fontSize: 18,
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
    fontFamily: 'FrederickatheGreat-Regular',
    color: '#00e500',
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

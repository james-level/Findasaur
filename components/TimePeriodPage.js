import React, { Component } from 'react';
import { Font } from 'expo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import PaginatedHomepage from './PaginatedHomepage.js';
import TimePeriodStyle from '../Stylesheets/TimePeriodStyle.js';
import _ from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Dimensions, Image, LayoutAnimation, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const darkColor = 'black', lightColor = 'white', { width, height } = Dimensions.get('window');


export default class TimePeriodPage extends Component {

  constructor(props) {

  super(props);

  this.state = {
    text: null,
    fontLoaded: false,
    dinosaurs: null,
    dietSelected: "herbivores",
    searchButtonClicked: false
  }

  this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);
  this.handleCarnivoreSelection = this.handleCarnivoreSelection.bind(this);
  this.handleOmnivoreSelection = this.handleOmnivoreSelection.bind(this);
  this.handleHerbivoreSelection = this.handleHerbivoreSelection.bind(this);
  this.handleAllDietsSelection = this.handleAllDietsSelection.bind(this);
  this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
}

  componentDidMount(){
    this.getDinosaursForPeriod(237, 247);
  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  getDinosaursForPeriod(earliest_date, latest_date){

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

  handleHerbivoreSelection(){
    this.setState({
      dietSelected: 'herbivores'
    }, function(){
      console.log("DIET CHOSEN", this.state.dietSelected);
    });
  }

  handleCarnivoreSelection(){
    this.setState({
      dietSelected: 'carnivores'
    }, function(){
      console.log("DIET CHOSEN", this.state.dietSelected);
    });
  }

  handleOmnivoreSelection(){
    this.setState({
      dietSelected: 'omnivores'
    }, function(){
      console.log("DIET CHOSEN", this.state.dietSelected);
    });
  }

  handleAllDietsSelection(){
    this.setState({
      dietSelected: 'all'
    }, function(){
      console.log("DIET CHOSEN", this.state.dietSelected);
    });
  }

  handleSearchSubmit(){
    this.setState({
      searchButtonClicked: true
    })
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

    return (

  <View style={{
    flex: 1,
    backgroundColor: color,
    opacity: 1,
    width,
    borderRadius: 0
      }}
  >
    <View style={{
      marginTop: 35,
      flexDirection: 'column' }}
    >
      <Image
        style={TimePeriodStyle.profilePicture}
        source={ this.eraImage(id) }
      />
      <View style={ [{ height: 20 }, TimePeriodStyle.badgeSection] }>
      </View>
    </View>

      <View>
      { this.state.fontLoaded ? (
        <View>
        <Text style={[
          TimePeriodStyle.displayName
        ]}  >   {title}
                </Text>
        </View>
      ) : null
    }
    </View>

        <View style={{backgroundColor: 'black'}}>
          <Text style={TimePeriodStyle.bodyText}>
                {description}
            </Text>
            <Text style={TimePeriodStyle.filterText}>
                  Filter dinosaurs by diet:
              </Text>
              <MultiToggleSwitch>
                <MultiToggleSwitch.Item primaryColor={'green'} onPress={this.handleHerbivoreSelection}>
                    <Icon name={'flower'} size={30} />
                </MultiToggleSwitch.Item>
                <MultiToggleSwitch.Item onPress={this.handleCarnivoreSelection} primaryColor={'#CF4647'}>
                    <Icon name={'pig'} size={30} />
                </MultiToggleSwitch.Item>
                <MultiToggleSwitch.Item onPress={this.handleOmnivoreSelection}>
                    <Icon name={'food'} size={30}/>
                </MultiToggleSwitch.Item>
                <MultiToggleSwitch.Item onPress={this.handleAllDietsSelection} primaryColor={'orange'}>
                    <Icon name={'all-inclusive'} size={30} />
                </MultiToggleSwitch.Item>
              </MultiToggleSwitch>
              <AwesomeButtonRick height={35} width={150} style={{marginTop: 20}} type="anchor" onPress={this.props.handleSearchSubmit}>FIND DINOS</AwesomeButtonRick>
          </View>

        <View style={TimePeriodStyle.reactionBox}>
              <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
            }}
          >
              <Text style={[
              TimePeriodStyle.description,
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

TimePeriodPage.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  city: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

TimePeriodPage.DefaultProps = {
  selected: false,
  createTagColor: true
};

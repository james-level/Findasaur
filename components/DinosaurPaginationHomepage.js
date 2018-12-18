import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import faker from 'faker';
import Period from './Period';
import Pagination from 'react-native-pagination';
import _ from 'lodash';
import { MockTweetList } from './FakerMocks';
import axios from 'axios';


const bonesIcon = require('../assets/app_icons/bones.png');


export default class DinosaurPaginationHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dinosaurs: null,
      // List of periods
      items: [


        {
          id: 0,
          index: 0,
          key: 0,
          title: "Middle Triassic",
          color: '#000000',
          description: "247 to 237 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 1,
          index: 1,
          key: 1,
          title: "Late Triassic",
          color: '#000000',
          description: "Late Triassic",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 2,
          index: 2,
          key: 2,
          title: "Early Jurassic",
          color: '#000000',
          description: "Early Jurassic",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 3,
          index: 3,
          key: 3,
          title: "Middle Jurassic",
          color: '#000000',
          description: "Middle Jurassic",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 4,
          index: 4,
          key: 4,
          title: "Late Jurassic",
          color: '#000000',
          description: "Late Jurassic",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 5,
          index: 5,
          key: 5,
          title: "Early Cretaceous",
          color: '#000000',
          description: "Early Cretaceous",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },

        {
          id: 6,
          index: 6,
          key: 6,
          title: "Late Cretaceous",
          color: '#000000',
          description: "Late Cretaceous",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247
        },
      ]
    };

    this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);
  }

  componentDidMount(){
    console.log("HHHII");
    this.getDinosaursForPeriod(237, 247);
  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...", this.state.dinosaurs);
  }

  getDinosaursForPeriod(earliest_date, latest_date){
    console.log("HHHHHHHH");
    var self = this;

    // URL currently hardcoded with dates for the earliest period (Middle Triassic - 237-247 million years ago)
    const url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${earliest_date}&max_ma=${latest_date}`

    axios.get(url).then((response) => {
      console.log("Dinosaurs:", response.data.records);

      self.setState({

        dinosaurs: self.filterByGenusName(self.filterDinosaurData(response.data.records))

      }, function(){self.populateDropdown()})
    })
  }

 filterDinosaurData(dinosaurs) {
    const newArray = [];

    dinosaurs.forEach((dinosaur) => {
      const newName = dinosaur.tna.split(' ');
      dino = {
        name: newName[0],
        coords: [dinosaur.lat, dinosaur.lng],
        enviroment: dinosaur.jev,
        diet: dinosaur.jdt,
        range: `${dinosaur.eag} - ${dinosaur.lag}`,
        imageId: dinosaur.img,
        period: this.periodSelected
      }
      newArray.push(dino)
    })
    return newArray;
  }

  filterByGenusName(dinosaurs) {
    const filteredDinosaurs = dinosaurs.reduce((uniqueDinosaurs, dinosaur,   oldIndex) => {
      const dinosaurIsUnique = !uniqueDinosaurs.some((uniqueDinosaur) => {
        return uniqueDinosaur.name === dinosaur.name;
      });
      if (dinosaurIsUnique){
        uniqueDinosaurs.push(dinosaur);
      }
      else {
        const existingDinosaur = uniqueDinosaurs.find((existingDinosaur) => {
        return existingDinosaur.name === dinosaur.name;
        });
      if (Array.isArray(existingDinosaur.coords[0])) {
          existingDinosaur.coords.push(dinosaur.coords)
        }
      else {
          existingDinosaur.coords = [existingDinosaur.coords, dinosaur.coords];
        }
      }
      return uniqueDinosaurs;
    }, [])

      return filteredDinosaurs;
  }

  _renderItem = ({ item }) => (
    <Period
    onPressItem={this._onPressItem}
    id={item.id}
    title={item.title}
    color={item.color}
    description={item.description}
    image={item.image}
    earliest_date={item.earliest_date}
    latest_date={item.latest_date}
  />);

  _keyExtractor = (item, index) => item.id.toString()
  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => this.setState({ viewableItems })
  render() {

    return (
      <View style={[ s.container ]}>
        <FlatList
            ref={r => this.refs = r}
            data={this.state.items}
            horizontal
            keyExtractor={this._keyExtractor}
            onViewableItemsChanged={this.onViewableItemsChanged}// Map your keys to whatever unique ids the have (mine is a "id" prop)
            pagingEnabled
            renderItem={this._renderItem}
        />
            <Pagination
        // DotThemeLight
          horizontal
          dotOnPress={(o) => console.log(' clicked: ', o)}
          hideEmptyDots
            pagingEnabled
          startDotIconFamily="Ionicons"
          startDotIconName="ios-arrow-back"
          startDotIconColor="#00e500"
          startDotIconSize={30}
          endDotIconSize={30}
          endDotIconFamily="Ionicons"
          endDotIconName="ios-arrow-forward"
          endDotIconColor="#00e500"
          dotIconName="ios-close"
            hideEmptyDots

          dotEmptyHide
          dotIconColorActive="#00e500"
          dotIconColorNotActive="#00e500"
          // DotIconColorEmpty={"blue"}
          dotIconSizeActive={15}
          /*
           *  DotIconSizeNotActive={10}

           */
          listRef={this.refs}// To allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
          paginationVisibleItems={this.state.viewableItems}// Needs to track what the user sees
          paginationItems={this.state.items}// Pass the same list as data
          paginationItemPadSize={2}
        />
        </View>);
  }
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0

  }
});

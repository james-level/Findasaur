import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import faker from 'faker';
import TimePeriodPage from './TimePeriodPage';
import {Platform} from 'react-native';
import NavBarAndroidLight from './NavBarAndroidLight'
import NavBarIOSLight from './NavBarIOSLight'
import Pagination from 'react-native-pagination';
import _ from 'lodash';
import { MockTweetList } from './FakerMocks';
import axios from 'axios';
import DinoListView from './DinoListView.js';

export default class ChooseTimePeriod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      dinosaurs: null,
      diets: null,
      herbivores: null,
      carnivores: null,
      omnivores: null,
      searchButtonClicked: false,
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
          description: "237 to 201 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 201,
          latest_date: 237
        },

        {
          id: 2,
          index: 2,
          key: 2,
          title: "Early Jurassic",
          color: '#000000',
          description: "174 to 201 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 174,
          latest_date: 201
        },

        {
          id: 3,
          index: 3,
          key: 3,
          title: "Middle Jurassic",
          color: '#000000',
          description: "163 to 174 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 163,
          latest_date: 174
        },

        {
          id: 4,
          index: 4,
          key: 4,
          title: "Late Jurassic",
          color: '#000000',
          description: "145 to 163 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 145,
          latest_date: 163
        },

        {
          id: 5,
          index: 5,
          key: 5,
          title: "Early Cretaceous",
          color: '#000000',
          description: "100 to 145 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 100,
          latest_date: 145
        },

        {
          id: 6,
          index: 6,
          key: 6,
          title: "Late Cretaceous",
          color: '#000000',
          description: "66 to 100 million years ago",
          image: faker.internet.avatar(),
          earliest_date: 66,
          latest_date: 100
        },
      ]
    };

    this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount(){

    // Alert.alert(
    //        'Swipe to move between time periods!'
    //     )

    this.getDinosaursForPeriod(237, 247);
  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  handleSearchSubmit(){

    this.setState({

      searchButtonClicked: true

    })

  }

  addImageToState(imagesObject){
    this.setState({
      images:  [...this.state.images, handleImageUrl(imagesObject)]
    }, function(){
      console.log(`added ${imagesObject} to state array`);
    })
  }

  getDinosaursForPeriod(earliest_date, latest_date){

    var self = this;

    // URL currently hardcoded with dates for the earliest period (Middle Triassic - 237-247 million years ago)
    const url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${earliest_date}&max_ma=${latest_date}`

    axios.get(url).then((response) => {

      self.setState({

        dinosaurs: self.filterByGenusName(self.filterDinosaurData(response.data.records)),
        diets: self.getUniqueDiets(self.filterByGenusName(self.filterDinosaurData(response.data.records))),
        herbivores: self.getDinosaursByDiet('herbivore', self.filterByGenusName(self.filterDinosaurData(response.data.records))),
        carnivores: self.getDinosaursByDiet('carnivore', self.filterByGenusName(self.filterDinosaurData(response.data.records))),
        omnivores: self.getDinosaursByDiet('omnivore', self.filterByGenusName(self.filterDinosaurData(response.data.records)))

      }, )
    })
    console.log(self.state)
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

  getUniqueDiets(dinosaurs) {
    const filteredDiets = dinosaurs.reduce((uniqueDiets, dinosaur, index) => {
      const dietIsUnique = !uniqueDiets.some((uniqueDiet) => {
        return uniqueDiet === dinosaur.diet;
      })

      if (dietIsUnique) {
        uniqueDiets.push(dinosaur.diet)
      }
      return uniqueDiets
    }, []);
    return filteredDiets;
  }

  getDinosaursByDiet(dietSelected, dinosaurs) {
    return dinosaurs.filter(dinosaur => dinosaur.diet === dietSelected);
  };

  _renderItem = ({ item }) => (
    <TimePeriodPage
    dinosaurs={this.state.dinosaurs}
    getDinosaursForPeriod={this.getDinosaursForPeriod}
    handleSearchSubmit={this.handleSearchSubmit}
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

    if (this.state.searchButtonClicked === false){

      const NavBar = Platform.OS === 'ios' ? NavBarIOSLight : NavBarAndroidLight

    return (

      <View style={[ s.container ]}>
      {/*  <NavBar home={this.props.home}/> */}
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
          startDotIconColor="#66CD00"
          startDotIconSize={30}
          endDotIconSize={30}
          endDotIconFamily="Ionicons"
          endDotIconName="ios-arrow-forward"
          endDotIconColor="#66CD00"
          dotIconName="ios-close"
            hideEmptyDots

          dotEmptyHide
          dotIconColorActive="#66CD00"
          dotIconColorNotActive="#66CD00"
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
        </View>)
      }

      else {

        return (

          <DinoListView allDinosaurs={this.state.dinosaurs} herbivores={this.state.herbivores} carnivores={this.state.carnivores} omnivores={this.state.omnivores} diets={this.state.diets} />
        )
      }
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

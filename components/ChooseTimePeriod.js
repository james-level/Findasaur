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
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import ChooseTimePeriodStyle from '../Stylesheets/ChooseTimePeriodStyle.js';

export default class ChooseTimePeriod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesLoading: false,
      images: [],
      dinosaurDescriptions: [],
      dinosaurs: null,
      diets: null,
      herbivores: null,
      carnivores: null,
      omnivores: null,
      imagesLoaded: false,
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
    this.retrieveImagesAndDescriptions = this.retrieveImagesAndDescriptions.bind(this);
    this.toggleDinosaurListView = this.toggleDinosaurListView.bind(this);
    this.saveDescriptionToState = this.saveDescriptionToState.bind(this);
  }

  componentDidMount(){

    // Alert.alert(
    //        'Swipe to move between time periods!'
    //     )

  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  handleSearchSubmit(){

    this.setState({

      imagesLoading: true

    }, function(){
      var earliest_date = this.state.viewableItems[0].item.earliest_date;
      var latest_date = this.state.viewableItems[0].item.latest_date;
      this.getDinosaursForPeriod(earliest_date, latest_date);
    })

  }

  toggleDinosaurListView(){
    this.setState({
      imagesLoaded: true
    })
  }

  addImageToState(imagesObject){

    this.setState({
      images:  [...this.state.images, this.handleImageUrl(imagesObject)]
    }, function(){
      console.log(`added ${imagesObject} to state array`);

        this.setState({
          imagesLoading: false
        }, function(){
          this.toggleDinosaurListView();
        })
      })
    }

  saveDescriptionToState(response){
    this.setState({
      dinosaurDescriptions: [...this.state.dinosaurDescriptions, response.json()]
    }, function(){ console.log("Descriptions in state", this.state.dinosaurDescriptions) }
)
  }

  retrieveWikiDescription(url){
    return fetch(url)
      .then((response) => this.saveDescriptionToState(response)
    )
  }

  retrieveImageFileName(url){
    return fetch(url)
      .then((response) => response.json());
  }

  retrieveImage(url){
    return fetch(url)
      .then((response) => response.json());
  }

  handleImageUrl(objects) {
    const newArray = [];
    objects.forEach((object) => {
      if (object.query.pages["-1"].imageinfo === undefined) {
        // CURRENTLY REMOVING ALL DINOSAURS WITHOUT AN IMAGE IN THE WIKI API. COULD FIND SUITABLE 'NOT FOUND' IMAGE
         /* newArray.push('https://st2.depositphotos.com/7857468/12366/v/950/depositphotos_123667514-stock-illustration-cartoon-cute-dinosaur.jpg') */
         objects.pop(object);
      }
      else {
        const url = object.query.pages["-1"].imageinfo[0].url;
        newArray.push(url)
      }
    })
    return newArray;
  }

  getImageAddress(object) {
    var array = [];
    for (i = 0; i < object.length; i++) {
      var pageNumber = Object.keys(object[i].query.pages);
      array.push(object[i].query.pages[pageNumber].pageimage);
    };
    return array;
  }

  retrieveImagesAndDescriptions(){

    var numberOfDinosaurs = this.state.dinosaurs.length;
    var lowerIndexLimit = numberOfDinosaurs - 20;
    var lowerDinosaurIndex = Math.random() * lowerIndexLimit;
    var upperDinosaurIndex = lowerDinosaurIndex + 20;
    var dinosaurs = this.state.dinosaurs.slice(lowerDinosaurIndex, upperDinosaurIndex);

    Promise.all(dinosaurs.map((dinosaur) => {
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${dinosaur.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
      return this.retrieveWikiDescription(url);
    }))
    .then(() => {
      /* this.wikiDinosaurs = getExtraData(this.props.dinosaurs); */
      /* Call a method (to be written later) here which adds the Wikipedia description of each dinosaur to the related dinosaur object */
      Promise.all(dinosaurs.map((dinosaur) => {
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${dinosaur.name}&format=json&prop=pageimages&origin=*`
        return this.retrieveImageFileName(imageUrl)
      }))
      .then((images) => {
        const imageObject = images;
        const imgAddress = this.getImageAddress(imageObject);
        Promise.all(imgAddress.map((object) => {
          const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`
          return this.retrieveImage(imgUrl);
        }))
        .then((imageObject) => {
          this.addImageToState(imageObject);
        })
      })
    })
    .catch((err) => {
      console.error(err);
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

      }, function(){ this.retrieveImagesAndDescriptions() })
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
    const filteredDinosaurs = dinosaurs.reduce((uniqueDinosaurs, dinosaur, oldIndex) => {
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

    if (this.state.imagesLoaded === false){

      const NavBar = Platform.OS === 'ios' ? NavBarIOSLight : NavBarAndroidLight

    return (

      <View style={[ ChooseTimePeriodStyle.container ]}>
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
        {
            this.state.imagesLoading ? (
              <View style={{backgroundColor: 'black', top: '-20%'}}>
                < BallIndicator count={7} size={50} color={'green'} style={{backgroundColor: 'black'}} />
              </View>
        ) : null
      }

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


        </View>

      )
      }

      else {

        var numberOfDinosaurs = this.state.dinosaurs.length;
        var lowerIndexLimit = numberOfDinosaurs - 20;
        var lowerDinosaurIndex = Math.random() * lowerIndexLimit;
        var upperDinosaurIndex = lowerDinosaurIndex + 20;

        return (

          <DinoListView images={this.state.images} dinosaurDescriptions={this.state.dinosaurDescriptions.slice(lowerDinosaurIndex, upperDinosaurIndex)} allDinosaurs={this.state.dinosaurs.slice(lowerDinosaurIndex, upperDinosaurIndex)} herbivores={this.state.herbivores} carnivores={this.state.carnivores} omnivores={this.state.omnivores} diets={this.state.diets} />
        )
      }
  }
}

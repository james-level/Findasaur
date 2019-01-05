import React, { Component } from 'react';
import ImageBackground from 'react-native';
import FitImage from 'react-native-fit-image';
import { Alert, Dimensions, FlatList, ScrollView, Image, TouchableHighlight, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo';
import _ from 'lodash';
import { MockRobotsList } from './FakerMocks';
import Pagination from 'react-native-pagination';
import AutoHeightImage from 'react-native-auto-height-image';
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 100;
import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import * as ImageFinder from './ImageFinder.js'
import * as Pronunciations from './Pronunciations.js'
import * as Meanings from './Meanings.js'
import * as Types from './Types.js'
import * as Lengths from './Lengths.js'
import { AsyncStorage } from "react-native"

export default class DinoListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dinosaurClicked: "",
      dinosaurTyped: "",
      dinosaurViewVisible: false,
      isLoading: false,
      activeId: null,
      activeItem: null,
      items: this.populateDinosaurs(this.props.allDinosaurs),
      searchDataLoading: false
    };
    this.toggleDinosaurView = this.toggleDinosaurView.bind(this);
    this.closeDinosaurView = this.closeDinosaurView.bind(this);
    this.retrieveSearchedDinosaurData = this.retrieveSearchedDinosaurData.bind(this);
  }

  addDinosaurToFavourites = async() => {
    var name = this.returnClickedDinosaur()
    var pronunciation = Pronunciations.getPronunciation(name)
    var description = this.renderDescriptionElements(this.state.searchedDinosaurDescription)
    var meaning = Meanings.getNameMeaning(name)
    var length = Lengths.getLength(name)
    var type = Types.getType(name)
    var diet = this.state.searchedDinosaurData.diet
    var image = this.state.searchedDinosaurImage

    var dinosaur = {name: name, diet: diet, description: description, pronunciation: pronunciation, meaning: meaning, length: length, type: type, image: image}

    try {
      AsyncStorage.getItem('dinosaur_favourites').then((dinosaurs) => {
        console.log("DINOSAURS ARRAY?", JSON.parse(dinosaurs));
        const dinos = dinosaurs ? JSON.parse(dinosaurs) : [];
        console.log("DINOS BEFORE", dinos);

        if (dinos.length > 0){
          var names = dinos.map((dino) => dino.name);
          if (!names.includes(dinosaur.name)){
          dinos.push(dinosaur);
          AsyncStorage.setItem('dinosaur_favourites', JSON.stringify(dinos));
          Alert.alert(
                 `Successfully added ${dinosaur.name} to your favourites!`
              )
        }
        else {
          Alert.alert(
                 `${dinosaur.name} is already in your favourites!`
              )
        }
      }
        else {
          dinos.push(dinosaur);
          AsyncStorage.setItem('dinosaur_favourites', JSON.stringify(dinos));
          Alert.alert(
                 `Successfully added ${dinosaur.name} to your favourites!`
              )
        }
        console.log("DINOS AFTER", dinos);
  })}
    catch (error) {
      console.log(error);
    }
}

  retrieveInitialImageLink(dinosaur){
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${dinosaur}&format=json&prop=pageimages&origin=*`

    axios.get(imageUrl).then( (response) => {

        this.retrieveImageUrl(response.data)

        })
    .catch(function(error){
      console.log(error);
      console.log("Error fetching dinosaur data.");
      Alert.alert(
    'Could not load data for dinosaur',
    "Please check your internet connection and try again later"
    )
    })
  }

  retrieveImageUrl(imageObject){
    var object = this.getImageAddress(imageObject);
    console.log("OBJECT IMAGE", object);
    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`

    axios.get(imgUrl).then( (response) => {

        this.setState({
          searchedDinosaurImage: this.handleImageUrl(response.data)
        }, function(){
          this.setState({searchDataLoading: false})
          console.log("STATE SEARCH IMAGE", this.state.searchedDinosaurImage);
        })

        })
    .catch(function(error){
      console.log(error);
      console.log("Error fetching dinosaur data.");
      Alert.alert(
    'Could not load data for dinosaur',
    "Please check your internet connection and try again later"
    )
    })
  }

  handleImageUrl(object) {
      if (object.query.pages["-1"].imageinfo === undefined) {
        // CURRENTLY REMOVING ALL DINOSAURS WITHOUT AN IMAGE IN THE WIKI API. COULD FIND SUITABLE 'NOT FOUND' IMAGE
         return 'https://www.buttonmuseum.org/sites/default/files/CA-no-dinosaurs-button_busy_beaver_button_museum.png';
         // objects.pop(object);
      }
      else {
        const url = object.query.pages["-1"].imageinfo[0].url;
        return url;
      }
  }

  getImageAddress(object) {
    const pageNumber = Object.keys(object.query.pages)[0];
    if (object.query.pages[`${pageNumber}`].pageimage){
      return object.query.pages[`${pageNumber}`].pageimage;
    }
      else {
        return [];
      }
    }

  retrieveDescription(dinosaur){
    var self = this;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${dinosaur}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
    axios.get(url).then( (response) => {

      console.log("DESC RESP", response.data);

      this.setState({
        searchedDinosaurDescription: response.data
      }, function(){
        this.retrieveInitialImageLink(dinosaur);
      })

        })
    .catch(function(error){
      console.log(error);
      console.log("Error fetching dinosaur data.");
      Alert.alert(
    'Could not load data for dinosaur',
    "Please check your internet connection and try again later"
    )
    })
  }

  toggleDinosaurView() {
    this.setState({
      dinosaurViewVisible: !this.state.dinosaurViewVisible,
      searchDataLoading: true
    }, function(){
      this.retrieveSearchedDinosaurData(this.state.clickedDinosaur)
    });
  }

  closeDinosaurView(){
    this.setState({
      dinosaurViewVisible: false,
      dinosaurTyped: ""
    });
  }

  searchBarPlaceholderText(){
    return `Search ${this.props.eraName} dinosaurs`
  }

  retrieveSearchedDinosaurData(dinosaur){
    for (dinosaur of this.props.everySingleDinosaur){
      if (dinosaur.name == this.state.clickedDinosaur){
        this.setState({
          searchedDinosaurData: dinosaur,
        },
        function(){ this.retrieveDescription(this.state.clickedDinosaur)
      })
      }
    }
  }

  capitaliseDiet(diet){
    if (diet){
    return diet.charAt(0).toUpperCase() + diet.slice(1);
  }
    else {
      return;
    }
  }

  buildDinosaurNameAndDietList(dinosaurs){

    return dinosaurs.map(dinosaur => {
        	if (!dinosaur.diet){
        		return `${dinosaur.name} (diet unknown)`;
        	} else {
        		return  `${dinosaur.name} (${dinosaur.diet})`;
        	}
        }
    )
  }

  buildDinosaurNameList(){
    dinosaurs = this.props.everySingleDinosaur;

    return dinosaurs.map(dinosaur => dinosaur.name
    )
  }

  buildDinosaurDietList(){
    dinosaurs = this.props.everySingleDinosaur;

    return dinosaurs.map(dinosaur => dinosaur.diet
    )
  }

  returnClickedDinosaur(){
    return this.state.clickedDinosaur;
  }

  addPrecedingDash(diet){
    if (diet){
      return "- ";
    }
  }

  getDescriptionText(object) {
    const newArray = [];
      const pageNumber = Object.keys(object.query.pages)[0];
      if (object.query.pages[`${pageNumber}`].extract){
      newArray.push(object.query.pages[`${pageNumber}`].extract);
    }
    if (newArray.length === 0){
      return "Unfortunately records are partial, incomplete or non-existent for certain dinosaurs. This means that, though Findasaur always strives to provide the most informative experience possible, in some cases no description is available."
    }
    else {
      return newArray;
    }
  }

  renderDescriptionElements(object){

    return this.getDescriptionText(object);
  }

  renderMatches(dinosaurs, dinosaursAndDiets){
    return dinosaursAndDiets.map((dinosaurAndDiet, i) =>
      <TouchableOpacity onPress={() => this.setState({clickedDinosaur: dinosaurs[i].name}, function(){ this.toggleDinosaurView() })} key={i}>
      <Text style={{color: 'black', fontSize: 16, paddingTop: 10, paddingBottom: 10, fontFamily: 'PoiretOne-Regular'}} key={i}>{dinosaurAndDiet}</Text>
      </TouchableOpacity>

    )
  }

  getDietTextColor(diet){
    if (diet === "carnivore"){
      return 'red';
    }
    if (diet === "herbivore"){
      return 'green';
    }
    else {
      return 'black';
    }
  }

  removeNonAlphanumeric(string){
    return string.replace(/\W/g, '');
  }

  findDinosaur(query, diet) {

  var sanitizedQuery = this.removeNonAlphanumeric(query);

   if (sanitizedQuery === '') {
     return [];
   }

   if (diet){
     var dinosaurs = this.props.everySingleDinosaur;
   }
   else {
     var dinosaurs = this.props.everySingleDinosaur;
   }

   const regex = new RegExp(`${sanitizedQuery.trim()}`, 'i');
   return dinosaurs.filter(dinosaur => dinosaur.name.search(regex) >= 0);
 }

  populateDinosaurs(dinosaurs){

    return new _.times(dinosaurs.length, (i) => ({
      id: i,
      index: i,
      key: i,
      name: dinosaurs[i].name,
      avatar: '',
      group: _.sample([
        'Work',
        'Friend',
        'Acquaintance',
        'Other'
      ]),
      email: 'Ha',
      locations: dinosaurs[i].coords,
      diet: dinosaurs[i].diet
  }))
}

  returnImageFromStored(){
    console.log("IMAGES", this.props.images);
    return this.props.images[0][this.state.activeItem.index];
  }

  getFlatListItems = () => {
    this.setState({ isLoading: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 2000);
  };

  setItemAsActive(activeItem) {
    this.setState({ scrollToItemRef: activeItem });
    this.setState({
      activeId: activeItem.index,
      activeItem: activeItem.item
    })
  }

  renderItem = (o, i) => {
    return (
      <View
        style={{
          flex: 4,
          // height:40,
          margin: 5,
          marginTop: 70,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => this.setItemAsActive(o)}
          style={[
            s.renderItem,
            this.state.activeId === _.get(o, 'item.id', false)
              ? { backgroundColor: 'black', borderRadius: 10 }
              : { backgroundColor: 'black' }
          ]}
        >
        <Image style={s.fossil} source={require('../assets/icons/footprint.png')}/>

          <Text
            style={[
              s.name2,
              this.state.activeId === o.item.id
                ? { color: 'limegreen', fontFamily: 'PoiretOne-Regular', fontSize: 16 }
                : { color: 'white', fontFamily: 'PoiretOne-Regular', fontSize: 16 }
            ]}
          >
            {o.item.name ? o.item.name : 'no name attribute'}
          </Text>

        </TouchableOpacity>
      </View>
    );
  };

  clearList() {
    this.setState({ items: [] });
  }
  onEndReached(o) {
    console.log(' reached end: ', o);
  }

  onViewableItemsChanged = ({ viewableItems }) =>
    this.setState({ viewableItems });

  render() {

    const self = this;

    const query = this.state.dinosaurTyped;
    const dinosaurs = this.findDinosaur(query, false);
    const dinosaursAndDiets = this.buildDinosaurNameAndDietList(this.findDinosaur(query, true));
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    const ListEmptyComponent = () => (
      <View
        style={{
          flex: 1,
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={() => this.getFlatListItems()}>
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: 20,
              textAlign: 'center',
              margin: 10
            }}
          >
            Nothing is Here!
          </Text>
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: 15,
              textAlign: 'center'
            }}
          >
            Try Again?
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={[s.container]}>

        <View style={s.innerContainer}>

          {!this.state.activeItem && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
            >
              <Text
                style={{
                  textAlignVertical: 'center',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 25,
                  fontFamily: 'PoiretOne-Regular',
                  margin: 30
                }}
              >
                Pick a dinosaur from the {this.props.eraName} period! Type its name into the search bar if you can't find the one you're looking for!
              </Text>
            </View>
          )}

          {this.state.activeItem && (
            <TouchableOpacity
              onPress={() => this.setItemAsActive(this.state.activeItem)}
              style={[DinoListViewStyle.renderItem, DinoListViewStyle.activeItem]}
            >

            <TouchableOpacity onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })}>
            <AutoHeightImage
         width={285}
         source={{uri: `${this.returnImageFromStored()}`}}
         />
         </TouchableOpacity>
              <Text style={{fontFamily: 'PoiretOne-Regular', fontSize: 20}} onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })}>
                {this.state.activeItem.name} {this.addPrecedingDash(this.state.activeItem.diet)}
                  <Text style = {{color: `${this.getDietTextColor(this.state.activeItem.diet)}`, fontFamily: 'PoiretOne-Regular', fontSize: 20}}>
                    {this.capitaliseDiet(this.state.activeItem.diet)}
                  </Text>
              </Text>

              {/*<Text style={[s.name, { color: '#fff' }]}>
                {_.get(this.state.activeItem, 'name', 'No Default')}
              </Text>*/}
            </TouchableOpacity>
          )}

        </View>

        <View style={{ flex: 1, height, width }}>
          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            //  initialNumToRender={5}
            horizontal

            ref={r => (this.refs = r)}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index
            })}
            //onEndReached={this._onEndReached}
            onRefresh={o => alert('onRefresh:', o)}
            initialScrollIndex={0}
            refreshing={this.state.isLoading}
            onEndReached={o => this.onEndReached}
            keyExtractor={(o, i) => o.key.toString()}
            data={this.state.items}
            scrollRenderAheadDistance={width * 2}
            renderItem={this.renderItem}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />
          <TouchableOpacity
            onPress={() => this.clearList()}
            style={{
              position: 'absolute',
              backgroundColor: 'ff5b5f',
              right: 35,
              top: 0,
              margin: 10,
              zIndex: 3,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent'
            }}
          >
            <Ionicons
              name={'ios-refresh-outline'}
              size={25}
              color="limegreen"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.clearList()}
            style={{
              position: 'absolute',
              backgroundColor: 'ff5b5f',
              right: 0,
              top: 0,
              margin: 10,
              zIndex: 3,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent'
            }}
          >

{/* This below icon (ios-globe-outline) is currently linked to 'delete' need to redirect to a MAP view (of all dinos)*/}
            <Ionicons
              name={'ios-globe-outline'}
              size={25}
              color="limegreen"
            />
          </TouchableOpacity>

{/* PAGINATION 'DOTS' ACROSS BOTTOM OF DINO-LIST PAGE, */}
          <Pagination
            horizontal
            debugMode={true}
            listRef={this.refs} //to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list
            endDotIconFamily={'MaterialIcons'}
            dotIconNameActive={'checkbox-blank-circle'}
            dotIconColorActive={'limegreen'}
            dotIconNameNotActive={'checkbox-blank-circle-outline'}
            dotIconColorNotActive={'limegreen'}
            dotIconNameEmpty={'close'}
            dotTextHide={true}
            dotTextColor={'limegreen'}
            dotIconSizeNotActive={15}
            dotIconSizeActive={15}
            dotIconSizeEmpty={15}
            dotColorhasNotSeen={"red"}
            paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
            paginationItems={this.state.items} //pass the same list as data
            paginationItemPadSize={3}
          />
        </View>

        {/* SEARCH BAR Section */}
                <View style={{position: 'absolute', top: '55%', marginLeft: 15, marginRight: 15 }}>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={{width: 300}}
                data={this.buildDinosaurNameList().length === 1 && comp(query, this.buildDinosaurNameList()[0]) ? [] : dinosaurs}
                defaultValue={query}
                inputContainerStyle={{flex: 1}}
                onChangeText={dinosaur => this.setState({ dinosaurTyped: dinosaur })}
                placeholder={this.searchBarPlaceholderText()}
                placeholderTextColor="white"
                placeholderTextFontFamily='PoiretOne-Regular'
                renderItem={({ dinosaur }) => (
                  <TouchableOpacity onPress={() => this.setState({ dinosaurTyped: `${dinosaur}` })}>
                  </TouchableOpacity>
                )}
              />

                {dinosaurs.length > 5 ? (
                  <View style={{backgroundColor: 'white', height: 220, paddingLeft: 10}}>
                  <ScrollView style={{flex: 1, flexWrap: 'wrap'}}>
                  {this.renderMatches(dinosaurs, dinosaursAndDiets)}
                  </ScrollView>
                  </View>
                ) : (
                  <View style={{backgroundColor: 'white', paddingLeft: 10}}>
                  <ScrollView>
                  {this.renderMatches(dinosaurs, dinosaursAndDiets)}
                  </ScrollView>
                  </View>
                )}
            </View>
        {/* End of SEARCH BAR Section */}


    <TouchableHighlight
      onPress={() => {
        this.props.returnToErasPage();
      }}>
    <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10}}/>
    </TouchableHighlight>


          /* Modal for individual dinosaur view */
          {
            self.state.searchedDinosaurData ? (

          <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.dinosaurViewVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View>

          <LinearGradient
          colors={['black', '#1e932d']}
          style={{ padding: 25 }}>

            <View style={DinoListViewStyle.infoModal}>

                <ScrollView>

                {
                  self.state.searchDataLoading ? (
                    <View style={{height: 200}}>
                      < BallIndicator count={7} size={65} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
                    </View>
                ) :

                <View style={{alignItems: "center", marginBottom: 15}}>
                <TouchableHighlight
                  onPress={() => {
                    this.addDinosaurToFavourites();
                    }}>
                      <Image source={require('../assets/icons/star.png')} style={{height: 40, width: 40, marginBottom: 10, position: 'relative'}}/>
                </TouchableHighlight>

                <AutoHeightImage
                  width={300}
                  source={{uri: `${this.state.searchedDinosaurImage}`}}
                />

                {
                  ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/omnivore.png") ? (

                    <View style={DinoListViewStyle.modalHeader}>

                    <Text style={[DinoListViewStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}>{this.returnClickedDinosaur()}</Text>
                    <Image source={ ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 65, height: 20, marginTop: 10, marginRight: 20}}/>
                    </View>
                ) :

                <View style={DinoListViewStyle.modalHeader}>
                <Text style={[DinoListViewStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}>{this.returnClickedDinosaur()}</Text>
                <Image source={ ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 30, height: 20, marginTop: 10, marginRight: 20}}/>
                </View>

                }

                {

                  Pronunciations.getPronunciation(this.returnClickedDinosaur()) ? (

                <View style={DinoListViewStyle.modalHeader}>
                <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}>{Pronunciations.getPronunciation(this.returnClickedDinosaur())} | {Meanings.getNameMeaning(this.returnClickedDinosaur())}</Text>
                </View>

              ) : null

              }

              {

                Lengths.getLength(this.returnClickedDinosaur()) ? (

              <View style={DinoListViewStyle.modalHeader}>
              <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}>Length: {Lengths.getLength(this.returnClickedDinosaur())} | Type:{Types.getType(this.returnClickedDinosaur())}</Text>
              </View>

            ) : null

            }

                <Image style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.returnClickedDinosaur())}/>

                <Text style={[DinoListViewStyle.infoModalText, {fontFamily: 'PoiretOne-Regular'}]}>{this.renderDescriptionElements(this.state.searchedDinosaurDescription)} </Text>

                </View>

            }

                  <TouchableHighlight
                    onPress={() => {
                      this.closeDinosaurView();
                    }}>
                  <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
                  </TouchableHighlight>
                  </ScrollView>
                </View>
                </LinearGradient>
              </View>
            </Modal>
          </View>

        ) : null
      }

          /* End of modal for individual dinosaur view */

      </View>
    );
  }
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  innerContainer: {
    flex: 1,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131f1f',
    // This is the grey background on top 1/2 of the screen
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
});

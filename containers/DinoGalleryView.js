import React, { Component } from 'react';
import ImageBackground from 'react-native';
import FitImage from 'react-native-fit-image';
import { Alert, Dimensions, FlatList, ScrollView, Image, TouchableHighlight, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, Modal, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo';
import _ from 'lodash';
import { MockRobotsList } from '../components/FakerMocks';
import Pagination from 'react-native-pagination';
import AutoHeightImage from 'react-native-auto-height-image';
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 100;
import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import * as ImageFinder from '../components/ImageFinder.js'
import * as Pronunciations from '../components/Pronunciations.js'
import * as Meanings from '../components/Meanings.js'
import * as Types from '../components/Types.js'
import * as Lengths from '../components/Lengths.js'
import { AsyncStorage } from "react-native"
import FossilMap from '../components/FossilMap.js';
import ViewDinosaurModal from '../components/ViewDinosaurModal.js';

export default class DinoGalleryView extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dinosaurClicked: "",
      dinosaurTyped: "",
      dinosaurViewVisible: false,
      isLoading: false,
      activeId: null,
      activeItem: null,
      items: null,
      searchDataLoading: false,
      newFavouriteAdded: false,
      fossilMapVisible: false
    };
    this.toggleDinosaurView = this.toggleDinosaurView.bind(this);
    this.closeDinosaurView = this.closeDinosaurView.bind(this);
    this.retrieveSearchedDinosaurData = this.retrieveSearchedDinosaurData.bind(this);
    this.onAddressBookImageLoad = this.onAddressBookImageLoad.bind(this);
    this.processImageDimensions = this.processImageDimensions.bind(this);
    this.calculateImageDimensions = this.calculateImageDimensions.bind(this);
    this.retrieveImageUrl = this.retrieveImageUrl.bind(this);
    this.setDinoProfilePictureAsLoaded = this.setDinoProfilePictureAsLoaded.bind(this);
    this.setFossilMapVisible = this.setFossilMapVisible.bind(this);
    this.closeFossilMap = this.closeFossilMap.bind(this);
    this.onDinosaurProfilePictureLoad = this.onDinosaurProfilePictureLoad.bind(this);
  }

  setFossilMapVisible(){
    this.setState({
      fossilMapVisible: true
    })
  }

  closeFossilMap(){
    this.setState({
      fossilMapVisible: false
    })
  }

  checkFavouriteStatus(clickedDinosaur) {
    try {
      AsyncStorage.getItem('dinosaur_favourites').then((dinosaurs) => {
        const dinos = dinosaurs ? JSON.parse(dinosaurs) : [];

        if (dinos.length > 0){
          var names = dinos.map((dino) => dino.name);

          if (names.includes(clickedDinosaur)){
            this.setState({clickedDinoAlreadyFavourite: true});
          }
          else {
            this.setState({clickedDinoAlreadyFavourite: false});
          }
        }
        else {
          this.setState({clickedDinoAlreadyFavourite: false});
        }
      }
    )
    }
      catch (error) {
        console.log(error);
    }
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
    var coords = this.state.searchedDinosaurData.coords
    var era = this.props.eraName

    var dinosaur = {name: name, era: era, coords: coords, diet: diet, description: description, pronunciation: pronunciation, meaning: meaning, length: length, type: type, image: image}

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
          this.setState({newFavouriteAdded: true}, function(){
            Alert.alert(
                   `${dinosaur.name} was added to your favourites!`
                )
          })
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
                 `${dinosaur.name} added to your favourites!`
              )
        }
        console.log("DINOS AFTER", dinos);
  })}
    catch (error) {
      console.log(error);
    }
}

  componentDidMount(){
    this.setState({
      items: this.populateDinosaurs(this.props.allDinosaurs.concat(this.props.everySingleDinosaur))
    }, function(){
      this._isMounted = true;
    })
  }

  retrieveInitialImageLink(dinosaur){
    this.checkFavouriteStatus(this.state.clickedDinosaur)
    console.log("DINOSAUR NAME", dinosaur);
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

  onAddressBookImageLoad(){
    this.setState({
      addressBookImageLoading: false
    })
  }

  calculateImageDimensions(){
    var aspectRatio = this.state.width / this.state.height;

    if (this.state.height > Dimensions.get('window').height*0.46){

      var height = Dimensions.get('window').width > 740 ? Dimensions.get('window').width*0.46 : Dimensions.get('window').width*0.52;
      var width = height * aspectRatio;

      if (width > Dimensions.get('window').width){
      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;
    }
    }

    else if (this.state.width > Dimensions.get('window').width*0.93){

      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;

      if (height > Dimensions.get('window').height*0.46){
        var height = Dimensions.get('window').width > 740 ? Dimensions.get('window').width*0.46 : Dimensions.get('window').width*0.52;
        var width = height * aspectRatio;
      }
    }

    else {
      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;

      if (height > Dimensions.get('window').height*0.46){
        var height = Dimensions.get('window').width > 740 ? Dimensions.get('window').width*0.46 : Dimensions.get('window').width*0.52;
        var width = height * aspectRatio;
      }
    }

    this.setState({
      addressBookImageHeight: height,
      addressBookImageWidth: width
    },
    function(){
      this.onAddressBookImageLoad();
    }
  )
  }

  processImageDimensions(){
    var uri = this.state.addressBookImage;

    try{

    Image.getSize(uri, (width, height) => {this.setState({width, height},

      function(){

        this.calculateImageDimensions();

      }
    )})
  }
    catch (error) {
      console.log(error);
      Alert.alert(
    'Could not load image.',
    "The image might be of an incompatible format."
    )
    }
  }

  returnImageUrl(){
    return `${this.state.searchedDinosaurImage}`
  }

  retrieveImageUrl(imageObject){
    var object = this.getImageAddress(imageObject);
    console.log("OBJECT IMAGE", object);
    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`

    axios.get(imgUrl).then( (response) => {

        this.setState({
          searchedDinosaurImage: this.handleImageUrl(response.data),
          addressBookImage: this.handleImageUrl(response.data),
          addressBookImageLoading: true
        }, function(){
          this.setState({
            searchDataLoading: false
          }, function(){
            if (this.state.addressBookImageLoading === true){
            this.processImageDimensions()
          }
          })
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

    getDietTextFromImageName(){

      if (ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/omnivore.png")){
        return "Omnivore"
      }
      else if (ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/carnivore.png")){
        return "Carnivore"
      }
      else if (ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/herbivore.png")){
        return "Herbivore"
      }
      else if (ImageFinder.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/diet_unknown.png")){
        return "Research inconclusive"
      }
      else {
        return
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
      searchDataLoading: true,
      dinoModalProfilePictureLoading: true
    }, function(){
      this.retrieveSearchedDinosaurData(this.state.clickedDinosaur)
    });
  }

  onDinosaurProfilePictureLoad(){
    this.setState({
      imagesLoading: false
    }, function(){
      console.log("LOADING", this.state.imagesLoading);

    })
  }

  closeDinosaurView(){
    this.setState({
      dinosaurViewVisible: false,
      dinosaurTyped: "",
      newFavouriteAdded: false
    });
  }

  searchBarPlaceholderText(){
    return `Search ${this.props.eraName} dinosaurs`
  }

  retrieveSearchedDinosaurData(dinosaur){
    for (dinosaur of this.state.items){
      if (dinosaur.name == this.state.clickedDinosaur){
        this.setState({
          searchedDinosaurData: dinosaur,
        },
        function(){
          console.log("Searched dinosaur data", this.state.searchedDinosaurData);
          this.retrieveDescription(this.state.clickedDinosaur)
      })
      }
    }
  }

  capitaliseDiet(diet){
    if (diet == "carnivore, omnivore" || diet == "carnivore, insectivore" || diet == "carnivore, piscivore" || diet == "piscivore, insectivore" || diet == "herbivore, omnivore"){
    return "Omnivore";
  }
    else if (diet == "carnivore" || diet == "omnivore" || diet == "herbivore"){
    return diet.charAt(0).toUpperCase() + diet.slice(1);
  }
    else {
      return "Diet unknown"
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
      return "- ";
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
      <Text style={{color: 'white', fontSize: 16, paddingTop: 10, paddingBottom: 10, fontFamily: 'PoiretOne-Regular'}} key={i}>{dinosaurAndDiet}</Text>
      </TouchableOpacity>
    )
  }

  setDinoProfilePictureAsLoaded(){
    this.setState({
      dinoModalProfilePictureLoading: false
    })
  }

  getDietTextColor(diet){
    if (diet === "carnivore"){
      return 'red';
    }
    if (diet === "herbivore"){
      return 'limegreen';
    }
    else {
      return 'skyblue';
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
     var dinosaurs = this.props.allDinosaurs.concat(this.props.everySingleDinosaur);
   }
   else {
     var dinosaurs = this.props.allDinosaurs.concat(this.props.everySingleDinosaur);
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
      coords: dinosaurs[i].coords,
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
      if (this._isMounted) {
    this.setState({ scrollToItemRef: activeItem });
    this.setState({
      activeId: activeItem.index,
      activeItem: activeItem.item,
      addressBookImageLoading: true
    }, function(){
          /* IMAGE LOADING METHOD TO RETRIEVE IMAGE FOR DINOSAURS (CURRENTLY ALL; ORIGINALLY JUST 18) */
          this.retrieveInitialImageLink(activeItem.item.name);
    })
  }
  }

  renderItem = (o, i) => {
    return (
      <View
        style={{
          flex: 1,
          // height:40,
          margin: 5,
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => this.setItemAsActive(o)}
          style={[
            s.renderItem,
            this.state.activeId === _.get(o, 'item.id', false)
              ? { backgroundColor: 'black', borderRadius: 10, marginBottom: 0 }
              : { backgroundColor: 'black', marginBottom: 0 }
          ]}
        >
        <AutoHeightImage width={Dimensions.get('window').width*0.25} source={require('../assets/icons/footprint.png')}/>

          <Text
            style={[
              s.name2,
              this.state.activeId === o.item.id
                ? { color: 'limegreen', fontFamily: 'PoiretOne-Regular', fontSize: 16 }
                : { color: 'white', fontFamily: 'PoiretOne-Regular', fontSize: 16 }
            ]}
          >
            {o.item.name ? o.item.name : 'Unknown'}
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
                  fontSize: 21,
                  fontFamily: 'PoiretOne-Regular',
                  margin: 30
                }}
              >
                Scroll through the {this.props.eraName} era gallery and tap the footprints for more info.
              </Text>
            </View>
          )}

          {this.state.activeItem && (

            <TouchableOpacity
              onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })}
              style={[DinoListViewStyle.renderItem, DinoListViewStyle.activeItem]}
            >
            {
              this.state.addressBookImageLoading ? (

                <View style={{backgroundColor: 'black', width: width*0.35, height: height*0.35}}>
                  < DotIndicator Indicator count={5} size={10} color={'limegreen'}/>
                </View>
       ) :

      null

     }


     {
       this.state.searchedDinosaurImage && !this.state.addressBookImageLoading ? (

         <TouchableOpacity style={{backgroundColor: 'black'}} onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })}>

         <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.20, height: Dimensions.get('window').height*0.6, width: Dimensions.get('window').width, borderWidth: 1, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20}}>


         <Image
           style={{width: this.state.addressBookImageWidth, height: this.state.addressBookImageHeight, borderRadius: 10}}
           source={{uri: `${this.state.addressBookImage}`}}
           onLoad={this.onAddressBookImageLoad}
           />

           <Text onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })} style={{marginTop: Dimensions.get('window').height*0.02, textAlign: 'center', color: 'white', fontFamily: 'PoiretOne-Regular', fontSize: 20, paddingLeft: 0}} >
            Click image to view
           </Text>

          </View>

          </TouchableOpacity>


      ) :

      null

      }



      {
        this.state.searchedDinosaurImage && !this.state.addressBookImageLoading ? (

        null
           ) :

          null

          }

            </TouchableOpacity>
          )}

        </View>

        <View style={{ flex: 1, height: height, width}}>
          <FlatList
          style={{marginBottom: -(height*0.08)}}
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
            onRefresh={o => console.log(o)}
            initialScrollIndex={0}
            refreshing={this.state.isLoading}
            onEndReached={o => this.onEndReached}
            keyExtractor={(o, i) => o.key.toString()}
            data={this.state.items}
            scrollRenderAheadDistance={width * 2}
            renderItem={this.renderItem}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />

        {
          this.state.items ? (
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
        ) : null
      }
        </View>

        <View style={{flexDirection: 'row', position: 'absolute', top: height*0.065}}>
    <TouchableHighlight
      onPress={() => {
        this.props.returnToErasPage();
      }}>
    <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginBottom: 17, marginRight: Dimensions.get('window').width*0.06}}/>
    </TouchableHighlight>

    <TouchableHighlight
      onPress={() => {
        this.props.toggleLayout();
      }}>
    <Image source={require('../assets/icons/toggleview.png')} style={{height: 25, width: 25, marginBottom: 17, marginLeft: Dimensions.get('window').width*0.06}}/>
    </TouchableHighlight>

    </View>

    {
      this.state.searchedDinosaurImage && !this.state.addressBookImageLoading ? (

    <View style={{flexDirection: 'column', position: 'absolute', top: Dimensions.get('window').height*0.14}}>
    <Text style={[DinoListViewStyle.galleryNameHeader, {fontFamily: 'PoiretOne-Regular', textAlign: 'center'}]}>{this.state.activeItem.name}</Text>
    </View>

    ) :

    null

    }

          {
            self.state.searchedDinosaurData ? (

              <ViewDinosaurModal

              dinosaurViewVisible={self.state.dinosaurViewVisible}
              searchDataLoading={self.state.searchDataLoading}
              searchedDinosaurImage={self.state.searchedDinosaurImage}
              newFavouriteAdded={self.state.newFavouriteAdded}
              clickedDinoAlreadyFavourite={self.state.clickedDinoAlreadyFavourite}
              addDinosaurToFavourites={self.addDinosaurToFavourites}
              addressBookImage={self.state.addressBookImage}
              addressBookImageWidth={self.state.addressBookImageWidth}
              addressBookImageHeight={self.state.addressBookImageHeight}
              onDinosaurProfilePictureLoad={self.onDinosaurProfilePictureLoad}
              imagesLoading={self.state.imagesLoading}
              searchedDinosaurData={self.state.searchedDinosaurData}
              returnClickedDinosaur={self.state.clickedDinosaur}
              getDietTextFromImageName={self.getDietTextFromImageName()}
              setFossilMapVisible={self.setFossilMapVisible}
              closeDinosaurView={self.closeDinosaurView}
              renderDescriptionElements={self.renderDescriptionElements}
              searchedDinosaurDescription={self.searchedDinosaurDescription}
              fossilMapVisible={self.state.fossilMapVisible}
              closeFossilMap={self.closeFossilMap}
              dinosaurClicked={self.state.dinosaurClicked}

              />


        ) : null
      }

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
    flex: 1.17,
    position: 'relative',
    top: height*0.15,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    // This is the grey background on top 1/2 of the screen
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
});

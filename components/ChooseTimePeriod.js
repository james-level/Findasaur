import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, ScrollView, Image, TouchableHighlight, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, Modal, Platform } from 'react-native';
import faker from 'faker';
import { LinearGradient } from 'expo';
import TimePeriodPage from './TimePeriodPage';
import NavBarAndroidLight from './NavBarAndroidLight'
import NavBarIOSLight from './NavBarIOSLight'
import Pagination from 'react-native-pagination';
import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';
import _ from 'lodash';
import { MockTweetList } from './FakerMocks';
import axios from 'axios';
import AutoHeightImage from 'react-native-auto-height-image';
import Autocomplete from 'react-native-autocomplete-input';
import EraOverlay from './EraOverlay.js';
import AddFavouriteOverlay from './AddFavouriteOverlay.js';
import GlobalSearch from './GlobalSearch.js';
import AndroidGlobalSearch from './AndroidGlobalSearch.js';
import * as ImageFinder from './ImageFinder.js'
import * as Pronunciations from './Pronunciations.js'
import * as Meanings from './Meanings.js'
import * as Types from './Types.js'
import * as Lengths from './Lengths.js'
import EraFavourites from './EraFavourites.js';
import Favourites from './Favourites.js'
import TimePeriodStyle from '../Stylesheets/TimePeriodStyle.js';
import { AsyncStorage } from "react-native"
import DinoListView from './DinoListView.js';
import DinoGalleryView from './DinoGalleryView.js';
import MapView from 'react-native-maps';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import ChooseTimePeriodStyle from '../Stylesheets/ChooseTimePeriodStyle.js';
import TimePeriodPageStyle from '../Stylesheets/TimePeriodStyle.js';
import FossilMap from './FossilMap.js';
import GlobalFossilMap from './GlobalFossilMap.js';


export default class ChooseTimePeriod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slicedDinosaurs: null,
      eraModalVisible: false,
      favouritesVisible: false,
      animatedFavouriteOverlayVisible: false,
      searchOverlayVisible: false,
      imagesLoading: false,
      images: [],
      dinosaurDescriptions: [],
      dinosaurs: null,
      dinosaurViewVisible: false,
      diets: null,
      herbivores: null,
      carnivores: null,
      omnivores: null,
      imagesLoaded: false,
      backClicked: false,
      favouritesVisible: false,
      searchedDinosaurData: null,
      items: [

        {
          id: 0,
          index: 0,
          key: 0,
          title: "Late Cretaceous",
          color: '#000000',
          description: "The Late Cretaceous (100.5 to 66 million years ago) is the younger of two epochs into which the Cretaceous period is divided in the geologic timescale. Rock strata from this epoch form the Upper Cretaceous series. The Cretaceous is named after the white limestone known as chalk which occurs widely in northern France and is seen in the white cliffs of south-eastern England, and which dates from this time.",
          image: faker.internet.avatar(),
          earliest_date: 66,
          latest_date: 100,
          other_title: "Late Cretaceous Era"
        },

        {
          id: 1,
          index: 1,
          key: 1,
          title: "Early Cretaceous",
          color: '#000000',
          description: "The Early Cretaceous (geochronological name) or the Lower Cretaceous (chronostratigraphic name) is usually considered to stretch from 146 million to 100 million years ago. It saw many new types of dinosaurs appear or come into prominence, while survivors from the Late Jurassic continued. Angiosperms (flowering plants) first appeared during the Early Cretaceous. This time also saw the evolution of the first members of the Neornithes (modern birds).",
          image: faker.internet.avatar(),
          earliest_date: 100,
          latest_date: 145,
          other_title: "Early Cretaceous Era"
        },

        {
          id: 2,
          index: 2,
          key: 2,
          title: "Late Jurassic",
          color: '#000000',
          description: "The Late Jurassic is the third epoch of the Jurassic period, and it spans the geologic time from 163.5 ± 1.0 to 145.0 ± 0.8 million years ago (Ma), which is preserved in Upper Jurassic strata. In European lithostratigraphy, the name 'malm' indicates rocks of Late Jurassic age. In the past, this name was also used to indicate the unit of geological time, but this usage is now discouraged to make a clear distinction between lithostratigraphic and geochronologic/chronostratigraphic units.",
          image: faker.internet.avatar(),
          earliest_date: 145,
          latest_date: 163,
          other_title: "Late Jurassic Era"
        },

        {
          id: 3,
          index: 3,
          key: 3,
          title: "Middle Jurassic",
          color: '#000000',
          description: "The Middle Jurassic is the second epoch of the Jurassic Period. It lasted from about 174 to 163 million years ago. Fossil-bearing rocks from the Middle Jurassic are relatively rare, but some important formations include the Forest Marble Formation in England, the Kilmaluag Formation in Scotland, the Daohugou Beds in China, Itat Formation in Russia, and the Isalo III Formation of western Madagascar.",
          image: faker.internet.avatar(),
          earliest_date: 163,
          latest_date: 174,
          other_title: "Middle Jurassic Era"
        },

        {
          id: 4,
          index: 4,
          key: 4,
          title: "Early Jurassic",
          color: '#000000',
          description: "The Early Jurassic epoch (in chronostratigraphy corresponding to the Lower Jurassic series) is the earliest of three epochs of the Jurassic period. The Early Jurassic starts immediately after the Triassic-Jurassic extinction event, 201.3 Ma (million years ago), and ends at the start of the Middle Jurassic 174.1 Ma. Certain rocks of marine origin of this age in Europe are called 'Lias' and that name was used for the period, as well, in 19th-century geology. In southern Germany rocks of this age are called Black Jurassic.",
          image: faker.internet.avatar(),
          earliest_date: 174,
          latest_date: 201,
          other_title: "Early Jurassic Era"
        },

        {
          id: 5,
          index: 5,
          key: 5,
          title: "Late Triassic",
          color: '#000000',
          description: "The Late Triassic (201 to 237 million years ago) is the third and final of three epochs of the Triassic Period in the geologic timescale. The Triassic-Jurassic extinction event began during this epoch and is one of the five major mass extinction events of the Earth. The corresponding series is known as the Upper Triassic.",
          image: faker.internet.avatar(),
          earliest_date: 201,
          latest_date: 237,
          other_title: "Late Triassic Era"
        },
        {
          id: 6,
          index: 6,
          key: 6,
          title: "Middle Triassic",
          color: '#000000',
          description: "In the geologic timescale, the Middle Triassic is the second of three epochs of the Triassic period or the middle of three series in which the Triassic system is divided. It spans the time between 247.2 Ma and 237 Ma (million years ago). The Middle Triassic is divided into the Anisian and Ladinian ages or stages. Formerly the middle series in the Triassic was also known as Muschelkalk.",
          image: faker.internet.avatar(),
          earliest_date: 237,
          latest_date: 247,
          other_title: "Middle Triassic Era"
        },
      ],
      clickedDinoAlreadyFavourite: false,
      fossilMapVisible: false,
      globalMapLoading: false,
      globalFossilMapVisible: false,
      globalMapActive: false,
      vertical: Dimensions.get('window').width < 500 ? true : false,
      globalFavouritesVisible: false,
    };

    this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchBarClick = this.handleSearchBarClick.bind(this);
    this.retrieveImagesAndDescriptions = this.retrieveImagesAndDescriptions.bind(this);
    this.toggleDinosaurListView = this.toggleDinosaurListView.bind(this);
    this.saveDescriptionToState = this.saveDescriptionToState.bind(this);
    this.returnToErasPage = this.returnToErasPage.bind(this);
    this.setEraModalVisible = this.setEraModalVisible.bind(this);
    this.closeEraModal = this.closeEraModal.bind(this);
    this.setFavouritesVisible = this.setFavouritesVisible.bind(this);
    this.setSearchOverlayVisible = this.setSearchOverlayVisible.bind(this);
    this.closeSearchOverlay = this.closeSearchOverlay.bind(this);
    this.getAllDinosaursForGlobalSearch = this.getAllDinosaursForGlobalSearch.bind(this);
    this.setClickedDinosaur = this.setClickedDinosaur.bind(this);
    this.setClickedDinosaurViaMap = this.setClickedDinosaurViaMap.bind(this);
    this.setImagesLoading = this.setImagesLoading.bind(this);
    this.closeDinosaurView = this.closeDinosaurView.bind(this);
    this.onDinosaurProfilePictureLoad = this.onDinosaurProfilePictureLoad.bind(this);
    this.addDinosaurToFavourites = this.addDinosaurToFavourites.bind(this);
    this.checkFavouriteStatus = this.checkFavouriteStatus.bind(this);
    this.setFavouriteAnimationOverlayVisible = this.setFavouriteAnimationOverlayVisible.bind(this);
    this.closeFavouriteAnimationOverlay = this.closeFavouriteAnimationOverlay.bind(this);
    this.setFossilMapVisible = this.setFossilMapVisible.bind(this);
    this.closeFossilMap = this.closeFossilMap.bind(this);
    this.setGlobalFossilMapVisible = this.setGlobalFossilMapVisible.bind(this);
    this.closeGlobalFossilMap = this.closeGlobalFossilMap.bind(this);
    this.setGlobalFavouritesVisible = this.setGlobalFavouritesVisible.bind(this);
    this.toggleLayout = this.toggleLayout.bind(this);
  }

  componentDidMount(){

      this.getAllDinosaursForGlobalSearch(0, 247)

  }

  toggleLayout(){
    this.setState({
      vertical: !this.state.vertical
    })
  }

  closeDinosaurView(){

    this.setState({
      dinosaurViewVisible: false,
      imagesLoading: false,
    }, function(){
      this.setState({
        globalMapLoading: this.state.globalMapActive === true ? true : false,
        newFavouriteAdded: false,
        globalFossilMapVisible: this.state.globalMapActive === true ? true : false
      })
    })
  }

  onDinosaurProfilePictureLoad(){
    this.setState({
      imagesLoading: false
    }, function(){
      console.log("LOADING", this.state.imagesLoading);

    })
  }

  checkFavouriteStatus(clickedDinosaur) {
    try {
      AsyncStorage.getItem('dinosaur_favourites').then((dinosaurs) => {
        const dinos = dinosaurs ? JSON.parse(dinosaurs) : [];

        if (dinos.length > 0){
          var names = dinos.map((dino) => dino.name);

          if (names.includes(clickedDinosaur)){
            this.setState({clickedDinoAlreadyFavourite: true}, function(){
              this.handleSearchBarClick()
            });
          }
          else {
            this.setState({clickedDinoAlreadyFavourite: false},
            function(){
              this.handleSearchBarClick();
            });
          }
        }
        else {
          this.setState({clickedDinoAlreadyFavourite: false}, function(){
            this.handleSearchBarClick();
          });
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
    var diet = this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet
    var image = this.state.addressBookImage
    var coords = this.retrieveDinosaurFromName(this.state.clickedDinosaur).coords
    var era = this.state.viewableItems[0].item.title

    var self = this;

    var dinosaur = {name: name, coords: coords, era: era, diet: diet, description: description, pronunciation: pronunciation, meaning: meaning, length: length, type: type, image: image}

    try {
      AsyncStorage.getItem('dinosaur_favourites').then((dinosaurs) => {
        const dinos = dinosaurs ? JSON.parse(dinosaurs) : [];
        if (dinos.length > 0){
          var names = dinos.map((dino) => dino.name);
          if (!names.includes(dinosaur.name)){
          dinos.push(dinosaur);
          AsyncStorage.setItem('dinosaur_favourites', JSON.stringify(dinos));
          this.setState({newFavouriteAdded: true}, function(){
            this.setState({
              animatedFavouriteOverlayVisible: true
            }, function(){
            setTimeout(function(){

              self.setState({

                animatedFavouriteOverlayVisible: false

              })

            }, 6000)})
            // Alert.alert(
            //        `Successfully added ${dinosaur.name} to your favourites!`
            //     )
          }
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

  retrieveSearchedDinosaurData(dinosaur){

        this.setState({
          searchedDinosaurData: dinosaur,
          dinosaurViewVisible: true
        },
        function(){ this.retrieveDescription(this.state.clickedDinosaur)
      })
  }

  retrieveDescription(dinosaur){
    console.log("DINO", dinosaur);
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

  returnClickedDinosaur(){
    return this.state.clickedDinosaur;
  }

  retrieveInitialImageLink(dinosaur){
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
            this.processImageDimensions()
          }
          )
          console.log("STATE SEARCH IMAGE", this.state.searchedDinosaurImage);

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

  setFavouritesVisible() {
  this.setState({favouritesVisible: !this.state.favouritesVisible}, function(){
    this.renderEraFavouritesPage(this.state.viewableItems[0].item.title)
  });
}

  setGlobalFavouritesVisible(){
    this.setState({globalFavouritesVisible: !this.state.globalFavouritesVisible});
  }

  setEraModalVisible(){
    this.setState({
      eraModalVisible: true
    })
  }

  closeEraModal(){
    this.setState({
      eraModalVisible: false
    })
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

  setGlobalFossilMapVisible(){
    var self  = this;

    this.setState({
      clickedDinosaur: null,
      globalMapLoading: true,
    }, function(){
    this.setState({
      globalMapActive: true
    },
    function(){
    setTimeout(function(){

      self.setState({

        globalFossilMapVisible: true,

      }, function(){
        setTimeout(function(){
        self.setState({
          globalMapLoading: false
        })
      }, 500)
      })

    }, 4600)})
  })
  }

  closeGlobalFossilMap(){
    this.setState({
      clickedDinosaur: null,
      globalMapLoading: false
      },
    function(){
    this.setState({
      globalFossilMapVisible: false,
      globalMapActive: false,
      globalMapReloading: false
    })
  }
)
  }

  setFavouriteAnimationOverlayVisible(){
    this.setState({
      animatedFavouriteOverlayVisible: true
    })
  }

  closeFavouriteAnimationOverlay(){
    this.setState({
      animatedFavouriteOverlayVisible: false
    })
  }

  setSearchOverlayVisible(){
    this.setState({
      searchOverlayVisible: true
    })
  }

  closeSearchOverlay(){
    this.setState({
      searchOverlayVisible: false,
      typedDinosaur: ""
    })
  }

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  setImagesLoading(){
    this.setState({
      imagesLoading: true
    }, function(){
        this.checkFavouriteStatus(this.state.clickedDinosaur);
    })
  }

  calculateImageDimensions(){
    var aspectRatio = this.state.width / this.state.height;

    if (this.state.height > Dimensions.get('window').height*0.55){

      var height = Dimensions.get('window').width*0.55;
      var width = height * aspectRatio;

      if (width > Dimensions.get('window').width){
      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;
    }
    }

    else if (this.state.width > Dimensions.get('window').width*0.93){

      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;

      if (height > Dimensions.get('window').height*0.55){
        var height = Dimensions.get('window').height*0.55;
        var width = height * aspectRatio;
      }
    }

    else {
      var width = Dimensions.get('window').width*0.90;
      var height = width / aspectRatio;

      if (height > Dimensions.get('window').height*0.55){
        var height = Dimensions.get('window').height*0.55;
        var width = height * aspectRatio;
      }
    }

    this.setState({
      addressBookImageHeight: height,
      addressBookImageWidth: width
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
    'Sorry, we could not load image',
    "The image might be of an incompatible format"
    )
    }
  }

  handleSearchBarClick(){

    var self = this;

    self.setState({
      searchBarDinosaurClicked: true

    }, function(){

      setTimeout(function(){

        self.setState({

          backClicked: false,
          images: [],
          dinosaurDescriptions: [],
          dinosaurs: null,
          diets: null,
          herbivores: null,
          carnivores: null,
          omnivores: null,
          imagesLoaded: false,
          searchedDinosaurImage: null

        }, function(){

          this.retrieveSearchedDinosaurData(this.state.clickedDinosaur)
        })

      }, 1000);
    })
  }

  setClickedDinosaurViaMap(dinosaur){
    this.setState({
      clickedDinosaur: dinosaur,
      globalFossilMapVisible: false,
      searchOverlayVisible: false,
      globalMapActive: true
    }, function(){
      this.setImagesLoading()
    });
  }

  setClickedDinosaur(dinosaur){
    this.setState({
      clickedDinosaur: dinosaur,
      searchOverlayVisible: !this.state.searchOverlayVisible
    }, function(){
      this.setImagesLoading()
    });
  }

  handleSearchSubmit(){

    var self = this;

    self.setState({
      imagesLoading: true,
      clickedDinosaur: null

    }, function(){

      setTimeout(function(){

        self.setState({

          backClicked: false,
          images: [],
          dinosaurDescriptions: [],
          dinosaurs: null,
          diets: null,
          herbivores: null,
          carnivores: null,
          omnivores: null,
          imagesLoaded: false

        }, function(){
          var earliest_date = self.state.viewableItems[0].item.earliest_date;
          var latest_date = self.state.viewableItems[0].item.latest_date;
          self.getDinosaursForPeriod(earliest_date, latest_date);
        })

      }, 2000);

    })
  }

  toggleDinosaurListView(){
    this.setState({
      imagesLoaded: true
    })
  }

  getLoadingScreenMessage(){

    if (this.state.globalMapLoading === true && this.state.clickedDinosaur) {
      return "Reloading fossil map..."
    }

    else if (this.state.globalMapLoading === true) {
      return "Loading fossil map..."
    }

    else if (this.state.clickedDinosaur) {
      return `${this.state.clickedDinosaur} loading...`
    }

      else {
        return `Finding ${this.state.viewableItems[0].item.title} dinosaurs...`
  }
}

  renderEraFavouritesPage(era){

    switch(era) {
    case 'Late Cretaceous': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Early Cretaceous': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Late Jurassic': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Middle Jurassic': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Early Jurassic': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Late Triassic': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
    case 'Middle Triassic': return <EraFavourites era={era} favouritesVisible={this.state.favouritesVisible} setFavouritesVisible={this.setFavouritesVisible} fontLoaded={this.props.fontLoaded}  />
}
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

  getDietTextFromImageName(){

    if (ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet) === require("../assets/icons/omnivore.png")){
      return "Omnivore"
    }
    else if (ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet) === require("../assets/icons/carnivore.png")){
      return "Carnivore"
    }
    else if (ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet) === require("../assets/icons/herbivore.png")){
      return "Herbivore"
    }
    else if (ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet) === require("../assets/icons/diet_unknown.png")){
      return "Research inconclusive"
    }
    else {
      return
    }

  }

  retrieveImage(url){
    return fetch(url)
      .then((response) => response.json());
  }

  retrieveImagesAndDescriptions(){

    var numberOfDinosaurs = this.state.dinosaurs.length;
    var lowerIndexLimit = numberOfDinosaurs - 18;
    var lowerDinosaurIndex = Math.random() * lowerIndexLimit;
    var upperDinosaurIndex = lowerDinosaurIndex + 18;
    var dinosaurs = this.state.dinosaurs.slice(lowerDinosaurIndex, upperDinosaurIndex);
    var modifiedDinosaurs = this.state.dinosaurs.splice(lowerDinosaurIndex, 18)

    this.setState({slicedDinosaurs: dinosaurs}, function(){

      this.setState({
        imagesLoading: false
      }, function(){
        this.toggleDinosaurListView();
      })


      if (1 > 2){

      Promise.all(this.state.slicedDinosaurs.map((dinosaur) => {
        var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${dinosaur.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
        return this.retrieveWikiDescription(url);
      }))
      .then(() => {
        
        Promise.all(this.state.slicedDinosaurs.map((dinosaur) => {
          var imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${dinosaur.name}&format=json&prop=pageimages&origin=*`
          return this.retrieveImageFileName(imageUrl)
        }))
        .then((images) => {
          var imageObject = images;
          var imgAddress = this.getImageAddress(imageObject);
          Promise.all(imgAddress.map((object) => {
            var imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`
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
    })
  }

  returnToErasPage(){
    this.setState({
      backClicked: true,
      vertical: Dimensions.get('window').width < 500 ? true : false
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

      }, function(){ console.log("MOVING ON TO NEXT ONE "); this.retrieveImagesAndDescriptions() })
      }).catch((err) => {
        console.log("ERRORED OUT");
        console.error(err);
      })
  }

  getAllDinosaursForGlobalSearch(earliest_date, latest_date){

    var self = this;
    // URL currently hardcoded with dates for the earliest period (Middle Triassic - 237-247 million years ago)
    const url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${earliest_date}&max_ma=${latest_date}`

    axios.get(url).then((response) => {

      self.setState({

        allDinosaursForGlobalSearch: self.filterByGenusName(self.filterDinosaurData(response.data.records))

      }, function(){
        var names = []
        for (dinosaur of this.state.allDinosaursForGlobalSearch){
          names.push(dinosaur.name)
        }
        this.setState({
          allSearchableDinosaurNames: names
        }, function(){
          this.setState({
          globalSearchDataLoaded: true
        })
        })
      })
      })
  }

  retrieveDinosaurFromName(name){
    for (dinosaur of this.state.allDinosaursForGlobalSearch){
      if (dinosaur.name === name)
      {
        return dinosaur
      }
    }
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
    setEraModalVisible={this.setEraModalVisible}
    imagesLoading={this.state.imagesLoading}
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
    other_title={item.other_title}
  />);

  _keyExtractor = (item, index) => item.id.toString()
  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => this.setState({ viewableItems })
  render() {

    var self = this;

    if (this.state.imagesLoaded === false || this.state.backClicked){

      const NavBar = Platform.OS === 'ios' ? NavBarIOSLight : NavBarAndroidLight

    return (

      <View style={[ ChooseTimePeriodStyle.container ]}>

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
            this.state.imagesLoading || this.state.globalMapLoading ? (
              <View style={{backgroundColor: 'black', top: '0%', height: '100%'}}>
              <View style={{backgroundColor: 'black', top: '0%', height: '90%'}}>
                < BallIndicator count={7} size={65} color={'limegreen'} style={{backgroundColor: 'black'}} />
              </View>
              </View>
        ) : null

      }

        {
            this.state.imagesLoading || this.state.globalMapLoading ? (

        <View style={{backgroundColor: 'black', top: '0%', height: '50%', alignItems: 'center', top: '-45%'}}>
          <Text style={[ChooseTimePeriodStyle.loadingText, {fontFamily: 'PoiretOne-Regular'}]}>{this.getLoadingScreenMessage()}</Text>
        </View>

      ) : null
    }

    {
      this.props.fontLoaded && this.state.globalSearchDataLoaded ? (

      <GlobalFossilMap setClickedDinosaur={this.setClickedDinosaurViaMap} globalFossilMapVisible={this.state.globalFossilMapVisible} allDinosaurs={this.state.allDinosaursForGlobalSearch} closeGlobalFossilMap={this.closeGlobalFossilMap}/>

    ) : null

    }

          <View style={ChooseTimePeriodStyle.iconsContainer}>

          <TouchableHighlight
          style={{position: 'relative', top: '0%'}}
            onPress={() => {
              this.props.home();
              }}>
                <Image source={require('../assets/icons/home.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
          </TouchableHighlight>

          <TouchableHighlight
          style={{position: 'relative', top: '0%'}}
            onPress={() => {
              this.setGlobalFavouritesVisible();
              }}>
                <Image source={require('../assets/icons/favourite.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
          </TouchableHighlight>

          { this.state.globalSearchDataLoaded ? (

            <TouchableHighlight
          style={{position: 'relative', top: '0%'}}
            onPress={() => {
              this.setGlobalFossilMapVisible();
              }}>
                  <Image source={require('../assets/globe.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
            </TouchableHighlight>

        ) :

        <TouchableHighlight
        style={{position: 'relative', top: '0%'}}
            onPress={() => {
              Alert.alert(
                     "Loading dinosaur data... Please wait a moment"
                  )
              }}>
              <Image source={require('../assets/globegrey.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
        </TouchableHighlight>

      }

          { this.state.globalSearchDataLoaded ? (

            <TouchableHighlight
            style={{position: 'relative', top: '0%'}}
              onPress={() => {
                this.setSearchOverlayVisible();
                }}>
                  <Image source={require('../assets/icons/search.png')} style={{height: 32, width: 32, position: 'relative'}}/>
            </TouchableHighlight>

          ) :

          <TouchableHighlight
          style={{position: 'relative', top: '0%'}}
            onPress={() => {
              Alert.alert(
                     "Loading dinosaur data... Please wait a moment"
                  )
              }}>
                <Image source={require('../assets/icons/grey_search.png')} style={{height: 32, width: 32, position: 'relative'}}/>
          </TouchableHighlight>

        }

          </View>


      {
        this.props.fontLoaded && this.state.globalFavouritesVisible ? (

      <Favourites favouritesVisible={this.state.globalFavouritesVisible} setFavouritesVisible={this.setGlobalFavouritesVisible} fontLoaded={this.props.fontLoaded} />

    ) : null

  }


  {
      this.props.fontLoaded && this.state.viewableItems ? (

      <EraOverlay eraTitle={this.state.viewableItems[0].item.other_title} eraDescription={this.state.viewableItems[0].item.description} closeEraModal={this.closeEraModal} eraModalVisible={this.state.eraModalVisible} setEraModalVisible={this.setEraModalVisible} fontLoaded={this.props.fontLoaded} />

    ) : null
  }

  {
      Platform.OS === 'ios' && this.props.fontLoaded && this.state.viewableItems && this.state.globalSearchDataLoaded ? (

      <GlobalSearch handleSearchBarClick={this.handleSearchBarClick} typedDinosaur={this.state.typedDinosaur} names={this.state.allSearchableDinosaurNames} dinosaurs={this.state.allDinosaursForGlobalSearch} eraTitle={this.state.viewableItems[0].item.other_title} eraDescription={this.state.viewableItems[0].item.description} closeSearchOverlay={this.closeSearchOverlay} searchOverlayVisible={this.state.searchOverlayVisible} setSearchOverlayVisible={this.setSearchOverlayVisible}  setClickedDinosaur={this.setClickedDinosaur} fontLoaded={this.props.fontLoaded} />

    ) : null
  }

  {
      Platform.OS === 'android' && this.props.fontLoaded && this.state.viewableItems && this.state.globalSearchDataLoaded ? (

      <AndroidGlobalSearch handleSearchBarClick={this.handleSearchBarClick} typedDinosaur={this.state.typedDinosaur} names={this.state.allSearchableDinosaurNames} dinosaurs={this.state.allDinosaursForGlobalSearch} eraTitle={this.state.viewableItems[0].item.other_title} eraDescription={this.state.viewableItems[0].item.description} closeSearchOverlay={this.closeSearchOverlay} searchOverlayVisible={this.state.searchOverlayVisible} setSearchOverlayVisible={this.setSearchOverlayVisible}  setClickedDinosaur={this.setClickedDinosaur} fontLoaded={this.props.fontLoaded} />

    ) : null
  }


    {
      this.props.fontLoaded && this.state.viewableItems && this.state.favouritesVisible ? (

        this.renderEraFavouritesPage(this.state.viewableItems[0].item.title)

    ) : null
  }

      {
        !this.state.imagesLoading ? (

            <Pagination
        // DotThemeLight
          horizontal
          dotOnPress={(o) => console.log(' clicked: ', o)}
          hideEmptyDots
          pagingEnabled
          startDotIconFamily="Ionicons"
          startDotIconName="md-arrow-round-back"
          startDotIconColor="#66CD00"
          startDotIconSize={30}
          endDotIconSize={30}
          endDotIconFamily="Ionicons"
          endDotIconName="md-arrow-round-forward"
          endDotIconColor="#66CD00"
          dotIconName="ios-close"
            hideEmptyDots
          dotEmptyHide
          dotIconColorActive="limegreen"
          dotIconColorNotActive="limegreen"
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

      ) : null

    }

    {
      self.state.searchedDinosaurData && self.state.dinosaurViewVisible ? (

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
    colors={['black', 'black']}
    style={{ padding: 25, height: Dimensions.get('window').height }}>

      <View style={DinoListViewStyle.infoModal}>

          <ScrollView>

          {
            this.state.searchDataLoading || !this.state.searchedDinosaurImage ? (
              <View style={{height: Dimensions.get('window').height}}>
                < BallIndicator count={7} size={80} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
              </View>
          ) :

          <View style={{alignItems: "center", marginBottom: 15}}>

          {this.state.newFavouriteAdded || this.state.clickedDinoAlreadyFavourite === true ? (

          <View style={{borderRadius: 25, justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 10}}>
          <Text style={{paddingTop: 15, fontSize: 22, marginRight: 15, color: 'yellow', fontFamily: 'PoiretOne-Regular', padding: 10}}>Favourite</Text>
          <TouchableHighlight
            onPress={() => {
              this.addDinosaurToFavourites();
              }}>
                <Image source={require('../assets/icons/star.png')} style={{height: 30, width: 30, marginRight: 7, marginBottom: 10, marginTop: 10, position: 'relative'}}/>
          </TouchableHighlight>
          </View>

        ) :
        <View style={{borderRadius: 25, justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 10}}>
        <Text
          style={{
            paddingTop: 15,
            fontSize: 22,
            marginRight: 15,
            color: 'limegreen',
            fontFamily: 'PoiretOne-Regular',
            padding: 10,
            paddingTop: 20 }}
            >Add to Favourites
        </Text>
        <TouchableHighlight
          onPress={() => {
            this.addDinosaurToFavourites();
            }}>
              <Image
              source={require('../assets/icons/grey_star.png')} style={{
                height: 30,
                width: 30,
                marginRight: 7,
                marginBottom: 10,
                marginTop: 10,
                position: 'relative'
            }}/>
        </TouchableHighlight>
        </View>
      }

          {

            self.state.addressBookImage && self.state.addressBookImageWidth && self.state.addressBookImageHeight ? (

            <Image
                style={{width: this.state.addressBookImageWidth, height: this.state.addressBookImageHeight}}
                source={{uri: `${this.state.addressBookImage}`}} onLoad={this.onDinosaurProfilePictureLoad}
            />

            ) : null
            }

            {
             this.props.fontLoaded && this.state.viewableItems ? (

             <AddFavouriteOverlay closeFavouriteOverlay={this.closeFavouriteAnimationOverlay} favouriteOverlayVisible={this.state.animatedFavouriteOverlayVisible} setFavouriteOverlayVisible={this.setFavouriteAnimationOverlayVisible} fontLoaded={this.props.fontLoaded} />

           ) : null
         }

        {
          self.state.imagesLoading ? (

            <View style={{height: Dimensions.get('window').height*0.12}}>
              <DotIndicator count={5} size={10} color={'limegreen'} style={{backgroundColor: 'transparent'}} />
            </View>

          ) : null

        }


      <View style={DinoListViewStyle.modalHeader}>
          <Text style={[DinoListViewStyle.infoModalHeader, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Name: </Text>{this.returnClickedDinosaur()}
          </Text>
      </View>

      {

  Pronunciations.getPronunciation(this.returnClickedDinosaur()) ? (

  <View style={DinoListViewStyle.modalHeader}>
    <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Pronunciation: </Text>{Pronunciations.getPronunciation(this.returnClickedDinosaur())}
    </Text>
  </View>

    ) : null

    }

    {

      Meanings.getNameMeaning(this.returnClickedDinosaur()) ? (

        <View style={DinoListViewStyle.modalHeader}>
        <Text style={[DinoListViewStyle.modalPronunciation, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Meaning: </Text>{Meanings.getNameMeaning(this.returnClickedDinosaur())}
        </Text>
        </View>

      ) : null

    }

    {

    Types.getType(this.returnClickedDinosaur()) ? (

    <View style={DinoListViewStyle.modalHeader}>
    <Text style={[DinoListViewStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Type: </Text>
    {Types.getType(this.returnClickedDinosaur())}
    </Text>
    </View>

  ) : null

}


{
  ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet) != require("../assets/icons/diet_unknown.png") ? (

      <View style={DinoListViewStyle.modalHeader}>
        <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.getDietTextFromImageName()}<Text style={{color: 'black'}}>::::: </Text> <Image source={  ImageFinder.getDietImage(this.retrieveDinosaurFromName(this.state.clickedDinosaur).diet)}/>
        </Text>
      </View>

    )  :

    <View style={DinoListViewStyle.modalHeader}>
      <Text style={[DinoListViewStyle.modalDietIcon, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'white'}}><Text style={{color: 'limegreen'}}>Diet: </Text>{this.getDietTextFromImageName()}</Text>
      </Text>
    </View>

    }


      }

      <View style={DinoListViewStyle.modalHeader}>
        <Text onPress={this.setFossilMapVisible} style={[DinoListViewStyle.modalMapLink, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>View Fossil Map: </Text><Image source={require("../assets/icons/globesmall.png")} style={{width: 20, height: 20 }}/>
        </Text>
      </View>

        {

    Lengths.getLength(this.returnClickedDinosaur()) ? (

        <View style={DinoListViewStyle.modalHeader}>
          <Text style={[DinoListViewStyle.modalLength, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Length: </Text>{Lengths.getLength(this.returnClickedDinosaur())}
          </Text>3
        </View>

      ) : null

      }

      {
        ImageFinder.findSizeComparisonImage(this.returnClickedDinosaur()) ? (

      <AutoHeightImage width={Dimensions.get('window').width*1.0} style={{marginTop:20}} source={ImageFinder.findSizeComparisonImage(this.returnClickedDinosaur())}/>

    ) : null

  }

    {
      this.returnClickedDinosaur() != null ? (

      <FossilMap mappedDinosaur={this.retrieveDinosaurFromName(this.state.clickedDinosaur)} fossilMapVisible={this.state.fossilMapVisible} closeFossilMap={this.closeFossilMap} dinosaur={this.state.clickedDinosaur} />

    ) : null

  }

      {
        self.state.searchedDinosaurDescription ? (


    <View style={DinoListViewStyle.modalHeader}>
      <Text style={[DinoListViewStyle.infoModalText, {fontFamily: 'PoiretOne-Regular'}]}><Text style={{color: 'limegreen'}}>Description: </Text>{this.renderDescriptionElements(this.state.searchedDinosaurDescription)}
      </Text>
    </View>

        ) : null
      }

        </View>

      }

            <TouchableHighlight
              onPress={() => {
                this.closeDinosaurView();
              }}>
            <Image source={require('../assets/icons/back3.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
            </TouchableHighlight>
            </ScrollView>
          </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>

  ) : null
}

        </View>

      )
      }

      else {

        var numberOfDinosaurs = this.state.dinosaurs.length;
        var lowerIndexLimit = numberOfDinosaurs - 18;
        var lowerDinosaurIndex = Math.random() * lowerIndexLimit;
        var upperDinosaurIndex = lowerDinosaurIndex + 18;

        if (this.state.vertical === true){

        return (

          <DinoListView eraName={this.state.viewableItems[0].item.title} returnToErasPage={this.returnToErasPage} handleImageUrl={this.handleImageUrl} getImageAddress={this.getImageAddress} images={this.state.images} dinosaurDescriptions={this.state.dinosaurDescriptions} everySingleDinosaur={this.state.dinosaurs} allDinosaurs={this.state.slicedDinosaurs} herbivores={this.state.herbivores} carnivores={this.state.carnivores} fontLoaded={this.props.fontLoaded} omnivores={this.state.omnivores} diets={this.state.diets} toggleLayout={this.toggleLayout} />
        )
      }
      else {

        return (

          <DinoGalleryView eraName={this.state.viewableItems[0].item.title} returnToErasPage={this.returnToErasPage} handleImageUrl={this.handleImageUrl} getImageAddress={this.getImageAddress} images={this.state.images} dinosaurDescriptions={this.state.dinosaurDescriptions} everySingleDinosaur={this.state.dinosaurs} allDinosaurs={this.state.slicedDinosaurs} herbivores={this.state.herbivores} carnivores={this.state.carnivores} fontLoaded={this.props.fontLoaded} omnivores={this.state.omnivores} diets={this.state.diets} toggleLayout={this.toggleLayout} />
        )

      }
      }
  }
}

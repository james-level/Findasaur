import React, { Component } from 'react';
import { Alert, TouchableHighlight, Image, AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import faker from 'faker';
import TimePeriodPage from './TimePeriodPage';
import {Platform} from 'react-native';
import NavBarAndroidLight from './NavBarAndroidLight'
import NavBarIOSLight from './NavBarIOSLight'
import Pagination from 'react-native-pagination';
import _ from 'lodash';
import { MockTweetList } from './FakerMocks';
import axios from 'axios';
import EraOverlay from './EraOverlay.js'
import EraFavourites from './EraFavourites.js'
import TimePeriodStyle from '../Stylesheets/TimePeriodStyle.js';
import DinoListView from './DinoListView.js';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import ChooseTimePeriodStyle from '../Stylesheets/ChooseTimePeriodStyle.js';

export default class ChooseTimePeriod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slicedDinosaurs: null,
      eraModalVisible: false,
      imagesLoading: false,
      images: [],
      dinosaurDescriptions: [],
      dinosaurs: null,
      diets: null,
      herbivores: null,
      carnivores: null,
      omnivores: null,
      imagesLoaded: false,
      backClicked: false,
      favouritesVisible: false,
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
          description: "The Early Cretaceous (geochronological name) or the Lower Cretaceous (chronostratigraphic name), is the earlier or lower of the two major divisions of the Cretaceous. It is usually considered to stretch from 146 million to 100 million years ago. During this time many new types of dinosaurs appeared or came into prominence, including ceratopsians, spinosaurids, carcharodontosaurids and coelurosaurs, while survivors from the Late Jurassic continued. Angiosperms (flowering plants) appeared for the first time during the Early Cretaceous. This time also saw the evolution of the first members of the Neornithes (modern birds).",
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
      ]
    };

    this.getDinosaursForPeriod = this.getDinosaursForPeriod.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.retrieveImagesAndDescriptions = this.retrieveImagesAndDescriptions.bind(this);
    this.toggleDinosaurListView = this.toggleDinosaurListView.bind(this);
    this.saveDescriptionToState = this.saveDescriptionToState.bind(this);
    this.returnToErasPage = this.returnToErasPage.bind(this);
    this.setEraModalVisible = this.setEraModalVisible.bind(this);
    this.closeEraModal = this.closeEraModal.bind(this);
    this.setFavouritesVisible = this.setFavouritesVisible.bind(this);
  }

  componentDidMount(){

    // Alert.alert(
    //        'Swipe to move between time periods!'
    //     )

  }

  setFavouritesVisible() {
  this.setState({favouritesVisible: !this.state.favouritesVisible}, function(){
    this.renderEraFavouritesPage(this.state.viewableItems[0].item.title)
  });
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

  populateDropdown(){
    console.log("Populating dropdown with dinosaurs...");
  }

  handleSearchSubmit(){

    var self = this;

    self.setState({
      imagesLoading: true

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

      }, 1000);

    })
  }

  toggleDinosaurListView(){
    this.setState({
      imagesLoaded: true
    })
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

  retrieveImage(url){
    return fetch(url)
      .then((response) => response.json());
  }

  handleImageUrl(objects) {
    const newArray = [];
    objects.forEach((object) => {
      if (object.query.pages["-1"].imageinfo === undefined) {
        // CURRENTLY REMOVING ALL DINOSAURS WITHOUT AN IMAGE IN THE WIKI API. COULD FIND SUITABLE 'NOT FOUND' IMAGE
         newArray.push('https://www.buttonmuseum.org/sites/default/files/CA-no-dinosaurs-button_busy_beaver_button_museum.png');
         // objects.pop(object);
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
    var lowerIndexLimit = numberOfDinosaurs - 18;
    var lowerDinosaurIndex = Math.random() * lowerIndexLimit;
    var upperDinosaurIndex = lowerDinosaurIndex + 18;
    var dinosaurs = this.state.dinosaurs.slice(lowerDinosaurIndex, upperDinosaurIndex);
    var modifiedDinosaurs = this.state.dinosaurs.splice(lowerDinosaurIndex, 18)

    this.setState({slicedDinosaurs: dinosaurs}, function(){

      Promise.all(this.state.slicedDinosaurs.map((dinosaur) => {
        var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${dinosaur.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
        return this.retrieveWikiDescription(url);
      }))
      .then(() => {
        /* this.wikiDinosaurs = getExtraData(this.props.dinosaurs); */
        /* Call a method (to be written later) here which adds the Wikipedia description of each dinosaur to the related dinosaur object */
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

    })
  }

  returnToErasPage(){
    this.setState({
      backClicked: true
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

    if (this.state.imagesLoaded === false || this.state.backClicked){

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
              <View style={{backgroundColor: 'black', top: '0%', height: '100%'}}>
              <View style={{backgroundColor: 'black', top: '0%', height: '90%'}}>
                < BallIndicator count={7} size={65} color={'limegreen'} style={{backgroundColor: 'black'}} />
              </View>
              </View>
        ) :


        /* Icons for home, favourites and era information overlay */

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
            this.setEraModalVisible();
            }}>
              <Image source={require('../assets/icons/info.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
        </TouchableHighlight>

        <TouchableHighlight
        style={{position: 'relative', top: '0%'}}
          onPress={() => {
            this.setFavouritesVisible();
            }}>
              <Image source={require('../assets/icons/favourite.png')} style={{height: 32, width: 32, position: 'relative'}}/>
        </TouchableHighlight>

        </View>

          /* End of icons */
      }

      {
          this.state.imagesLoading ? (

      <View style={{backgroundColor: 'black', top: '0%', height: '50%', alignItems: 'center', top: '-45%'}}>
        <Text style={[ChooseTimePeriodStyle.loadingText, {fontFamily: 'PoiretOne-Regular'}]}>Finding {this.state.viewableItems[0].item.title} dinosaurs...</Text>
      </View>

    ) : null
  }

  {
      this.props.fontLoaded && this.state.viewableItems ? (

      <EraOverlay eraTitle={this.state.viewableItems[0].item.other_title} eraDescription={this.state.viewableItems[0].item.description} closeEraModal={this.closeEraModal} eraModalVisible={this.state.eraModalVisible} setEraModalVisible={this.setEraModalVisible} fontLoaded={this.props.fontLoaded} />

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

        return (

          <DinoListView eraName={this.state.viewableItems[0].item.title} returnToErasPage={this.returnToErasPage} handleImageUrl={this.handleImageUrl} getImageAddress={this.getImageAddress} images={this.state.images} dinosaurDescriptions={this.state.dinosaurDescriptions} everySingleDinosaur={this.state.dinosaurs} allDinosaurs={this.state.slicedDinosaurs} herbivores={this.state.herbivores} carnivores={this.state.carnivores} fontLoaded={this.props.fontLoaded} omnivores={this.state.omnivores} diets={this.state.diets} />
        )
      }
  }
}

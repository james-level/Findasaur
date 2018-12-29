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

  retrieveInitialImageLink(dinosaur){
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${dinosaur}&format=json&prop=pageimages&origin=*`

    axios.get(imageUrl).then( (response) => {

      console.log("IMG one RESP", response.data);

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

      console.log("IMG TWO RESP", response.data);

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
    console.log("OBEJC IMG", object);
      if (object.query.pages["-1"].imageinfo === undefined) {
        // CURRENTLY REMOVING ALL DINOSAURS WITHOUT AN IMAGE IN THE WIKI API. COULD FIND SUITABLE 'NOT FOUND' IMAGE
         return 'https://st2.depositphotos.com/7857468/12366/v/950/depositphotos_123667514-stock-illustration-cartoon-cute-dinosaur.jpg';
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

  buildDinosaurNameAndDietList(){
    dinosaurs = this.props.everySingleDinosaur;

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
      <TouchableOpacity onPress={() => this.setState({clickedDinosaur: dinosaurs[i]}, function(){ this.toggleDinosaurView() })} key={i}>
      <Text style={{color: 'black', fontSize: 16}} key={i}>{dinosaurAndDiet}</Text>
      </TouchableOpacity>

    )
  }

  findSizeComparisonImage(dinosaur){
    switch(dinosaur) {

    case "Aardonyx": return require("../assets/human_size_comparison_images/Aardonyx.png");
    case "Abelisaurus": return require("../assets/human_size_comparison_images/Abelisaurus.png");
    case "Achelousaurus": return require("../assets/human_size_comparison_images/Achelousaurus.png");
    case "Achillobator": return require("../assets/human_size_comparison_images/Achillobator.png");
    case "Acrocanthosaurus": return require("../assets/human_size_comparison_images/Acrocanthosaurus.png");
    case "Aegyptosaurus": return require("../assets/human_size_comparison_images/Aegyptosaurus.png");
    case "Afrovenator": return require("../assets/human_size_comparison_images/Afrovenator.png");
    case "Agilisaurus": return require("../assets/human_size_comparison_images/Agilisaurus.png");
    case "Alamosaurus": return require("../assets/human_size_comparison_images/Alamosaurus.png");
    case "Albertaceratops": return require("../assets/human_size_comparison_images/Albertaceratops.png");
    case "Albertosaurus": return require("../assets/human_size_comparison_images/Albertosaurus.png");
    case "Alectrosaurus": return require("../assets/human_size_comparison_images/Alectrosaurus.png");
    case "Alioramus": return require("../assets/human_size_comparison_images/Alioramus.png");
    case "Allosaurus": return require("../assets/human_size_comparison_images/Allosaurus.png");
    case "Alvarezsaurus": return require("../assets/human_size_comparison_images/Alvarezsaurus.png");
    case "Amargasaurus": return require("../assets/human_size_comparison_images/Amargasaurus.png");
    case "Ammosaurus": return require("../assets/human_size_comparison_images/Ammosaurus.png");
    case "Ampelosaurus": return require("../assets/human_size_comparison_images/Ampelosaurus.png");
    case "Amygdalodon": return require("../assets/human_size_comparison_images/Amygdalodon.png");
    case "Anchiceratops": return require("../assets/human_size_comparison_images/Anchiceratops.png");
    case "Anchisaurus": return require("../assets/human_size_comparison_images/Anchisaurus.png");
    case "Ankylosaurus": return require("../assets/human_size_comparison_images/Ankylosaurus.png");
    case "Anserimimus": return require("../assets/human_size_comparison_images/Anserimimus.png");
    case "Antarctosaurus": return require("../assets/human_size_comparison_images/Antarctosaurus.png");
    case "Apatosaurus": return require("../assets/human_size_comparison_images/Apatosaurus.png");
    case "Aragosaurus": return require("../assets/human_size_comparison_images/Aragosaurus.png");
    case "Aralosaurus": return require("../assets/human_size_comparison_images/Aralosaurus.png");
    case "Archaeoceratops": return require("../assets/human_size_comparison_images/Archaeoceratops.png");
    case "Archaeopteryx": return require("../assets/human_size_comparison_images/Archaeopteryx.png");
    case "Archaeornithomimus": return require("../assets/human_size_comparison_images/Archaeornithomimus.png");
    case "Argentinosaurus": return require("../assets/human_size_comparison_images/Argentinosaurus.png");
    case "Arrhinoceratops": return require("../assets/human_size_comparison_images/Arrhinoceratops.png");
    case "Atlascopcosaurus": return require("../assets/human_size_comparison_images/Atlascopcosaurus.png");
    case "Aucasaurus": return require("../assets/human_size_comparison_images/Aucasaurus.png");
    case "Austrosaurus": return require("../assets/human_size_comparison_images/Austrosaurus.png");
    case "Avaceratops": return require("../assets/human_size_comparison_images/Avaceratops.png");
    case "Avimimus": return require("../assets/human_size_comparison_images/Avimimus.png");
    case "Bactrosaurus": return require("../assets/human_size_comparison_images/Bactrosaurus.png");
    case "Bagaceratops": return require("../assets/human_size_comparison_images/Bagaceratops.png");
    case "Bambiraptor": return require("../assets/human_size_comparison_images/Bambiraptor.png");
    case "Barapasaurus": return require("../assets/human_size_comparison_images/Barapasaurus.png");
    case "Barosaurus": return require("../assets/human_size_comparison_images/Barosaurus.png");
    case "Baryonyx": return require("../assets/human_size_comparison_images/Baryonyx.png");
    case "Becklespinax": return require("../assets/human_size_comparison_images/Becklespinax.png");
    case "Beipiaosaurus": return require("../assets/human_size_comparison_images/Beipiaosaurus.png");
    case "Bellusaurus": return require("../assets/human_size_comparison_images/Bellusaurus.png");
    case "Borogovia": return require("../assets/human_size_comparison_images/Borogovia.png");
    case "Brachiosaurus": return require("../assets/human_size_comparison_images/Brachiosaurus.png");
    case "Brachylophosaurus": return require("../assets/human_size_comparison_images/Brachylophosaurus.png");
    case "Brachytrachelopan": return require("../assets/human_size_comparison_images/Brachytrachelopan.png");
    case "Buitreraptor": return require("../assets/human_size_comparison_images/Buitreraptor.png");
    case "Camarasaurus": return require("../assets/human_size_comparison_images/Camarasaurus.png");
    case "Camptosaurus": return require("../assets/human_size_comparison_images/Camptosaurus.png");
    case "Carcharodontosaurus": return require("../assets/human_size_comparison_images/Carcharodontosaurus.png");
    case "Carnotaurus": return require("../assets/human_size_comparison_images/Carnotaurus.png");
    case "Caudipteryx": return require("../assets/human_size_comparison_images/Caudipteryx.png");
    case "Cedarpelta": return require("../assets/human_size_comparison_images/Cedarpelta.png");
    case "Centrosaurus": return require("../assets/human_size_comparison_images/Centrosaurus.png");
    case "Ceratosaurus": return require("../assets/human_size_comparison_images/Ceratosaurus.png");
    case "Cetiosauriscus": return require("../assets/human_size_comparison_images/Cetiosauriscus.png");
    case "Cetiosaurus": return require("../assets/human_size_comparison_images/Cetiosaurus.png");
    case "Chaoyangsaurus": return require("../assets/human_size_comparison_images/Chaoyangsaurus.png");
    case "Chasmosaurus": return require("../assets/human_size_comparison_images/Chasmosaurus.png");
    case "Chindesaurus": return require("../assets/human_size_comparison_images/Chindesaurus.png");
    case "Chinshakiangosaurus": return require("../assets/human_size_comparison_images/Chinshakiangosaurus.png");
    case "Chirostenotes": return require("../assets/human_size_comparison_images/Chirostenotes.png");
    case "Chubutisaurus": return require("../assets/human_size_comparison_images/Chubutisaurus.png");
    case "Chungkingosaurus": return require("../assets/human_size_comparison_images/Chungkingosaurus.png");
    case "Citipati": return require("../assets/human_size_comparison_images/Citipati.png");
    case "Coelophysis": return require("../assets/human_size_comparison_images/Coelophysis.png");
    case "Coelurus": return require("../assets/human_size_comparison_images/Coelurus.png");
    case "Coloradisaurus": return require("../assets/human_size_comparison_images/Coloradisaurus.png");
    case "Compsognathus": return require("../assets/human_size_comparison_images/Compsognathus.png");
    case "Conchoraptor": return require("../assets/human_size_comparison_images/Conchoraptor.png");
    case "Confuciusornis": return require("../assets/human_size_comparison_images/Confuciusornis.png");
    case "Corythosaurus": return require("../assets/human_size_comparison_images/Corythosaurus.png");
    case "Cryolophosaurus": return require("../assets/human_size_comparison_images/Cryolophosaurus.png");
    case "Dacentrurus": return require("../assets/human_size_comparison_images/Dacentrurus.png");
    case "Daspletosaurus": return require("../assets/human_size_comparison_images/Daspletosaurus.png");
    case "Datousaurus": return require("../assets/human_size_comparison_images/Datousaurus.png");
    case "Deinocheirus": return require("../assets/human_size_comparison_images/Deinocheirus.png");
    case "Deltadromeus": return require("../assets/human_size_comparison_images/Deltadromeus.png");
    case "Dicraeosaurus": return require("../assets/human_size_comparison_images/Dicraeosaurus.png");
    case "Dilophosaurus": return require("../assets/human_size_comparison_images/Dilophosaurus.png");
    case "Diplodocus": return require("../assets/human_size_comparison_images/Diplodocus.png");
    case "Dromaeosaurus": return require("../assets/human_size_comparison_images/Dromaeosaurus.png");
    case "Dromiceiomimus": return require("../assets/human_size_comparison_images/Dromiceiomimus.png");
    case "Dryosaurus": return require("../assets/human_size_comparison_images/Dryosaurus.png");
    case "Dryptosaurus": return require("../assets/human_size_comparison_images/Dryptosaurus.png");
    case "Edmontonia": return require("../assets/human_size_comparison_images/Edmontonia.png");
    case "Edmontosaurus": return require("../assets/human_size_comparison_images/Edmontosaurus.png");
    case "Einiosaurus": return require("../assets/human_size_comparison_images/Einiosaurus.png");
    case "Elaphrosaurus": return require("../assets/human_size_comparison_images/Elaphrosaurus.png");
    case "Emausaurus": return require("../assets/human_size_comparison_images/Emausaurus.png");
    case "Eoraptor": return require("../assets/human_size_comparison_images/Eoraptor.png");
    case "Eotyrannus": return require("../assets/human_size_comparison_images/Eotyrannus.png");
    case "Erketu": return require("../assets/human_size_comparison_images/Erketu.png");
    case "Erlikosaurus": return require("../assets/human_size_comparison_images/Erlikosaurus.png");
    case "Euhelopus": return require("../assets/human_size_comparison_images/Euhelopus.png");
    case "Euoplocephalus": return require("../assets/human_size_comparison_images/Euoplocephalus.png");
    case "Europasaurus": return require("../assets/human_size_comparison_images/Europasaurus.png");
    case "Eustreptospondylus": return require("../assets/human_size_comparison_images/Eustreptospondylus.png");
    case "Fukuiraptor": return require("../assets/human_size_comparison_images/Fukuiraptor.png");
    case "Fukuisaurus": return require("../assets/human_size_comparison_images/Fukuisaurus.png");
    case "Gallimimus": return require("../assets/human_size_comparison_images/Gallimimus.png");
    case "Gargoyleosaurus": return require("../assets/human_size_comparison_images/Gargoyleosaurus.png");
    case "Garudimimus": return require("../assets/human_size_comparison_images/Garudimimus.png");
    case "Gasosaurus": return require("../assets/human_size_comparison_images/Gasosaurus.png");
    case "Gasparinisaura": return require("../assets/human_size_comparison_images/Gasparinisaura.png");
    case "Gastonia": return require("../assets/human_size_comparison_images/Gastonia.png");
    case "Giganotosaurus": return require("../assets/human_size_comparison_images/Giganotosaurus.png");
    case "Gilmoreosaurus": return require("../assets/human_size_comparison_images/Gilmoreosaurus.png");
    case "Giraffatitan": return require("../assets/human_size_comparison_images/Giraffatitan.png");
    case "Gobisaurus": return require("../assets/human_size_comparison_images/Gobisaurus.png");
    case "Gorgosaurus": return require("../assets/human_size_comparison_images/Gorgosaurus.png");
    case "Goyocephale": return require("../assets/human_size_comparison_images/Goyocephale.png");
    case "Gryposaurus": return require("../assets/human_size_comparison_images/Gryposaurus.png");
    case "Guaibasaurus": return require("../assets/human_size_comparison_images/Guaibasaurus.png");
    case "Guanlong": return require("../assets/human_size_comparison_images/Guanlong.png");
    case "Hadrosaurus": return require("../assets/human_size_comparison_images/Hadrosaurus.png");
    case "Hagryphus": return require("../assets/human_size_comparison_images/Hagryphus.png");
    case "Haplocanthosaurus": return require("../assets/human_size_comparison_images/Haplocanthosaurus.png");
    case "Harpymimus": return require("../assets/human_size_comparison_images/Harpymimus.png");
    case "Herrerasaurus": return require("../assets/human_size_comparison_images/Herrerasaurus.png");
    case "Hesperosaurus": return require("../assets/human_size_comparison_images/Hesperosaurus.png");
    case "Heterodontosaurus": return require("../assets/human_size_comparison_images/Heterodontosaurus.png");
    case "Heyuannia": return require("../assets/human_size_comparison_images/Heyuannia.png");
    case "Homalocephale": return require("../assets/human_size_comparison_images/Homalocephale.png");
    case "Huayangosaurus": return require("../assets/human_size_comparison_images/Huayangosaurus.png");
    case "Hylaeosaurus": return require("../assets/human_size_comparison_images/Hylaeosaurus.png");
    case "Hypacrosaurus": return require("../assets/human_size_comparison_images/Hypacrosaurus.png");
    case "Hypsilophodon": return require("../assets/human_size_comparison_images/Hypsilophodon.png");
    case "Iguanodon": return require("../assets/human_size_comparison_images/Iguanodon.png");
    case "Indosuchus": return require("../assets/human_size_comparison_images/Indosuchus.png");
    case "Irritator": return require("../assets/human_size_comparison_images/Irritator.png");
    case "Janenschia": return require("../assets/human_size_comparison_images/Janenschia.png");
    case "Jaxartosaurus": return require("../assets/human_size_comparison_images/Jaxartosaurus.png");
    case "Jingshanosaurus": return require("../assets/human_size_comparison_images/Jingshanosaurus.png");
    case "Jobaria": return require("../assets/human_size_comparison_images/Jobaria.png");
    case "Juravenator": return require("../assets/human_size_comparison_images/Juravenator.png");
    case "Kentrosaurus": return require("../assets/human_size_comparison_images/Kentrosaurus.png");
    case "Khaan": return require("../assets/human_size_comparison_images/Khaan.png");
    case "Kotasaurus": return require("../assets/human_size_comparison_images/Kotasaurus.png");
    case "Kritosaurus": return require("../assets/human_size_comparison_images/Kritosaurus.png");
    case "Lambeosaurus": return require("../assets/human_size_comparison_images/Lambeosaurus.png");
    case "Leaellynasaura": return require("../assets/human_size_comparison_images/Leaellynasaura.png");
    case "Leptoceratops": return require("../assets/human_size_comparison_images/Leptoceratops.png");
    case "Ligabuesaurus": return require("../assets/human_size_comparison_images/Ligabuesaurus.png");
    case "Liliensternus": return require("../assets/human_size_comparison_images/Liliensternus.png");
    case "Lophorhothon": return require("../assets/human_size_comparison_images/Lophorhothon.png");
    case "Lophostropheus": return require("../assets/human_size_comparison_images/Lophostropheus.png");
    case "Lufengosaurus": return require("../assets/human_size_comparison_images/Lufengosaurus.png");
    case "Lurdusaurus": return require("../assets/human_size_comparison_images/Lurdusaurus.png");
    case "Lycorhinus": return require("../assets/human_size_comparison_images/Lycorhinus.png");
    case "Magyarosaurus": return require("../assets/human_size_comparison_images/Magyarosaurus.png");
    case "Maiasaura": return require("../assets/human_size_comparison_images/Maiasaura.png");
    case "Majungasaurus": return require("../assets/human_size_comparison_images/Majungasaurus.png");
    case "Malawisaurus": return require("../assets/human_size_comparison_images/Malawisaurus.png");
    case "Mamenchisaurus": return require("../assets/human_size_comparison_images/Mamenchisaurus.png");
    case "Mapusaurus": return require("../assets/human_size_comparison_images/Mapusaurus.png");
    case "Marshosaurus": return require("../assets/human_size_comparison_images/Marshosaurus.png");
    case "Masiakasaurus": return require("../assets/human_size_comparison_images/Masiakasaurus.png");
    case "Massospondylus": return require("../assets/human_size_comparison_images/Massospondylus.png");
    case "Maxakalisaurus": return require("../assets/human_size_comparison_images/Maxakalisaurus.png");
    case "Megalosaurus": return require("../assets/human_size_comparison_images/Megalosaurus.png");
    case "Melanorosaurus": return require("../assets/human_size_comparison_images/Melanorosaurus.png");
    case "Metriacanthosaurus": return require("../assets/human_size_comparison_images/Metriacanthosaurus.png");
    case "Microceratus": return require("../assets/human_size_comparison_images/Microceratus.png");
    case "Micropachycephalosaurus": return require("../assets/human_size_comparison_images/Micropachycephalosaurus.png");
    case "Microraptor": return require("../assets/human_size_comparison_images/Microraptor.png");
    case "Minmi": return require("../assets/human_size_comparison_images/Minmi.png");
    case "Monolophosaurus": return require("../assets/human_size_comparison_images/Monolophosaurus.png");
    case "Mononykus": return require("../assets/human_size_comparison_images/Mononykus.png");
    case "Mussaurus": return require("../assets/human_size_comparison_images/Mussaurus.png");
    case "Muttaburrasaurus": return require("../assets/human_size_comparison_images/Muttaburrasaurus.png");
    case "Nanshiungosaurus": return require("../assets/human_size_comparison_images/Nanshiungosaurus.png");
    case "Nedoceratops": return require("../assets/human_size_comparison_images/Nedoceratops.png");
    case "Nemegtosaurus": return require("../assets/human_size_comparison_images/Nemegtosaurus.png");
    case "Neovenator": return require("../assets/human_size_comparison_images/Neovenator.png");
    case "Neuquenosaurus": return require("../assets/human_size_comparison_images/Neuquenosaurus.png");
    case "Nigersaurus": return require("../assets/human_size_comparison_images/Nigersaurus.png");
    case "Noasaurus": return require("../assets/human_size_comparison_images/Noasaurus.png");
    case "Nodosaurus": return require("../assets/human_size_comparison_images/Nodosaurus.png");
    case "Nomingia": return require("../assets/human_size_comparison_images/Nomingia.png");
    case "Nothronychus": return require("../assets/human_size_comparison_images/Nothronychus.png");
    case "Nqwebasaurus": return require("../assets/human_size_comparison_images/Nqwebasaurus.png");
    case "Omeisaurus": return require("../assets/human_size_comparison_images/Omeisaurus.png");
    case "Opisthocoelicaudia": return require("../assets/human_size_comparison_images/Opisthocoelicaudia.png");
    case "Ornitholestes": return require("../assets/human_size_comparison_images/Ornitholestes.png");
    case "Ornithomimus": return require("../assets/human_size_comparison_images/Ornithomimus.png");
    case "Orodromeus": return require("../assets/human_size_comparison_images/Orodromeus.png");
    case "Oryctodromeus": return require("../assets/human_size_comparison_images/Oryctodromeus.png");
    case "Othnielia": return require("../assets/human_size_comparison_images/Othnielia.png");
    case "Ouranosaurus": return require("../assets/human_size_comparison_images/Ouranosaurus.png");
    case "Oviraptor": return require("../assets/human_size_comparison_images/Oviraptor.png");
    case "Pachycephalosaurus": return require("../assets/human_size_comparison_images/Pachycephalosaurus.png");
    case "Pachyrhinosaurus": return require("../assets/human_size_comparison_images/Pachyrhinosaurus.png");
    case "Panoplosaurus": return require("../assets/human_size_comparison_images/Panoplosaurus.png");
    case "Pantydraco": return require("../assets/human_size_comparison_images/Pantydraco.png");
    case "Paralititan": return require("../assets/human_size_comparison_images/Paralititan.png");
    case "Parasaurolophus": return require("../assets/human_size_comparison_images/Parasaurolophus.png");
    case "Parksosaurus": return require("../assets/human_size_comparison_images/Parksosaurus.png");
    case "Patagosaurus": return require("../assets/human_size_comparison_images/Patagosaurus.png");
    case "Pelicanimimus": return require("../assets/human_size_comparison_images/Pelicanimimus.png");
    case "Pentaceratops": return require("../assets/human_size_comparison_images/Pentaceratops.png");
    case "Piatnitzkysaurus": return require("../assets/human_size_comparison_images/Piatnitzkysaurus.png");
    case "Pinacosaurus": return require("../assets/human_size_comparison_images/Pinacosaurus.png");
    case "Plateosaurus": return require("../assets/human_size_comparison_images/Plateosaurus.png");
    case "Podokesaurus": return require("../assets/human_size_comparison_images/Podokesaurus.png");
    case "Poekilopleuron": return require("../assets/human_size_comparison_images/Poekilopleuron.png");
    case "Polacanthus": return require("../assets/human_size_comparison_images/Polacanthus.png");
    case "Prenocephale": return require("../assets/human_size_comparison_images/Prenocephale.png");
    case "Probactrosaurus": return require("../assets/human_size_comparison_images/Probactrosaurus.png");
    case "Proceratosaurus": return require("../assets/human_size_comparison_images/Proceratosaurus.png");
    case "Procompsognathus": return require("../assets/human_size_comparison_images/Procompsognathus.png");
    case "Prosaurolophus": return require("../assets/human_size_comparison_images/Prosaurolophus.png");
    case "Protarchaeopteryx": return require("../assets/human_size_comparison_images/Protarchaeopteryx.png");
    case "Protoceratops": return require("../assets/human_size_comparison_images/Protoceratops.png");
    case "Protohadros": return require("../assets/human_size_comparison_images/Protohadros.png");
    case "Psittacosaurus": return require("../assets/human_size_comparison_images/Psittacosaurus.png");
    case "Quaesitosaurus": return require("../assets/human_size_comparison_images/Quaesitosaurus.png");
    case "Rebbachisaurus": return require("../assets/human_size_comparison_images/Rebbachisaurus.png");
    case "Rhabdodon": return require("../assets/human_size_comparison_images/Rhabdodon.png");
    case "Rhoetosaurus": return require("../assets/human_size_comparison_images/Rhoetosaurus.png");
    case "Rinchenia": return require("../assets/human_size_comparison_images/Rinchenia.png");
    case "Riojasaurus": return require("../assets/human_size_comparison_images/Riojasaurus.png");
    case "Saichania": return require("../assets/human_size_comparison_images/Saichania.png");
    case "Saltasaurus": return require("../assets/human_size_comparison_images/Saltasaurus.png");
    case "Sarcosaurus": return require("../assets/human_size_comparison_images/Sarcosaurus.png");
    case "Saurolophus": return require("../assets/human_size_comparison_images/Saurolophus.png");
    case "Sauropelta": return require("../assets/human_size_comparison_images/Sauropelta.png");
    case "Saurophaganax": return require("../assets/human_size_comparison_images/Saurophaganax.png");
    case "Saurornithoides": return require("../assets/human_size_comparison_images/Saurornithoides.png");
    case "Scelidosaurus": return require("../assets/human_size_comparison_images/Scelidosaurus.png");
    case "Scutellosaurus": return require("../assets/human_size_comparison_images/Scutellosaurus.png");
    case "Secernosaurus": return require("../assets/human_size_comparison_images/Secernosaurus.png");
    case "Segisaurus": return require("../assets/human_size_comparison_images/Segisaurus.png");
    case "Segnosaurus": return require("../assets/human_size_comparison_images/Segnosaurus.png");
    case "Shanag": return require("../assets/human_size_comparison_images/Shanag.png");
    case "Shantungosaurus": return require("../assets/human_size_comparison_images/Shantungosaurus.png");
    case "Shunosaurus": return require("../assets/human_size_comparison_images/Shunosaurus.png");
    case "Shuvuuia": return require("../assets/human_size_comparison_images/Shuvuuia.png");
    case "Silvisaurus": return require("../assets/human_size_comparison_images/Silvisaurus.png");
    case "Sinocalliopteryx": return require("../assets/human_size_comparison_images/Sinocalliopteryx.png");
    case "Sinornithosaurus": return require("../assets/human_size_comparison_images/Sinornithosaurus.png");
    case "Sinosauropteryx": return require("../assets/human_size_comparison_images/Sinosauropteryx.png");
    case "Sinovenator": return require("../assets/human_size_comparison_images/Sinovenator.png");
    case "Sinraptor": return require("../assets/human_size_comparison_images/Sinraptor.png");
    case "Sonidosaurus": return require("../assets/human_size_comparison_images/Sonidosaurus.png");
    case "Spinosaurus": return require("../assets/human_size_comparison_images/Spinosaurus.png");
    case "Staurikosaurus": return require("../assets/human_size_comparison_images/Staurikosaurus.png");
    case "Stegoceras": return require("../assets/human_size_comparison_images/Stegoceras.png");
    case "Stegosaurus": return require("../assets/human_size_comparison_images/Stegosaurus.png");
    case "Stenopelix": return require("../assets/human_size_comparison_images/Stenopelix.png");
    case "Struthiomimus": return require("../assets/human_size_comparison_images/Struthiomimus.png");
    case "Struthiosaurus": return require("../assets/human_size_comparison_images/Struthiosaurus.png");
    case "Styracosaurus": return require("../assets/human_size_comparison_images/Styracosaurus.png");
    case "Suchomimus": return require("../assets/human_size_comparison_images/Suchomimus.png");
    case "Supersaurus": return require("../assets/human_size_comparison_images/Supersaurus.png");
    case "Talarurus": return require("../assets/human_size_comparison_images/Talarurus.png");
    case "Tarbosaurus": return require("../assets/human_size_comparison_images/Tarbosaurus.png");
    case "Tarchia": return require("../assets/human_size_comparison_images/Tarchia.png");
    case "Telmatosaurus": return require("../assets/human_size_comparison_images/Telmatosaurus.png");
    case "Tenontosaurus": return require("../assets/human_size_comparison_images/Tenontosaurus.png");
    case "Thecodontosaurus": return require("../assets/human_size_comparison_images/Thecodontosaurus.png");
    case "Thescelosaurus": return require("../assets/human_size_comparison_images/Thescelosaurus.png");
    case "Torosaurus": return require("../assets/human_size_comparison_images/Torosaurus.png");
    case "Torvosaurus": return require("../assets/human_size_comparison_images/Torvosaurus.png");
    case "Triceratops": return require("../assets/human_size_comparison_images/Triceratops.png");
    case "Troodon": return require("../assets/human_size_comparison_images/Troodon.png");
    case "Tsintaosaurus": return require("../assets/human_size_comparison_images/Tsintaosaurus.png");
    case "Tuojiangosaurus": return require("../assets/human_size_comparison_images/Tuojiangosaurus.png");
    case "Tylocephale": return require("../assets/human_size_comparison_images/Tylocephale.png");
    case "Tyrannosaurus": return require("../assets/human_size_comparison_images/Tyrannosaurus.png");
    case "Unenlagia": return require("../assets/human_size_comparison_images/Unenlagia.png");
    case "Urbacodon": return require("../assets/human_size_comparison_images/Urbacodon.png");
    case "Utahraptor": return require("../assets/human_size_comparison_images/Utahraptor.png");
    case "Valdosaurus": return require("../assets/human_size_comparison_images/Valdosaurus.png");
    case "Velociraptor": return require("../assets/human_size_comparison_images/Velociraptor.png");
    case "Vulcanodon": return require("../assets/human_size_comparison_images/Vulcanodon.png");
    case "Yandusaurus": return require("../assets/human_size_comparison_images/Yandusaurus.png");
    case "Yangchuanosaurus": return require("../assets/human_size_comparison_images/Yangchuanosaurus.png");
    case "Yimenosaurus": return require("../assets/human_size_comparison_images/Yimenosaurus.png");
    case "Yinlong": return require("../assets/human_size_comparison_images/Yinlong.png");
    case "Yuanmousaurus": return require("../assets/human_size_comparison_images/Yuanmousaurus.png");
    case "Yunnanosaurus": return require("../assets/human_size_comparison_images/Yunnanosaurus.png");
    case "Zalmoxes": return require("../assets/human_size_comparison_images/Zalmoxes.png");
    case "Zephyrosaurus": return require("../assets/human_size_comparison_images/Zephyrosaurus.png");

  }
  }

  getDietImage(diet){
    switch(diet) {

    case "carnivore": return require("../assets/icons/carnivore.png");
    case "carnivore, piscivore": return require("../assets/icons/carnivore.png");
    case "carnivore, omnivore": return require("../assets/icons/omnivore.png");
    case "herbivore, omnivore": return require("../assets/icons/omnivore.png");
    case "omnivore": return require("../assets/icons/omnivore.png");
    case "herbivore": return require("../assets/icons/herbivore.png");

  }
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
     var dinosaurs = this.buildDinosaurNameAndDietList();
   }
   else {
     var dinosaurs = this.buildDinosaurNameList();
   }

   const regex = new RegExp(`${sanitizedQuery.trim()}`, 'i');
   return dinosaurs.filter(dinosaur => dinosaur.search(regex) >= 0);
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
                ? { color: 'limegreen' }
                : { color: 'white' }
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
    const dinosaursAndDiets = this.findDinosaur(query, true);
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


            <AutoHeightImage
         width={300}
         source={{uri: `${this.returnImageFromStored()}`}}
         />
              <Text onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })}>
                {this.state.activeItem.name} {this.addPrecedingDash(this.state.activeItem.diet)}
                  <Text style = {{color: `${this.getDietTextColor(this.state.activeItem.diet)}`}}>
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
                placeholderTextColor="grey"
                placeholderTextFontFamily='PoiretOne-Regular'
                renderItem={({ dinosaur }) => (
                  <TouchableOpacity onPress={() => this.setState({ dinosaurTyped: `${dinosaur}` })}>
                  </TouchableOpacity>
                )}
              />

                {dinosaurs.length > 12 ? (
                  <View style={{backgroundColor: 'white', height: 230, paddingLeft: 10}}>
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

                <View style={{alignItems: "center"}}>
                <AutoHeightImage
                  width={300}
                  source={{uri: `${this.state.searchedDinosaurImage}`}}
                />

                {
                  this.getDietImage(this.state.searchedDinosaurData.diet) === require("../assets/icons/omnivore.png") ? (

                    <View style={DinoListViewStyle.modalHeader}>

                    <Text style={DinoListViewStyle.infoModalHeader}>{this.returnClickedDinosaur()}</Text>
                    <Image source={ this.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 65, height: 20, marginTop: 10, marginRight: 20}}/>
                    </View>
                ) :

                <View style={DinoListViewStyle.modalHeader}>
                <Text style={DinoListViewStyle.infoModalHeader}>{this.returnClickedDinosaur()}</Text>
                <Image source={ this.getDietImage(this.state.searchedDinosaurData.diet) } style={{width: 30, height: 20, marginTop: 10, marginRight: 20}}/>
                </View>

                }

                <Image source={this.findSizeComparisonImage(this.returnClickedDinosaur())}/>

                <Text style={DinoListViewStyle.infoModalText}>{this.renderDescriptionElements(this.state.searchedDinosaurDescription)} </Text>

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

import React, { Component, Fragment } from 'react'
import { TouchableOpacity, Modal, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import EraOverlayStyle from '../Stylesheets/EraOverlayStyle.js';
const { width, height } = Dimensions.get('window');
import Autocomplete from 'react-native-autocomplete-input';


export default class GlobalSearch extends Component {

  constructor(props) {
  super(props);

  this.state = {
    dinosaurTyped: ""
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
     var dinosaurs = this.props.names;
   }
   else {
     var dinosaurs = this.props.names;
   }

   const regex = new RegExp(`${sanitizedQuery.trim()}`, 'i');
   return dinosaurs.filter(dinosaur => dinosaur.search(regex) >= 0);
  }

  searchBarPlaceholderText(){
    return `Enter dinosaur name`;
  }

  renderMatches(dinosaurs){
    return dinosaurs.map((dinosaur, i) =>
      <TouchableOpacity onPress={() => this.setState({clickedDinosaur: dinosaurs[i]}, function(){ console.log("H"); })} key={i}>
      <Text style={{color: 'white', fontSize: 16, paddingTop: 10, paddingBottom: 10, fontFamily: 'PoiretOne-Regular'}} key={i}>{dinosaur}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const query = this.state.dinosaurTyped;
    const dinosaurs = this.findDinosaur(query, false);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.searchOverlayVisible} onClose={this.props.closeSearchOverlay} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'transparent'}}
      childrenWrapperStyle={{backgroundColor: 'transparent', borderRadius: 15}}
      animationDuration={1000}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <View style={{position: 'absolute', top: -height*0.44, marginLeft: 15, marginRight: 15 }}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={{width: Dimensions.get('window').width*0.71}}
          data={this.props.names.length === 1 && comp(query, this.props.names[0]) ? [] : dinosaurs}
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

          {this.findDinosaur(query).length > 0 ? (
            <View style={{backgroundColor: 'black', borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: 'white', height: height*0.7, paddingLeft: 10}}>
            <ScrollView style={{flex: 1, flexWrap: 'wrap'}}>
            {this.renderMatches(dinosaurs)}
            </ScrollView>
            </View>
          ) : (
            <View style={{backgroundColor: 'black', borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: 'white', paddingLeft: 10}}>
            <ScrollView>
            {this.renderMatches(dinosaurs)}
            </ScrollView>
            </View>
          )}
      </View>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

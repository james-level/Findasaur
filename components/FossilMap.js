import React, { Component, Fragment } from 'react'
import { Modal, Alert, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FossilMapStyle from '../Stylesheets/FossilMapStyle.js';
import MapView from 'react-native-maps';

export default class FossilMap extends Component {

  returnDinosaur(){
    return this.props.mappedDinosaur.name + " fossils"
  }

  fossilsToMap(){
    if (this.props.mappedDinosaur.coords[0][0]){
      return this.props.mappedDinosaur.coords.map( (coord, i) =>

          <MapView.Marker key={i}
                            coordinate={{
                              latitude: coord[0],
                              longitude: coord[1]
                            }}
                            title={`${this.props.mappedDinosaur.name}`}
                            pinColor={'green'}
                            description={"Fossil found here"}
                            />
        )
      }
      else if (!this.props.mappedDinosaur.coords[0][0]) {

        return
        <MapView.Marker
                          coordinate={{
                            latitude: this.props.mappedDinosaur.coords[0],
                            longitude: this.props.mappedDinosaur.coords[1]
                          }}
                          title={`${this.props.mappedDinosaur.name}`}
                          pinColor={'green'}
                          description={`${this.props.dinosaur} fossil found here`}
                          />
      }
  }

  returnDefaultLatitude(){
    if (this.props.mappedDinosaur.coords[0][0]){
      return this.props.mappedDinosaur.coords[0][0]
    }

    else if (!this.props.mappedDinosaur.coords[0][0]){
      return this.props.mappedDinosaur.coords[0]
    }

  }

  returnDefaultLongitude(){
    if (this.props.mappedDinosaur.coords[0][0]){
      return this.props.mappedDinosaur.coords[0][1]
    }

    else if (!this.props.mappedDinosaur.coords[0][0]){
      return this.props.mappedDinosaur.coords[1]
    }

    else {
      return Alert.alert(
      'No fossils have been found for this dinosaur'
      )
    }
  }

  render() {
    return (
      /* ANIMATION OPTIONS: fadeInUp, zoomIn, bounceIn, flipInX, lightSpeedIn */
      <Overlay visible={this.props.fossilMapVisible} onClose={this.props.closeFossilMap} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems:'center'}}
      childrenWrapperStyle={{backgroundColor: 'transparent', borderRadius: 15, height: Dimensions.get('window').height*0.8, width: Dimensions.get('window').width*0.8}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          <View style={{backgroundColor: 'green', borderRadius: 5, marginTop: 5, marginBottom: 10, borderWidth: 2, borderColor: 'green'}}>
          <Text style={FossilMapStyle.fossilMapDescription}>{this.returnDinosaur()}</Text>
          </View>
              <MapView style={FossilMapStyle.map}
              scrollEnabled={true}
              toolbarEnabled={false}
              zoomEnabled={true}
              zoomControlEnabled={true}
              region={{
                latitude: this.returnDefaultLatitude() - 1,
                longitude: this.returnDefaultLongitude() - 1,
                latitudeDelta: 50,
                longitudeDelta: 50
              }}
              >
              <MapView.Marker
                                coordinate={{
                                  latitude: this.returnDefaultLatitude(),
                                  longitude: this.returnDefaultLongitude()
                                }}
                                title={`${this.props.mappedDinosaur.name}`}
                                pinColor={'green'}
                                description={`${this.props.mappedDinosaur.name} fossil found here`}
                                />
               {this.fossilsToMap()}
            </MapView>
          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

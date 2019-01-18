import React, { Component, Fragment } from 'react'
import { Modal, Alert, Dimensions, TouchableOpacity, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
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
                            pinColor={'limegreen'}
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
                          pinColor={'limegreen'}
                          description={`${this.props.dinosaur} fossil found here`}
                          />
      }
  }

  returnDefaultLatitude(){
        console.log("COORDS DINO", this.props.mappedDinosaur);
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

      <Overlay visible={this.props.fossilMapVisible} onClose={this.props.closeFossilMap} closeOnTouchOutside
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems:'center', height: Dimensions.get('window').height*0.9, width: Dimensions.get('window').width}}
      childrenWrapperStyle={{position: 'absolute', top: 0, backgroundColor: 'transparent', height: Dimensions.get('window').height*0.9, width: Dimensions.get('window').width}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>

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
                                pinColor={'limegreen'}
                                description={`${this.props.mappedDinosaur.name} fossil found here`}
                                />
               {this.fossilsToMap()}
            </MapView>

            <View style={{
            height: Dimensions.get('window').height * 0.125,
            backgroundColor: 'transparent',
            }}>
            <TouchableOpacity style={{
              marginTop: Dimensions.get('window').height * 0.05
            }}
            onPress={this.props.closeFossilMap}
            >
            <Image source={require('../assets/icons/close.png')} style={{height: 30, width: 30}}/>

            </TouchableOpacity>
          </View>

          </Fragment>
        )
      }
    </Overlay>
    )
  }
}

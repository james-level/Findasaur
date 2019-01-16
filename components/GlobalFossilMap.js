import React, { Component, Fragment } from 'react'
import { Modal, TouchableOpacity, Alert, Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import Overlay from 'react-native-modal-overlay';
import FossilMapStyle from '../Stylesheets/FossilMapStyle.js';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class GlobalFossilMap extends Component {

  returnDinosaur(){
    return this.props.mappedDinosaur.name + " fossils"
  }

  fossilsForAllDinosaurs(){

    return this.props.allDinosaurs.map( (dinosaur) =>
    this.fossilsToMap(dinosaur)

  )
  }

  fossilsToMap(mappedDinosaur){
    if (mappedDinosaur.coords[0][0]){
      return mappedDinosaur.coords.map( (coord, i) =>

          <MapView.Marker

          key={i}
                            coordinate={{
                              latitude: coord[0],
                              longitude: coord[1]
                            }}
                            title={`${mappedDinosaur.name}`}
                            pinColor={'limegreen'}
                            description={"Fossil found here"}
                            onPress={() => this.props.setClickedDinosaur(mappedDinosaur.name)}
                            >


                            </MapView.Marker>


        )
      }
      else if (!mappedDinosaur.coords[0][0]) {

        return
        <MapView.Marker

                          coordinate={{
                            latitude: mappedDinosaur.coords[0],
                            longitude: mappedDinosaur.coords[1]
                          }}
                          title={`${mappedDinosaur.name}`}
                          pinColor={'limegreen'}
                          description={`${mappedDinosaur.name} fossil found here`}
                          onPress={() => this.props.setClickedDinosaur(mappedDinosaur.name)}
                          >

                        </MapView.Marker>
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
      <Overlay visible={this.props.globalFossilMapVisible}
      animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems:'center', height: Dimensions.get('window').height*0.9, width: Dimensions.get('window').width}}
      childrenWrapperStyle={{position: 'absolute', top: 0, backgroundColor: 'transparent', height: Dimensions.get('window').height*0.9, width: Dimensions.get('window').width}}
      animationDuration={500}>
      {
        (hideModal, overlayState) => (
          <Fragment>
          {/*
          <View style={{backgroundColor: 'green', borderRadius: 5, marginTop: 5, marginBottom: 10, borderWidth: 2, borderColor: 'green'}}>
          <Text style={FossilMapStyle.fossilMapDescription}>{this.returnDinosaur()}</Text>
          </View>
          */}
              <MapView style={FossilMapStyle.map}
              scrollEnabled={true}
              toolbarEnabled={false}
              zoomEnabled={true}
              zoomControlEnabled={true}
              region={{
                latitude: 25,
                longitude: 25,
                latitudeDelta: 150,
                longitudeDelta: 150
              }}
              >
              <MapView.Marker

                                coordinate={{
                                  latitude: 25,
                                  longitude: 25
                                }}
                                title={"Default location"}
                                pinColor={'limegreen'}
                                description={"Not fossil - just default"}
                                />
                                {this.fossilsForAllDinosaurs()}
            </MapView>

            <View style={{
            height: Dimensions.get('window').height * 0.125,
            backgroundColor: 'transparent',
            }}>
            <TouchableOpacity style={{
              marginTop: Dimensions.get('window').height * 0.05
            }}
            onPress={this.props.closeGlobalFossilMap}
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

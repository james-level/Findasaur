import React, { Component } from 'react';
import ImageBackground from 'react-native';
import FitImage from 'react-native-fit-image';
import { Dimensions, FlatList, ScrollView, Image, TouchableHighlight, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo';
import _ from 'lodash';
import { MockRobotsList } from './FakerMocks';
import Pagination from 'react-native-pagination';
import AutoHeightImage from 'react-native-auto-height-image';
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 100;
import DinoListViewStyle from '../Stylesheets/DinoListViewStyle.js';
import Autocomplete from 'react-native-autocomplete-input';

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
      modalVisible: false,
      items: this.populateDinosaurs(this.props.everySingleDinosaur)
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toggleDinosaurView = this.toggleDinosaurView.bind(this);
    this.updateClickedDinosaur = this.updateClickedDinosaur.bind(this);
    this.closeDinosaurView = this.closeDinosaurView.bind(this);
  }

  setModalVisible(visible) {
    console.log("DINOSAURS", this.state.items);
    this.setState({modalVisible: visible});
  }

  updateClickedDinosaur(i){
  console.log("DINO", i);
  }

  toggleDinosaurView() {
    this.setState({
      dinosaurViewVisible: !this.state.dinosaurViewVisible
    });
  }

  closeDinosaurView(){
    this.setState({
      dinosaurViewVisible: false
    });

  }

  capitaliseDiet(diet){
    if (diet){
    return diet.charAt(0).toUpperCase() + diet.slice(1);
  }
    else {
      return;
    }
  }

  buildDinosaurNameList(){
    dinosaurs = this.state.items;

    return this.state.items.map(dinosaur => dinosaur.name
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

  renderMatches(dinosaurs){
    return dinosaurs.map((dinosaur, i) =>
      <TouchableOpacity onPress={this.updateClickedDinosaur(i)} key={((new Date).getTime() + Math.random())}>
      <Text style={{color: 'black', fontSize: 16}} key={((new Date).getTime() + Math.random())}>{dinosaur}</Text>
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

  findDinosaur(query) {
   if (query === '') {
     return [];
   }

   const dinosaurs = this.buildDinosaurNameList();
   const regex = new RegExp(`${query.trim()}`, 'i');
   console.log(dinosaurs.filter(dinosaur => dinosaur.search(regex) >= 0));
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
    console.log("LIST RETURN", this.buildDinosaurNameList());
    const query = this.state.dinosaurTyped;
    const dinosaurs = this.findDinosaur(query);
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
                  color: 'rgba(0,0,0,.4)',
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 15
                }}
              >
                Pick a dinosaur!
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
              <Text onPress={() => { this.setModalVisible(true) }}>
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

{/* This below icon (ios-globe-outline) is currently linked to 'delete' need to redirect to a AMP view (of all dinos)*/}
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
        containerStyle={{width: 250}}
        data={this.buildDinosaurNameList().length === 1 && comp(query, this.buildDinosaurNameList()[0]) ? [] : dinosaurs}
        defaultValue={query}
        onChangeText={dinosaur => this.setState({ dinosaurTyped: dinosaur })}
        placeholder="Search for a dinosaur by name"
        renderItem={({ dinosaur }) => (
          <TouchableOpacity onPress={() => this.setState({ dinosaurTyped: `${dinosaur}` })}>
          </TouchableOpacity>
        )}
      />
      <View style={{backgroundColor: 'white', paddingLeft: 10, paddingRight: 10}}>
        {dinosaurs.length > 0 ? (
          this.renderMatches(dinosaurs)
        ) : (
          <Text> </Text>
        )}
      </View>
    </View>


        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View>

          <LinearGradient
          colors={['black', '#1e932d']}
          style={{ padding: 25 }}>

            <View style={DinoListViewStyle.infoModal}>

                <ScrollView>
                  <Text style= {[DinoListViewStyle.infoModalHeading, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                    <View style={{alignItems: "center"}}>
                      <Image source={require('../assets/Dino_images/friendlydino.gif')} style={{height: 150, width: 225}}/>
                    </View>
                  <Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur, an app by<Text style={{fontSize: 17, fontFamily: 'PoiretOne-Regular', color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/jah1603')}>James Henderson</Text><Text style={{fontSize: 17, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/SFR1981')}>, Stephen Rooney</Text> &<Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://github.com/DavidAPears')}> David Pears.</Text><Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>They can usually be found in an Edinburgh cafe, trying to figure out <Text style={{fontSize: 18, color: 'limegreen'}} onPress={()=>Linking.openURL('https://www.reactnative.com')}>ReactNative.</Text></Text></Text>

                  <Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur looks to educate users on various dinosaurs from a range of eras. It utilises the Wikipedia API to provide information relating to aspects of each speciment, such as diet and location (of fossil finds)</Text>

                  <Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur is based on an exisitng webproject (Findasaurus), however the conversion to ReactNative is soley ours. Icons provided by 'FlatIcons'. This app is an not-for-profit project.</Text>

                  <Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>Findasaur</Text>
                  <Text style= {[DinoListViewStyle.infoModalText, { fontFamily: 'PoiretOne-Regular'}]}>January 2019</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                  <Image source={require('../assets/icons/close.png')} style={{height: 25, width: 25, marginBottom: 10, marginLeft: '50%'}}/>
                  </TouchableHighlight>
                  </ScrollView>
                </View>
                </LinearGradient>
              </View>
            </Modal>
          </View>

          /* Modal for individual dinosaur view */
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
                  <Text> {this.returnClickedDinosaur()} </Text>

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

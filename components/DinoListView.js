import React, { Component } from 'react';
import {ImageBackground} from 'react-native';
import FitImage from 'react-native-fit-image';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { MockRobotsList } from './FakerMocks';
import Pagination from 'react-native-pagination';
import AutoHeightImage from 'react-native-auto-height-image';
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 100;

export default class DinoListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeId: null,
      activeItem: null,
      items: this.populateDinosaurs(this.props.allDinosaurs)
    };
  }

  populateDinosaurs(dinosaurs){

    console.log("DINOS TO RENDER", dinosaurs);

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
      locations: dinosaurs[i].coords
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
              ? { backgroundColor: 'limegreen' }
              : { backgroundColor: 'black' }
          ]}
        >
        <Image style={s.fossil} source={require('../assets/icons/fossil.png')}/>



          <Text
            style={[
              s.name2,
              this.state.activeId === o.item.id
                ? { color: 'limegreen' }
                : { color: '#ffffff' }
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
                Make a Selection!
              </Text>
            </View>
          )}

          {this.state.activeItem && (
            <TouchableOpacity
              onPress={() => this.setItemAsActive(this.state.activeItem)}
              style={[s.renderItem, s.activeItem]}
            >
          

            <AutoHeightImage
         width={300}
         source={{uri: `${this.returnImageFromStored()}`}}
         />
              <Text> {this.state.activeItem.name} </Text>
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
              color="rgba(0,0,0,0.5)"
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
            <Ionicons
              name={'ios-trash-outline'}
              size={25}
              color="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>

          <Pagination
            horizontal
            // debugMode
            // dotSwapAxis
            // dotPositionSwap
            listRef={this.refs} //to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
            dotIconNameNotActive={'account-outline'}
            dotIconNameEmpty={'account-off'}
            dotIconNameActive={'account-settings'}
            dotTextHide
            dotIconSizeNotActive={20}
            dotIconSizeActive={27}
            dotIconSizeEmpty={27}
            //iconColorhasNotSeen={"red"}
            paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
            paginationItems={this.state.items} //pass the same list as data
            paginationItemPadSize={3}
          />
        </View>
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
    backgroundColor: 'limegreen',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  text: {
    fontWeight: '600',
    fontSize: 100,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  renderItem: {

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.8
  },
  activeItem: {
    backgroundColor: '#f5fcff',
    shadowColor: 'rgba(255,255,255,1)'
  },
  name: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    fontSize: 12,
    width: 100,
    textAlign: 'center',
    fontWeight: '600'
  },
  name2: {
    position: 'absolute',
    bottom: -14,
    left: 0,
    right: 0,

    backgroundColor: 'black',
    fontSize: 12,
    width: 150,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20
  },
  trashButton: {
    position: 'absolute',
    backgroundColor: '#ff5b5f',
    right: 0,
    bottom: 0,
    margin: 10,
    zIndex: 3,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: 150,
    height: 150,
  },
  fossil: {
    width:150,
    height: 150
  },
  activeImage: {
    width: 200,
    height: 200
  },
  fitImage: {
    borderRadius: 20,
  },
  fitImageWithSize: {

    width: 150,
    height: 150
  }
});

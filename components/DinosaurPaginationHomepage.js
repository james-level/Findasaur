import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import faker from 'faker';
// Get here [TODO ADD URL]
import Period from './Period';
import Pagination from 'react-native-pagination';
import _ from 'lodash';// If you dont have this then gtfo
import { MockTweetList } from './FakerMocks';

const bonesIcon = require('../assets/app_icons/bones.png');


export default class DinosaurPaginationHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [

        {
          id: 0,
          index: 0,
          key: 0,
          title: "Middle Triassic",
          color: '#000000',
          description: "247 to 237 million years ago",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 1,
          index: 1,
          key: 1,
          title: "Late Triassic",
          color: '#2A2A2A',
          description: "Late Triassic",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 2,
          index: 2,
          key: 2,
          title: "Early Jurassic",
          color: 'black',
          description: "Early Jurassic",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 3,
          index: 3,
          key: 3,
          title: "Middle Jurassic",
          color: '#2A2A2A',
          description: "Middle Jurassic",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 4,
          index: 4,
          key: 4,
          title: "Late Jurassic",
          color: 'black',
          description: "Late Jurassic",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 5,
          index: 5,
          key: 5,
          title: "Early Cretaceous",
          color: '#2A2A2A',
          description: "Early Cretaceous",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },

        {
          id: 6,
          index: 6,
          key: 6,
          title: "Late Cretaceous",
          color: 'black',
          description: "Late Cretaceous",
          // Image:faker.image.business(),
          image: faker.internet.avatar()
        },


      ]
      // Selected: (new Map(): Map<string, boolean>),
    };
  }
  // Render list seen here [TODO ADD URL]
  _renderItem = ({ item }) => (
    <Period
    onPressItem={this._onPressItem}
    title={item.title}
    color={item.color}
    description={item.description}
    image={item.image}
  />);
  // Map to some key. We use the "id" attribute of each item in our list created in our MockTweetList
  _keyExtractor = (item, index) => item.id.toString()
  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => this.setState({ viewableItems })
  render() {
      console.log(this.state.items)
    return (
      <View style={[ s.container ]}>
        <FlatList
            ref={r => this.refs = r}
            data={this.state.items}
            horizontal
            keyExtractor={this._keyExtractor}
            onViewableItemsChanged={this.onViewableItemsChanged}// Map your keys to whatever unique ids the have (mine is a "id" prop)
            pagingEnabled
            renderItem={this._renderItem}
        />
            <Pagination
        // DotThemeLight
          horizontal
          dotOnPress={(o) => console.log(' clicked: ', o)}
          hideEmptyDots
            pagingEnabled
          startDotIconFamily="Ionicons"
          startDotIconName="ios-arrow-back"
          endDotIconFamily="Ionicons"
          endDotIconName="ios-arrow-forward"
          dotIconName="ios-close"
            hideEmptyDots
          dotIconFamily="Ionicons"
          dotIconNameNotActive="logo-twitter"
          dotIconNameActive="logo-twitter"
          dotEmptyHide
          dotIconColorActive="white"
          dotIconColorNotActive="rgba(255,255,255,0.5)"
          // DotIconColorEmpty={"blue"}
          dotIconSizeActive={25}
          /*
           *  DotIconSizeNotActive={10}
           * StartDotIconSize={30}
           * EndDotIconSize={30}
           */
          listRef={this.refs}// To allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
          paginationVisibleItems={this.state.viewableItems}// Needs to track what the user sees
          paginationItems={this.state.items}// Pass the same list as data
          paginationItemPadSize={3}
        />
        </View>);
  }
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'// <-- use with "dotThemeLight"
  }
});

 import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const FavouritesStyle = StyleSheet.create({
  favouritesModal:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  favouritesModalHeading:{
    color: 'limegreen',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  favouritesModalBody:{
    color: 'limegreen',
    paddingTop: 50,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  favouritesModalText: {
    fontSize: 17,
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  favouritesModalHeader: {
    fontSize: 26,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 100,
    paddingBottom: 10,
  },
  favouritesText: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalHeader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginTop: 20
  },

  modalFavourite: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deleteFavourite: {
    fontSize: 22,
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

});

export default FavouritesStyle;

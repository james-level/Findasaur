 import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const FavouritesStyle = StyleSheet.create({
  favouritesModal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  favouritesModalHeading:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  favouritesModalText: {
    fontSize: 17,
    color: 'black',
  },
  favouritesModalHeader: {
    fontSize: 26,
    color: 'black',
    marginBottom: 20
  },
  favouritesText: {
    fontSize: 22,
    color: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modalHeader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 30
  },

  modalFavourite: {
    fontSize: 22,
    color: 'black',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  deleteFavourite: {
    fontSize: 22,
    color: 'red',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

});

export default FavouritesStyle;

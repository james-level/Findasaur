import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const FavouriteModalStyle = StyleSheet.create({

  infoModalHeader: {
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
    backgroundColor: 'indigo',
    borderRadius: 5,
    marginTop: 20
  },

  modalPronunciation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  infoModalText: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
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
    backgroundColor: 'white',
  },

});

export default FavouriteModalStyle;

import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const DinoListViewStyle = StyleSheet.create({


  infoModalHeader: {
    fontSize: 24,
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
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 20
  },

  modalPronunciation: {
    fontSize: 24,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  modalMapLink: {
    fontSize: 24,
    color: 'limegreen',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  infoModalText: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 25,
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
    backgroundColor: 'black',
  },

  name2: {
    bottom: -14,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

});

export default DinoListViewStyle;

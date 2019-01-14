import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const DinoListViewStyle = StyleSheet.create({


  infoModalHeader: {
    fontSize: 24,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 25
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 25,
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
    // rgba(255,255,255,1)
  },

  name2: {
    position: 'relative',
    bottom: -14,
    left: 0,
    right: 0,
    backgroundColor: 'pink',
    fontSize: 12,
    width: 150,
    textAlign: 'left',
    fontWeight: '600',
    marginBottom: 20
  },

});

export default DinoListViewStyle;

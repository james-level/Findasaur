import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const AboutModalStyle = StyleSheet.create({
  aboutModal:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  aboutModalHeading:{
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  aboutModalBody:{
    color: 'black',
    paddingTop: 25,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  aboutModalText: {
    fontSize: 17,
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  aboutModalHeader: {
    fontSize: 22,
    color: 'black',
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
    marginTop: 20,
    paddingLeft: 20,
  },

  modalFavourite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

});

export default AboutModalStyle;

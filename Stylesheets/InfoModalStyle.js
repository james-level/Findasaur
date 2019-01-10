import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const InfoModalStyle = StyleSheet.create({
  infoModal:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoModalHeading:{
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  infoModalBody:{
    color: 'black',
    paddingTop: 50,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  infoModalText: {
    fontSize: 17,
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  infoModalHeader: {
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
    marginTop: 20
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

export default InfoModalStyle;

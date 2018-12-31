import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const InfoModalStyle = StyleSheet.create({
  infoModal:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoModalHeading:{
    color: 'limegreen',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  infoModalBody:{
    color: 'limegreen',
    paddingTop: 50,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  infoModalText: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});

export default InfoModalStyle;

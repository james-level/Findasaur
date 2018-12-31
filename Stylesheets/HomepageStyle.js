import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const HomepageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  content1: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: 'limegreen',
    paddingTop: 50,
    fontSize: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
},
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customSlide: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: 375,
    height: 250,
  },
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
  // backgroundImage: {
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

});

export default HomepageStyle;

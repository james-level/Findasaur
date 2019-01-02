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
iconsContainer: {
  flex: 0.1,
  justifyContent: 'center',
  flexDirection: 'row',
  backgroundColor: 'transparent',
},
  // backgroundImage: {
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

});

export default HomepageStyle;

import { StyleSheet, Text, View } from 'react-native';

const HomepageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: { backgroundColor: '#FF0033', height: 350 },
  content1: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    width: '100%',
    backgroundColor: 'black',
    height: 100,
    marginBottom: 20,
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
    backgroundColor: 'black',
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
});

export default HomepageStyle;

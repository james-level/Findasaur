import { StyleSheet, Text, View } from 'react-native';


const homeImageCarouselStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  },
  slider: { backgroundColor: '#000', height: 350 },
  content1: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: { color: 'white' },
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
  buttonSelected: {
    opacity: 1,
    color: 'limegreen',
  },
  customSlide: {
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: 375,
    height: 250,
  },
});

export default homeImageCarouselStyle;

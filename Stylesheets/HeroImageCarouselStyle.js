import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const HeroImageCarouselStyle = StyleSheet.create({

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

export default HeroImageCarouselStyle;

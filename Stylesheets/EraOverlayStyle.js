import { StyleSheet, Dimensions, Text, View, ImageBackground } from 'react-native';

const EraOverlayStyle = StyleSheet.create({
  eraOverlayHeader: {
    color: 'limegreen',
    marginBottom: 10,
    fontSize: 25,
    fontFamily: 'PoiretOne-Regular',
  },
  eraOverlayDescription: {
    color: 'white',
    padding: 5,
    fontSize: Dimensions.get('window').height < 800 ? 17 : 20,
    fontFamily: 'PoiretOne-Regular'
  },
});

export default EraOverlayStyle;

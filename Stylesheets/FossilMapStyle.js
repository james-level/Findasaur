import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

const FossilMapStyle = StyleSheet.create({
  map: {
    borderColor: 'transparent',
    height: Dimensions.get('window').height*1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  fossilMapDescription: {
    color: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'PoiretOne-Regular'
  },
});

export default FossilMapStyle;

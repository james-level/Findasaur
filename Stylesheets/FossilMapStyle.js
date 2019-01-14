import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

const FossilMapStyle = StyleSheet.create({
  map: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    height: Dimensions.get('window').height*0.8,
    width: Dimensions.get('window').width*0.8
  },
  fossilMapDescription: {
    color: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'PoiretOne-Regular'
  },
});

export default FossilMapStyle;

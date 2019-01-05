import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const ChooseTimePeriodStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  iconsContainer: {
    flex: 0.9,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  loadingText: {
    fontSize: 22,
    color: 'white',
    paddingTop: 0,
  },
});

export default ChooseTimePeriodStyle;

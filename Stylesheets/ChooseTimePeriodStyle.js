import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const ChooseTimePeriodStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  iconsContainer: {
    flex: 2.5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  plusContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  loadingText: {
    fontSize: 22,
    color: 'white',
    paddingTop: 0,
  },
});

export default ChooseTimePeriodStyle;

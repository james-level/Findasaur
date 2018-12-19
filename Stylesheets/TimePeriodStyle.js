import { StyleSheet, Text, View } from 'react-native';

const TimePeriodStyle = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    color: 'white'
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  linearGradient: {
    flex: 1,
    borderRadius: 0
  },
  reactionBox: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  description: {
    width: 0,
    height: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  // -------
  profilePicture: {
    width: "100%",
    height: 224.9,
    backgroundColor: 'black'
  },
  displayName: {
    fontFamily: 'FrederickatheGreat-Regular',
    color: '#00e500',
    marginTop: 22,
    fontSize: 33,
    marginBottom: 5
  },
  badgeSection: {
    // Flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    marginRight: 10,
    // MarginTop: 15,
    justifyContent: 'center'
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

export default TimePeriodStyle;

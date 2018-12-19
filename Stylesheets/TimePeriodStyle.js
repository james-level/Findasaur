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
  eraTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    position: 'absolute',
    top: '30%',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});

export default TimePeriodStyle;

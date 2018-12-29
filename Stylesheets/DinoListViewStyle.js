import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const DinoListViewStyle = StyleSheet.create({

  text: {
    // fontWeight: '600',
    // fontSize: 100,
    // textAlignVertical: 'center',
    // textAlign: 'center'
  },

  infoModal:{
    // backgroundColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row'
  },

  infoModalHeading:{
    // color: 'limegreen',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 50,
    // fontSize: 30,
    // backgroundColor: 'transparent',
  },

  infoModalBody:{
    // color: 'limegreen',
    // paddingTop: 50,
    // fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // backgroundColor: 'transparent',
  },
  infoModalHeader: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },

  modalHeader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15
  },

  infoModalText: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },

  renderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.8
  },

  activeItem: {
    backgroundColor: 'white',
    // rgba(255,255,255,1)
  },
  name: {
    // position: 'absolute',
    // bottom: -34,
    // left: 0,
    // right: 0,
    // backgroundColor: 'transparent',
    // fontSize: 12,
    // width: 100,
    // textAlign: 'center',
    // fontWeight: '600'
  },
  name2: {
    position: 'absolute',
    bottom: -14,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    fontSize: 12,
    width: 150,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20
  },

  trashButton: {
    // position: 'absolute',
    // backgroundColor: '#ff5b5f',
    // right: 0,
    // bottom: 0,
    // margin: 10,
    // zIndex: 3,
    // height: 35,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'transparent'
  },
  image: {
    // width: 150,
    // height: 150,
  },
  fossil: {
    // width: 50,
    // height: 50
  },
  activeImage: {
    // width: 10,
    // height: 10,
  },
  fitImage: {
    // borderRadius: 50,
  },
  fitImageWithSize: {
    // width: 150,
    // height: 150
  }
});

export default DinoListViewStyle;

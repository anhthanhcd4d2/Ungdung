import {Dimensions, StyleSheet} from 'react-native';

const stylesLogin = StyleSheet.create({});
const sceen= Dimensions.get('window')
const stylesRenderInput = StyleSheet.create({
  wrapAll: {},
});
const stylesRenderBnt = StyleSheet.create({
  textName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
const styleSign = StyleSheet.create({
  wrapAll: {
    height: sceen.height,
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgb(255,255,255)',

  },
  wrapBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  wrapBlockView_Text: {
    flex: 30,
    justifyContent: 'flex-start',
  },
  wrapBlockView_Input: {
    flex: 70,
  },
  bntStyle: {
    marginTop: 30,
    backgroundColor: 'rgb(243,243,243)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'red',
  },
  wrapBlockView_bnt: {
    marginTop: 30,
  },
  errorMessage: {
    color: 'red',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7--- )',
  },
  wrapBlockView_twoBnts: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  twoBnts_block: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkAccount:{
    position: 'absolute',
    right: 0,
    top: 10,
    zIndex: 1,
    width: 50,
    height: 35,
    backgroundColor: '#266C99',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  wrapBlockView_twoBnts_stylesName: {
    fontWeight: '400',
    color: 'rgb(0.0.0)',
    textAlign: 'center',
  },
});
const styleHome = StyleSheet.create({
  infoIcon: {
    width: 30,
    height :30,
  },

});
const styleInfo = StyleSheet.create({
  wrapAll:{
    flex: 1,
    alignItems: 'center',
  },
  wrapConten:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockConten:{
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  blockPressable:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textPressable:{
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgb(22,117,156)',
    borderRadius: 5,
    color: 'black',
    margin: 5,
  }


})
export {stylesRenderInput, stylesLogin, stylesRenderBnt, styleSign,styleHome,styleInfo};

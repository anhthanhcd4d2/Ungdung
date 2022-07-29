import {StyleSheet} from 'react-native';

const stylesLogin = StyleSheet.create({});

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
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
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
    fontSize: 18,
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
  wrapBlockView_twoBnts_stylesName: {
    fontWeight: '400',
    color: 'rgb(0.0.0)',
    textAlign: 'center',
  },
});
export {stylesRenderInput, stylesLogin, stylesRenderBnt, styleSign};

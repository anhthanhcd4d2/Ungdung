import {combineReducers} from 'redux';

export const initUseLogin = {
  use: {
    accction: '',
    password: '',
  },
};

import {SIGN_IN} from '../acction/actions';

function reducer(state = initUseLogin, action: {type: string; payload: any}) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        use: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export default combineReducers({key: reducer});

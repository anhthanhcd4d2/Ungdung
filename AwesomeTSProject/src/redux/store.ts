import {createStore} from 'redux';
import rootRucer from "./reducer/reducer";

const store = createStore(rootRucer);
export default  store

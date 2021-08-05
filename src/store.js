import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import reducer from './redux/reducers/reducer';

const initialState = {};
const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware));
const store = createStore(reducer, initialState, composedEnhancers);

export default store;
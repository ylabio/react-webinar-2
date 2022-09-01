import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config) {
  return createStore(combineReducers(reducers), undefined, compose(applyMiddleware(thunk.withExtraArgument(services))));
}

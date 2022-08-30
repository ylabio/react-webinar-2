import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from './exports';

export default function createStoreRedux(services, config){
  return createStore(combineReducers(reducers), undefined, composeWithDevTools(applyMiddleware(
    thunk.withExtraArgument(services))
  ));
}

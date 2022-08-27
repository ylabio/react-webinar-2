import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config) {
  return createStore(combineReducers(reducers), undefined, compose(applyMiddleware(
    thunk.withExtraArgument(services)
  ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));  //девтулс редакс, включатся только если есть расширение браузера
}

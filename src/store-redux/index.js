import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config) {
	return createStore(
		combineReducers(reducers),
		undefined,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument(services))),
	);
}

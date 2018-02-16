import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';

import { routerMiddleware } from 'react-router-redux';

export default function configureStore(browserHistory) {

	// On récupère la fonction composeEnhancers de l'extension
	// chrome si elle existe sinon on utiliser la fonction
	// compose de redux
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	let preloadedState = window.__PRELOADED_STATE__ || {};

	const logger = createLogger();
	const store = createStore(
	  reducer,
	  // On enrobe le applyMiddleware avec
		// le composeEnhancers de redux-devtools
		preloadedState,
	  composeEnhancers(
	    applyMiddleware(thunk, logger, routerMiddleware( browserHistory))
	  )
	);
	return store;
}
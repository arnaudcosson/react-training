import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";

import Video from './containers/Video';
import VideoList from './containers/VideoList';
import VideoForm from './containers/VideoForm';
import reducer from "./reducers";
import configureStore from './store/configureStore';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { Router, useRouterHistory } from 'react-router';

import routes from './js/routes';
import {createHistory} from 'history';

// On crée le store en lui fournissant le "reducer"
// const store = createStore( reducer );
//
// Pour pouvoir utiliser les Redux Devtools la syntaxe,
// plus complexe est externalisée dans un module configureStore
const browserHistory = useRouterHistory(createHistory)({
	basename: config.basePath // racine du site qui sera concaténée aux URLs du Router
});
const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
	, document.getElementById('app')
);
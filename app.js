import React from 'react';
import ReactDOM from 'react-dom';
import Video from "./containers/Video"
import VideoList from './containers/VideoList';
import VideoForm from './containers/VideoForm';
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from './store/configureStore';

const store = configureStore();
 
ReactDOM.render(
    <Provider store={store}>
        <Video />
    </Provider>,
    document.getElementById( 'app' )
);
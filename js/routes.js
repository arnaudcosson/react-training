import React from 'react';
import App from '../containers/App';
import VideoList from '../containers/VideoList';
import VideoForm from '../containers/VideoForm';
import Video from '../containers/Video';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={VideoList} />
        <Route path="videos/new" component={VideoForm} />
        <Route path="videos/:id" component={Video} />
</Route> )
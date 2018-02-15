// Créer un action creator fetchVideos() dans le fichier actions/index.js. Cet action creator devra :

import request from 'superagent';

export const VIDEO_LIST_COMPLETE = 'VIDEO_LIST_COMPLETE';
export const VIDEO_COMPLETE = 'VIDEO_COMPLETE';
export const VIDEO_COMMENTS_COMPLETE = 'VIDEO_COMMENTS_COMPLETE';
export const COMMENT_CHANGE = 'COMMENTS_CHANGE';
export const COMMENT_ADDED = 'COMMENTS_ADDED';

export default function fetchVideos(){
    return function( dispatch, getState ) {
        request
        .get(`${config.apiPath}/videos`)
        .then((res) => {
            dispatch( {type: VIDEO_LIST_COMPLETE, videos: res.body} );
            // res.body, res.headers, res.status
        })
        .catch(function(err) {
            // err.message, err.response
        });
    }
}

export function fetchVideo(){
    console.log('fetchVideo');
    return function( dispatch, getState ) {
        request
        .get(`${config.apiPath}/videos/1`)
        .then((res) => {
            dispatch( {type: VIDEO_COMPLETE, video: res.body} );
            dispatch( fetchComments() );
        })
        .catch(function(err) {
            // err.message, err.response
        });
    }
}

export function fetchComments(){
    return function( dispatch, getState ) {
        request
        .get(`${config.apiPath}/videos/1/comments`)
        .then((res) => {
            dispatch( {type: VIDEO_COMMENTS_COMPLETE, comments: res.body} );
        })
        .catch(function(err) {
            // err.message, err.response
        });
    }
}

export function commentChanged(value){
    return {
        type: COMMENT_CHANGE,
        content: value
    }
}
export function postComment(){
    return function( dispatch, getState ) {
        // this.setState({loading: true});
        request
        .post(`${config.apiPath}/videos/1/comments`)
        .send('content=' + encodeURIComponent(getState().content))
        .then((response) => {
            dispatch( {type: COMMENT_ADDED, comment: response.body} );
        });
    }
}
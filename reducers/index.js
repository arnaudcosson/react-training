import {VIDEO_LIST_COMPLETE} from '../actions/index';
import {VIDEO_COMPLETE} from '../actions/index';
import {VIDEO_COMMENTS_COMPLETE} from '../actions/index';
import {COMMENT_CHANGE} from '../actions/index';
import {COMMENT_ADDED} from '../actions/index';

const DEFAULT_STATE = {
    videos: [],
    video: {},
    loading: false,
    content:'',
    comment: {}
}

export default (state = DEFAULT_STATE, action) => {
    if( action.type === VIDEO_LIST_COMPLETE ){
        return {
            ...state,
            videos: action.videos
        }
    }
    if( action.type === VIDEO_COMPLETE ){
        return {
            ...state,
            video: action.video
        }
    }
    if( action.type === VIDEO_COMMENTS_COMPLETE ){
        return {
            ...state,
            video: {
                ...state.video,
                comments: action.comments
            }
        }
    }
    if( action.type === COMMENT_CHANGE ){
        return {
            ...state,
            content: action.content
        }
    }
    if( action.type === COMMENT_ADDED ){
        return {
            ...state,
            video: {
                ...state.video,
                comments: [...state.video.comments, action.comment]
            }
        }
    }
    return state;
}
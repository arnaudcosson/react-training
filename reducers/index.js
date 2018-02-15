import {VIDEO_LIST_COMPLETE} from '../actions/index';

const DEFAULT_STATE = {
    videos: []
}

export default (state = DEFAULT_STATE, action) => {
    if( action.type === VIDEO_LIST_COMPLETE ){
        return {
            ...state,
            videos: action.videos
        }
    }
    return state;
}
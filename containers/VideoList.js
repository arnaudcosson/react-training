import React from 'react';
// import videos from './videos'
import VideoItem from '../components/VideoItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchVideos from '../actions/index';

function mapStateToProps( state ){
    return {
        videos: state.videos,
    }
}

function mapDispatchToProps( dispatch )
{
    return bindActionCreators( {fetchVideos}, dispatch );
}

class VideoList extends React.Component{
    constructor(...args) {
        super(...args);
    }
    
    render(){
        return (
            <div className="row marketing">
                <div className="col-lg-12">
                    <ul className="media-list">
                    {this.props.videos.map( video => (
                        <VideoItem video={video} key={video.id}/>
                    ) )}
                    </ul>
                </div>
            </div>
        )
    }
    
    componentWillMount(){
        // get videos from store
        this.props.fetchVideos();
    }

    componentDidMount(){
        // this.interval = setInterval(this.addNewVideo, 2000);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
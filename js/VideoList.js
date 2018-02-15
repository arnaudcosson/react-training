import React from 'react';
import videos from './videos'
import VideoItem from './VideoItem';

class VideoList extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = 
        {
            videos: videos
        };
        this.addNewVideo = this.addNewVideo.bind(this);
    }

    render(){
        return (
            <div className="row marketing">
                <div className="col-lg-12">
                    <ul className="media-list">
                    {this.state.videos.map( video => (
                        <VideoItem video={video} key={video.id}/>
                    ) )}
                    </ul>
                </div>
            </div>
        )
    }

    
    addNewVideo(){
        const sampleVideo = {
            title: 'The first video',
            description: 'An amazing bunny video from Internet',
            file: 'http://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
        }
        this.setState( {
            videos: [{id: this.state.videos.length+1, ...sampleVideo}, ...this.state.videos ]
        });
    }

    componentDidMount(){
        // this.interval = setInterval(this.addNewVideo, 2000);
    }
}

export default VideoList;
import React from 'react';

class VideoList extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = 
        {
            videos: [
                {
                    id: 1,
                    title: 'The first video',
                    description: 'An amazing bunny video from Internet',
                    file: 'http://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
                },
                {
                    id: 2,
                    title: 'The second video',
                    description: 'An amazing video from Internet',
                    file: 'http://sample-videos.com/video/mp4/720/big_buck_bunny_720p_20mb.mp4'
                }
            ]
        };
        this.addNewVideo = this.addNewVideo.bind(this);
    }

    render(){
        return (
            <div className="row marketing">
                <div className="col-lg-12">
                    <ul className="media-list">
                    {this.state.videos.map( video => (
                        <li key={video.id}
                            className="media">
                            <div className="media-left">
                            <img className="media-object"
                            alt="cat" src='https://loremflickr.com/320/240/cat?r=0.1267489'
                            width="120"
                            height="70" />
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">{video.title}</h4>
                                <p>{video.description}</p>
                            </div>
                        </li>
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
        this.interval = setInterval(this.addNewVideo, 2000);
    }
}

export default VideoList;
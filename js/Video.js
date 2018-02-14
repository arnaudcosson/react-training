import React from 'react';
import videos from './videos'

class Video extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            selectedIndex: 0,
            video: videos[0]
        }
        this.changeVideo = this.changeVideo.bind(this);
    }
    
    render() {
        let style = {
            width: '100%',
            backgroundColor: 'black'
        }
        return (        
            <div className="row marketing">
                <div className="col-sm-12 col-md-12">
                    <div className="thumbnail">
                        <div className="caption">
                            <video
                                style={style}
                                height="300"
                                controls
                                src={this.state.video && this.state.video.file}
                            >
                            </video>
                            <h3>{this.state.video &&this.state.video.title}</h3>
                            {this.state.video && this.state.video.description && <p>{this.state.video.description}</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        this.interval = setInterval(this.changeVideo, 5000);
    }
    
    shouldComponentUpdate( nextProps, nextState ){
        return nextState.video.file != this.state.video.file;
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    changeVideo(){
        let newIndex = (this.state.selectedIndex+1) % videos.length;
        this.setState({
            selectedIndex: newIndex,
            video: videos[newIndex]
        });
    }
}
export default Video;

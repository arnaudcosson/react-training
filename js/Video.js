import React from 'react';
import videos from './videos'

class Video extends React.Component{
    player;
    constructor(...args) {
        super(...args);
        this.state = {
            selectedIndex: 0,
            video: videos[0]
        }
        this.nextVideo = this.nextVideo.bind(this);
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
                            <video ref={ el => this.player = el }
                                style={style}
                                height="300"
                                controls
                                src={this.state.video && this.state.video.file}
                            >
                            </video>
                            <h3>{this.state.video &&this.state.video.title}</h3>
                            {this.state.video && this.state.video.description && <p>{this.state.video.description}</p>}
                            <button onClick={() => this.nextVideo()}>Next video</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        this.autoPlay();
        // this.interval = setInterval(this.nextVideo, 5000);
    }
    
    shouldComponentUpdate( nextProps, nextState ){
        return nextState.video.file != this.state.video.file;
    }
    componentDidUpdate( prevProps, prevState ) {
        this.autoPlay();
    }
    
    componentWillUnmount(){
        // clearInterval(this.interval);
    }
    
    nextVideo(){
        let newIndex = (this.state.selectedIndex+1) % videos.length;
        this.setState({
            selectedIndex: newIndex,
            video: videos[newIndex]
        });
    }
    autoPlay(){
        // Autoplay video
        this.player.play();
    }
}
export default Video;

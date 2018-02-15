import React from 'react';
// import videos from './videos';
import request from 'superagent';

class Video extends React.Component{
    player;
    constructor(...args) {
        super(...args);
        this.state = {
            selectedIndex: 0,
            video: {}
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
    componentWillMount(){
        request
        .get(`${config.apiPath}/videos/1`)
        .then((res) => {
            console.log(res.body);
            this.setState(
                {
                    video: res.body
                }
            );
            // res.body, res.headers, res.status
        })
        .catch(function(err) {
            // err.message, err.response
        });
        config.apiPath + "/videos/:id"
    }
    componentDidMount(){
        this.autoPlay();
        // this.interval = setInterval(this.nextVideo, 5000);
    }
    
    shouldComponentUpdate( nextProps, nextState ){
        return nextState.video.file != this.state.video.file;
    }
    componentDidUpdate( prevProps, prevState ) {
        if(prevState.video.id != this.state.video.id){
            this.autoPlay();
        }
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
        if(this.player){
            this.player.play();
        }
    }
}
export default Video;

import React from 'react';
// import videos from './videos';
import request from 'superagent';
import CommentForm from './CommentForm';
import VideoForm from './VideoForm';

class Video extends React.Component{
    player;
    constructor(...args) {
        super(...args);
        this.state = {
            selectedIndex: 0,
            video: {},
            comments: [],
            loading: false
        }
        this.nextVideo = this.nextVideo.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.voteForVideo = this.voteForVideo.bind(this);
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
                            {this.state.video.id && <CommentForm videoId={this.state.video.id} fetchComments={this.fetchComments}/>}
                            {this.state.video.id && 
                            <div>
                                <h4>Commentaires: </h4>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        {this.renderComments()}                                        
                                    </div>
                                </div>
                            </div>
                            }
                            <button onClick={() => this.voteForVideo('likes')} disabled={this.state.loading}><i className="fas fa-thumbs-up"></i></button>
                            <button onClick={() => this.voteForVideo('dislikes')} disabled={this.state.loading}><i className="fas fa-thumbs-down"></i></button>
                            <button onClick={() => this.nextVideo()}>Next video</button>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <VideoForm />
                    </div>

                </div>
            </div>
        )
    }

    renderComments(){
        return(
            this.state.comments.map( comment => (
                <h6 key={comment.id}><small>{comment.content}</small></h6>
            ) )
        )
    }

    componentWillMount(){
        this.fetchVideo();
        this.fetchComments();
    }

    componentDidMount(){
        // this.autoPlay();
        // this.interval = setInterval(this.nextVideo, 5000);
    }
    
    shouldComponentUpdate( nextProps, nextState ){
        return nextState.video.file != this.state.video.file || nextState.comments !== this.state.comments ;
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
    
    fetchVideo(){
        request
        .get(`${config.apiPath}/videos/1`)
        .then((res) => {
            // console.log(res.body);
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
    }

    fetchComments(){
        request
        .get(`${config.apiPath}/videos/1/comments`)
        .then((res) => {
            this.setState(
                {
                    comments: res.body
                }
            );
            // res.body, res.headers, res.status
        })
        .catch(function(err) {
            // err.message, err.response
        });
    }

    voteForVideo(type){
        this.setState({loading: true});
        request
        .post(`${config.apiPath}/videos/1/${type}`)
        .then((response) => {
            this.setState({loading: false});
        });
    }

}
export default Video;

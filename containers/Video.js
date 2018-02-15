import React from 'react';
// import videos from './videos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent';
import {fetchVideo} from '../actions/index';
import CommentForm from '../components/CommentForm';

function mapStateToProps( state ){
    return {
        video: state.video,
        loading: state.loading
    }
}

function mapDispatchToProps( dispatch )
{
    return bindActionCreators( {fetchVideo}, dispatch );
}

class Video extends React.Component{
    player;
    constructor(...args) {
        super(...args);
        this.nextVideo = this.nextVideo.bind(this);
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
                                src={this.props.video && this.props.video.file}
                            >
                            </video>
                            <h3>{this.props.video &&this.props.video.title}</h3>
                            {this.props.video && this.props.video.description && <p>{this.props.video.description}</p>}
                            {this.props.video.id && <CommentForm videoId={this.props.video.id} fetchComments={this.props.fetchComments}/>}
                            {this.props.video.id && 
                            <div>
                                <h4>Commentaires: </h4>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        {this.renderComments()}                                        
                                    </div>
                                </div>
                            </div>
                            }
                            <button onClick={() => this.voteForVideo('likes')} disabled={this.props.loading}><i className="fas fa-thumbs-up"></i></button>
                            <button onClick={() => this.voteForVideo('dislikes')} disabled={this.props.loading}><i className="fas fa-thumbs-down"></i></button>
                            <button onClick={() => this.nextVideo()}>Next video</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderComments(){
        console.log(this.props.video);
        if(this.props.video && this.props.video.comments) {
            return(
                    this.props.video.comments.map( (comment, index) => (
                    <h6 key={index}><small>{comment.content}</small></h6>
                ) )
            )
        }
    }

    componentWillMount(){
        this.props.fetchVideo();
        // this.fetchComments();
    }

    componentDidMount(){
        // this.autoPlay();
        // this.interval = setInterval(this.nextVideo, 5000);
    }
    
    shouldComponentUpdate( nextProps, nextState ){
        return nextProps.video.file != this.props.video.file || nextProps.video.comments !== this.props.video.comments ;
    }
    componentDidUpdate( prevProps, prevState ) {
        if(prevProps.video.id != this.props.video.id){
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
        this.props.fetchVideo();
    }
    
    fetchComments(){
        this.props.fetchComments();
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
export default connect(mapStateToProps, mapDispatchToProps)(Video);

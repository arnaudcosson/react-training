import React from 'react';
// import videos from './videos';
import request from 'superagent';

class Video extends React.Component{
    player;
    constructor(...args) {
        super(...args);
        this.state = {
            selectedIndex: 0,
            video: {},
            comments: []
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
                            <form>
                                <div className="form-group">
                                    <label htmlFor="content">Ajouter un commentaire</label>
                                    <textarea
                                        className="form-control"
                                        name="content"
                                        id="content"
                                        cols="30"
                                        rows="2"
                                    />
                                </div>
                                <button type="submit" className="btn btn-default">
                                    Envoyer
                                </button>
                            </form>
                            <div>
                                <h4>Commentaires: </h4>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        {this.renderComments()}                                        
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => this.nextVideo()}>Next video</button>
                        </div>
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
            console.log(res.body);
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

}
export default Video;

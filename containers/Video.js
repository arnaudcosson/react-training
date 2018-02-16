import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchVideo, fetchComments, postComment, updateCommentInput, likeVideo, dislikeVideo } from '../actions';

function mapStateToProps( state )
{
	return {
		video: state.video,
		comments: state.comments,
		newComment: state.newComment,
	};
}

function mapDispatchToProps( dispatch )
{
    return bindActionCreators( {
    	fetchVideo,
    	fetchComments,
    	postComment,
		updateCommentInput,
		likeVideo,
		dislikeVideo}, dispatch );
}


class Video extends React.Component {

	constructor() {
		super();
		this.id = 1;
		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleCommentInputChange = this.handleCommentInputChange.bind( this );
		this.likeVideo = this.likeVideo.bind( this );
		this.dislikeVideo = this.dislikeVideo.bind( this );
	}

	componentWillMount(){
		console.log("Video::componentWillMount");
		this.props.fetchVideo(this.props.params.id);
		this.props.fetchComments(this.props.params.id);
	}

	componentDidUpdate(prevProps, prevState){
		if (this.props.video && (!prevProps.video || prevProps.video.id != this.props.video.id ) ) {
			this.playVideo();
		}
	}

	playVideo() {
		if ( this.video ) {
			this.video.play();
		}
	}

	render() {
		return (
			<div className="row marketing">
				<div className="col-sm-12 col-md-12">
					<div className="thumbnail">
						<div className="caption">
							<video
								style={{ width: '100%', backgroundColor: 'black' }}
								ref={el => this.video = el}
								height="300"
								controls
								src={this.props.video && './uploads/' + this.props.video.file}
							>
							</video>
							<h3>{this.props.video ? this.props.video.title : 'Chargement en cours'}</h3>
							<p>{this.props.video && this.props.video.description}</p>
							<button onClick={this.likeVideo}><i className="far fa-thumbs-up"></i></button>
							<button onClick={this.dislikeVideo}><i className="far fa-thumbs-down"></i></button>
						</div>
						<form onSubmit={this.handleSubmit}>
						  <div className="form-group">
							<label htmlFor="content">Ajouter un commentaire</label>
							<textarea
								ref={el => this.commentInput = el}
								className="form-control"
								value={this.props.newComment.input}
								onChange={this.handleCommentInputChange}
								name="content"
								id="content"
								cols="30"
								rows="2"
								disabled={this.props.newComment.isLoading}
							/>
						  </div>
						  <button type="submit" className="btn btn-default" disabled={this.props.newComment.isLoading}>
							{!this.props.newComment.isLoading ? 'Envoyer' : 'Envoi en cours...'}
						  </button>
						</form>
						<div>
							<h4>Commentaires: </h4>
							{ this.renderComments() }
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderComments(){
		return this.props.comments.map(( comment ) => {
			return (
				<div key={comment.id} className="panel panel-default">
				  <div className="panel-body">
					<h6><small>Le {(new Date(comment.created_at)).toLocaleString()}</small></h6>
					{comment.content}
				  </div>
				</div>
			);
		});
	}

	handleCommentInputChange( event ) {
		this.props.updateCommentInput( this.commentInput.value );
	}

	handleSubmit( event ) {
		event.preventDefault();
		this.props.postComment({
			videoId: this.props.video.id,
			content: this.commentInput.value
		});
	}

	likeVideo(){
		this.props.likeVideo( this.props.video.id);
	}

	dislikeVideo(){
		this.props.dislikeVideo( this.props.video.id);
	}

	static fetchData(store, params, query) {
		return Promise.all( [store.dispatch( fetchVideo(params.id) ), store.dispatch( fetchComments(params.id) )]);
	}
}

export default connect( mapStateToProps, mapDispatchToProps)( Video );

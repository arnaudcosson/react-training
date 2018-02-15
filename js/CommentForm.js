import React from 'react';
import request from 'superagent';

class CommentForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange =this.handleContentChange.bind(this);
        this.clearState =this.clearState.bind(this);
        this.state = {
            video_id: props.videoId,
            content: '',
            loading: false
        };
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="content">Ajouter un commentaire</label>
                <textarea
                    className="form-control"
                    name="content"
                    id="content"
                    cols="30"
                    rows="2"
                    onChange={this.handleContentChange}
                    value={this.state.content}
                    disabled={this.state.loading}
                />
            </div>
            <button type="submit" className="btn btn-default" disabled={this.state.loading}>
                Envoyer
            </button>
        </form>
        );
    }
    
    handleContentChange(event){
        this.setState(
            {
                content: event.target.value 
            }
        );
    }

    handleSubmit(event){
        event.preventDefault();
        this.postComment(this.state);
    }
  
    postComment(state){
        this.setState({loading: true});
        request
        .post(`${config.apiPath}/videos/${this.state.video_id}/comments`)
        .send('content=' + encodeURIComponent(this.state.content))
        .then((response) => {
            this.props.fetchComments();
            this.setState({loading: false});
            this.clearState();
        });
    }

    clearState(){
        this.setState({
            video_id: this.props.videoId,
            content: ''
        });
    }
}

export default CommentForm;
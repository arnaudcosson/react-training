import React from 'react';
import request from 'superagent';

class CommentForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange =this.handleContentChange.bind(this);
        this.state = {
            video_id: props.videoId,
            content: ''
        };
        console.log(this.state);
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
                />
            </div>
            <button type="submit" className="btn btn-default">
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
        console.log(state);
        request
        .post(`${config.apiPath}/videos/${this.state.video_id}/comments`)
        .send('content=' + encodeURIComponent(this.state.content))
        .then((response) => {
            console.log(JSON.stringify(response.body));
            this.props.fetchComments();
        });

    }
}

export default CommentForm;
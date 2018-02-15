
import React from 'react';
import request from 'superagent';
class VideoForm extends React.Component{
    fileInput;
    constructor(props){
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            file: ''
        }
    }

    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <h3>Ajouter une vidéo</h3>
            <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    onChange={this.handleTitleChange}
                    value={this.state.title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    cols="30"
                    rows="2"
                    onChange={this.handleDescriptionChange}
                    value={this.state.description}
                />
            </div>
            <div className="form-group">
                <label htmlFor="file">Fichier</label>
                <input
                    type="file"
                    className="form-control"
                    name="file"
                    id="file"
                    onChange={this.handleFileChange}
                    value={this.state.file}
                    ref={ el => this.fileInput = el }
                />
            </div>
            <button type="submit" className="btn btn-default">
                Envoyer
            </button>
        </form>
        );
    }

    handleTitleChange(event){
        this.setState(
            {
                title: event.target.value 
            }
        );
    }
    handleDescriptionChange(event){
        this.setState(
            {
                description: event.target.value 
            }
        );
    }
    handleFileChange(event){
        this.setState(
            {
                file: event.target.value 
            }
        );
    }

    handleSubmit(event){
        event.preventDefault();
        this.postVideo(this.state);
    }

    postVideo(){
        console.log("post video");
        request
            .post(`${config.apiPath}/videos`)
            .field('title', this.state.title)
            .field('description', this.state.description)
            .attach('file', this.fileInput.files[0])
            .then( (response) => {
                console.log(response);
            }
        );

    }
}
export default VideoForm;
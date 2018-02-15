import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

export default function VideoItem( props ){
    return (
        <li className="media">
            <div className="media-left">
            <img className="media-object"
            alt="cat" src='https://loremflickr.com/320/240/cat?r=0.1267489'
            width="120"
            height="70" />
            </div>
            <div className="media-body">
                <h4 className="media-heading">{props.video.title}</h4>
                <p>{props.video.description}</p>
            </div>
        </li>
    );
}

VideoItem.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        file: PropTypes.string.isRequired
      }).isRequired
}
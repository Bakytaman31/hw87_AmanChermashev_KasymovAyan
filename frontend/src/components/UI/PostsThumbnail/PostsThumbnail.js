import React from 'react';

import chat from '../../../assets/images/chat.jpg';
import {apiURL} from "../../../constants";

const styles = {
    width: '100px',
    height: '100px',
    marginRight: '10px'
};

const PostThumbnail = props => {
    let image;

    if (props.image === 'chat.jpg') {
        image = chat;
    } else if (props.image) {
        image = apiURL + 'uploads/' + props.image;
    }

    return <img alt="post" src={image} style={styles} className="img-thumbnail" />;
};

export default PostThumbnail;
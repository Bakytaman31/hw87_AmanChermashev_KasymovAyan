import React from 'react';
import PostThumbnail from "../../UI/PostsThumbnail/PostsThumbnail";


const PostCard = props => {
    return (
        <>
            <h1>{props.title}</h1>
            <PostThumbnail
                image={props.image}
            />
            <h3>Author: {props.author}</h3>
            <h3>Datetime: {props.datetime}</h3>
            {props.description}
            <h4>Comments:</h4>
        </>
    );
};

export default PostCard;
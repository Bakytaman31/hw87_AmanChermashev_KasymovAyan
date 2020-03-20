import React from 'react';
import PostThumbnail from "../../UI/PostsThumbnail/PostsThumbnail";
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';

const PostsCard = props => {
    const style = {
        margin: "3% auto",
        border: "2px solid #ccc",
        width: "40%"
    };
    return (
        <div style={style}>
            <PostThumbnail
                image={props.image}
            />
            <h3>{props.title}</h3>
            <h4>{props.datetime} by {props.author}</h4>
            <Link to={`/${props.id}`}>
                <Button color="primary">Read more</Button>
            </Link>
        </div>
    );
};

export default PostsCard;
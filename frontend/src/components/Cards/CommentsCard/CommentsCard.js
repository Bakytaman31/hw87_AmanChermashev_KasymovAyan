import React from 'react';

const CommentsCard = props => {
    return (
        <div style={{border: "2px solid #ccc", width: "40%", margin: "3% auto"}}>
            <h4 style={{borderBottom: "2px solid #ccc"}}>{props.author}</h4>
            <p>{props.comment}</p>
        </div>
    );
};

export default CommentsCard;
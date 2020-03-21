import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPost} from "../../store/actions/postsActions";
import PostCard from "../../components/Cards/PostCard/PostCard";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import CommentsCard from "../../components/Cards/CommentsCard/CommentsCard";
import {getComments, postComment} from "../../store/actions/commentsActions";

class ProductPage extends Component {
    state = {
        comment: '',
        postId: this.props.match.params.id,
    };

    componentDidMount() {
        if (!this.props.user) {
           this.props.history.push('/login');
        } else {
            const id = this.props.match.params.id;
            this.props.getPost(id);
            this.props.getComments(id);
        }
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    onSubmitHandler = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        this.props.postComment(this.state, id);
    };

    render() {
        if (!this.props.post) return null;

        return (
            <div>
                <PostCard
                    key={this.props.post._id}
                    title={this.props.post.title}
                    datetime={this.props.post.datetime}
                    author={this.props.post.author.username}
                    image={this.props.post.image}
                    description={this.props.post.description}
                />
                <Form onSubmit={this.onSubmitHandler}>
                    <FormGroup>
                        <Label for="comment">You can leave a comment</Label>
                        <Input
                            id="comment"
                            name="comment"
                            style={{width: "40%", marginLeft: "30%"}}
                            value={this.state.comment}
                            onChange={this.inputChangeHandler}
                        />
                    </FormGroup>
                    <Button type="submit">Save</Button>
                </Form>
                {this.props.comments.map(comment => (
                    <CommentsCard
                        key={comment._id}
                        author={comment.author.username}
                        comment={comment.comment}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    post: state.posts.post,
    comments: state.comments.comments,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    getPost: id => dispatch(getPost(id)),
    postComment: (comment, id) => dispatch(postComment(comment, id)),
    getComments: id => dispatch(getComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
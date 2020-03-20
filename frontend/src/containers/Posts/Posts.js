import React, {Component} from 'react';
import {getPosts} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import PostsCard from "../../components/Cards/PostsCard/PostsCard";

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                {this.props.posts.map(post => (
                    <PostsCard
                        key={post._id}
                        title={post.title}
                        datetime={post.datetime}
                        id={post._id}
                        author={post.author.username}
                        image={post.image}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {sendPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";

class NewPost extends Component {
    state = {
        title: '',
        image: '',
        description: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.sendPost(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <span style={{color: "red"}}>{this.props.error}</span>
                <FormGroup row>
                    <Label sm={2} for="title">Title</Label>
                    <Col sm={10}>
                        <Input
                            required
                            type="text"
                            name="title" id="title"
                            placeholder="Enter title"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            placeholder="Enter description"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="image">Image</Label>
                    <Col sm={10}>
                        <Input
                            type="file"
                            name="image" id="image"
                            onChange={this.fileChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    error: state.posts.error
});

const mapDispatchToProps = dispatch => ({
    sendPost: post => dispatch(sendPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
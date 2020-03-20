const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datetime: {
        type: String,
        required: true,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
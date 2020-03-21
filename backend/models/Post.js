const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [function () {
            if (this.image === 'chat.jpg') return true
        }]
    },
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datetime: {
        type: String,
        required: true,
        default: Date.now()
    }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
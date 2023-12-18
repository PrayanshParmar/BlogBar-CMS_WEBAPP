const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    body:{
        type: String,
        required: true,
    },
    blogId:{
        type: Schema.Types.ObjectId,
       ref: 'blog',
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }

},{timestamps: true});

const Comment = model('comment', commentSchema);

module.exports = Comment;
const {Schema, model} = require('mongoose');

const LikeSchema = new Schema({
    likes:{
        type: Number,
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

const Like = model('like', LikeSchema);

module.exports = Like;
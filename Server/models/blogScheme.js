const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    
  },
  subheading: {
    type: String,
    required: true,
    
  },
  cover_photo_url: {
    type: String,
    required: false,
    
  },
  category_name: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
},

},{timestamps: true});

const Blog = model("blog", blogSchema);

module.exports = Blog;


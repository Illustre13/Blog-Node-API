const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Please Enter the Blog Title"]

        },
        category:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true

        },
        content:{
            type: String,
            required: true

        }

    },
    {
        timestamps: true
    }
)
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;



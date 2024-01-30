const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    text : {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    postId: {
        type: String
    }
},{
    timestamps: true
})

const commentModel = mongoose.model("comment", commentSchema)
module.exports = commentModel
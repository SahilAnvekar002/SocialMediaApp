const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    caption : {
        type: String
    },
    image : {
        type: String,
        required: true
    },
    likes : {
        type: Array
    },
    userId: {
        type: String
    }
},{
    timestamps: true
})

const postModel = mongoose.model("post", postSchema)
module.exports = postModel
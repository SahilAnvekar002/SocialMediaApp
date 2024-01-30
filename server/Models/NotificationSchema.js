const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    text : {
        type: String
    },
    userId: {
        type: String
    },
    firstId: {
        type: String
    },
    secondId: {
        type: String
    }
},{
    timestamps: true
})

const notificationModel = mongoose.model("notification", notificationSchema)
module.exports = notificationModel
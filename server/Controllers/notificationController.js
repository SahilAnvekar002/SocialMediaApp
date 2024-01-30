const NotificationModel = require('../Models/NotificationSchema')

const createNotification = async(req, res) =>{
    
    try {
        const {text, firstId, secondId, userId} = req.body

        const notification = new NotificationModel({text:text, firstId:firstId, secondId:secondId, userId:userId})
        await notification.save()

        return res.status(200).json("Notification created successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const deleteNotification = async(req, res) =>{
    
    try {
        const firstId = req.params.firstId
        const secondId = req.params.secondId

        const notification = await NotificationModel.findOne({firstId:firstId, secondId:secondId})
        if(!notification){
            return res.status(400).json("Notification not found")
        }

        await notification.deleteOne({firstId:firstId, secondId:secondId})

        return res.status(200).json("Notification deleted successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getUserNotifications = async(req, res)=>{
    try {
        
        const userId = req.params.userId

        const notifications = await NotificationModel.find({userId:userId})

        return res.status(200).json(notifications)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

module.exports = {createNotification, getUserNotifications, deleteNotification}
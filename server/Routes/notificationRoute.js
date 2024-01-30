const express = require('express')
const { createNotification, getUserNotifications, deleteNotification } = require('../Controllers/notificationController')

const router = express.Router()

router.post('/create', createNotification)
router.delete('/delete/:firstId/:secondId', deleteNotification)
router.get('/getusernotifications/:userId', getUserNotifications)

module.exports = router
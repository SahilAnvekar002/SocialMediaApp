const express = require('express')
const { signup, login, getUsers, getUser, followUser, unfollowUser, getFollowing, getFollowers, editProfile } = require('../Controllers/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/editprofile', editProfile)
router.post('/follow', followUser)
router.post('/unfollow', unfollowUser)
router.get('/getusers', getUsers)
router.get('/getuser/:userId', getUser)
router.get('/getfollowers/:userId', getFollowers)
router.get('/getfollowing/:userId', getFollowing)

module.exports = router
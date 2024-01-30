const express = require('express')
const { createPost, likePost, unlikePost, editPost, deletePost, getUserPosts, getFollowingPosts, getPost } = require('../Controllers/postController')

const router = express.Router()

router.post('/create', createPost)
router.post('/like', likePost)
router.post('/unlike', unlikePost)
router.post('/edit', editPost)
router.delete('/delete/:postId', deletePost)
router.get('/getuserposts/:userId', getUserPosts)
router.get('/getfollowingposts/:userId', getFollowingPosts)
router.get('/getpost/:postId', getPost)

module.exports = router
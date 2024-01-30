const express = require('express')
const { createComment, editComment, deleteComment, getPostComments } = require('../Controllers/commentController')

const router = express.Router()

router.post('/create', createComment)
router.post('/edit', editComment)
router.delete('/delete/:commentId', deleteComment)
router.get('/getpostcomments/:postId', getPostComments)

module.exports = router
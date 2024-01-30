const CommentModel = require('../Models/CommentSchema')

const createComment = async(req, res) =>{
    
    try {
        const {text, userId, postId} = req.body
        
        if(!text){
            return res.status(400).json("Text is required")
        }

        const comment = new CommentModel({text:text, userId:userId, postId:postId})
        await comment.save()

        return res.status(200).json(comment)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const editComment = async(req, res) =>{
    
    try {
        const {text, commentId} = req.body

        const comment = await CommentModel.findById(commentId)
        
        if(!comment){
            return res.status(400).json("Comment not found")
        }

        await comment.updateOne({text:text})

        return res.status(200).json("Comment updated successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const deleteComment = async(req, res) =>{
    
    try {
        const commentId = req.params.commentId

        const comment = await CommentModel.findById(commentId)
        
        if(!comment){
            return res.status(400).json("Comment not found")
        }

        await comment.deleteOne({_:commentId})

        return res.status(200).json("Comment deleted successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getPostComments = async(req, res)=>{
    try {
        
        const postId = req.params.postId

        const comments = await CommentModel.find({postId: postId})

        return res.status(200).json(comments)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

module.exports = {createComment, editComment, deleteComment, getPostComments}
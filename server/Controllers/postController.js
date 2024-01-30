const PostModel = require('../Models/PostSchema')
const UserModel = require('../Models/UserSchema')
const CommentModel = require('../Models/CommentSchema')

const createPost = async(req, res)=>{
    try {
        
        const {caption, image, userId} = req.body

        if(!image){
            return res.status(400).json("Image is required")
        }

        const post = new PostModel({caption:caption, image:image, userId:userId})
        await post.save()

        return res.status(200).json(post)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const likePost = async(req, res)=>{
    try {
        
        const {postId, userId} = req.body

        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json("Post not found")
        }

        const checkLike = await PostModel.findOne({_id:postId, likes: userId})
        if(checkLike){
            return res.status(400).json("Post is already liked")
        }

        await post.updateOne({ $push: {likes: userId} })

        return res.status(200).json(post)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const unlikePost = async(req, res)=>{
    try {
        
        const {postId, userId} = req.body

        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json("Post not found")
        }

        const checkLike = await PostModel.findOne({_id:postId, likes: userId})
        if(!checkLike){
            return res.status(400).json("Post is not liked")
        }

        await post.updateOne({ $pull: {likes: userId} })

        return res.status(200).json("Post unliked successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const editPost = async(req, res)=>{
    try {
        
        const {postId, caption} = req.body

        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json("Post not found")
        }

        await post.updateOne({ caption: caption })

        return res.status(200).json("Post updated successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const deletePost = async(req, res)=>{
    try {
        
        const {postId} = req.params

        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json("Post not found")
        }

        await post.deleteOne({_id:postId})
        await CommentModel.deleteMany({postId:postId})

        return res.status(200).json("Post deleted successfully")

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getUserPosts =async(req, res)=>{
    try {
        
       const userId = req.params.userId

       const posts = await PostModel.find({userId: userId})

       return res.status(200).json(posts)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getFollowingPosts =async(req, res)=>{
    try {
        
       const userId = req.params.userId

       const user = await UserModel.findById(userId)

       let followingPosts = []

       followingPosts = user.following.map(async(id)=>{
            return await PostModel.find({userId: id})
       })

       followingPosts = await Promise.all(followingPosts)
       followingPosts = followingPosts.flat()

       return res.status(200).json(followingPosts)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getPost =async(req, res)=>{
    try {
        
       const postId = req.params.postId

       const post = await PostModel.findById(postId)

       return res.status(200).json(post)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

module.exports = {createPost, likePost, unlikePost, editPost, deletePost, getUserPosts, getFollowingPosts, getPost}
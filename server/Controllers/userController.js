const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const env = require('dotenv')
const UserModel = require('../Models/UserSchema')

env.config()

const signup = async(req, res)=>{
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json("All fields are required")
        }

        if(!validator.isEmail(email)){
            return res.status(400).json("Invalid email")
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json("Password must be strong")
        }
    
        let user = await UserModel.findOne({username:username})
        if(user){
            return res.status(400).json("User already exists")
        }

        user = await UserModel.findOne({email:email})
        if(user){
            return res.status(400).json("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new UserModel({username:username, email:email, password:hashedPassword})
        await newUser.save()

        const jwtKey = process.env.JWT_SECRET_KEY
        const token = jwt.sign({_id: newUser._id}, jwtKey, {expiresIn: "3d"})
        return res.status(200).json({_id: newUser._id, username:newUser.username, email:newUser.email, followers: newUser.followers, following: newUser.following, profilepic:newUser.profilepic , about:newUser.about, token})

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const login =async(req, res)=>{
    try {
        const {username, password} = req.body

        let user = await UserModel.findOne({username:username})
        if(!user){
            return res.status(400).json("Invalid credentials")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json("Invalid credentials")
        }

        const jwtKey = process.env.JWT_SECRET_KEY
        const token = jwt.sign({_id: user._id}, jwtKey, {expiresIn: "3d"})
        return res.status(200).json({_id: user._id, username: user.username, email: user.email, followers: user.followers, following: user.following, profilepic:user.profilepic , about:user.about, token})
        
    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const editProfile = async(req, res)=>{
    try {
        
        const {username, email, profilepic, about, userId} = req.body

        const user = await UserModel.findById(userId)

        if(!user){
            return res.status(400).json("User not found")
        }

        const checkEmail = await UserModel.findOne({email:email})
        const checkUsername = await UserModel.findOne({username:username})

        if(checkEmail === null && checkUsername === null){
            await user.updateOne({email:email, username:username, profilepic:profilepic, about:about},{new:true})
            const updatedUser = await UserModel.findById(userId)
            return res.status(200).json(updatedUser)
        }

        if(checkEmail === null && checkUsername._id.equals(user._id)){
            await user.updateOne({email:email, username:username, profilepic:profilepic, about:about})
            const updatedUser = await UserModel.findById(userId)
            return res.status(200).json(updatedUser)
        }

        if(checkEmail._id.equals(user._id) && checkUsername === null){
            await user.updateOne({email:email, username:username, profilepic:profilepic, about:about})
            const updatedUser = await UserModel.findById(userId)
            return res.status(200).json(updatedUser)
        }

        if(!checkEmail._id.equals(user._id)){
            return res.status(400).json("Email is already taken by another user")
        }

        
        if(!checkUsername._id.equals(user._id)){
            return res.status(400).json("Username is already taken by another user")
        }

        await user.updateOne({email:email, username:username, profilepic:profilepic, about:about})
        const updatedUser = await UserModel.findById(userId)
        return res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getUsers = async(req, res)=>{
    try {
        const users = await UserModel.find()
        return res.status(200).json(users)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getUser = async(req, res)=>{
    try {
        const userId = req.params.userId
        const user = await UserModel.findById(userId)
        return res.status(200).json(user)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const followUser = async(req, res)=>{   
    try {
        const {firstId, secondId} = req.body

        const firstUser = await UserModel.findById(firstId)
        const secondUser = await UserModel.findById(secondId)

        const checkUser = await UserModel.findOne({_id: firstId, following: secondId })
        if(checkUser){
            return res.status(200).json(`${firstUser.username} followed ${secondUser.username} successfully`)
        }

        await firstUser.updateOne({ $push: {following: secondId} })
        await secondUser.updateOne({ $push: {followers: firstId} })

        res.status(200).json(`${firstUser.username} followed ${secondUser.username} successfully`)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const unfollowUser = async(req, res)=>{   
    try {
        const {firstId, secondId} = req.body

        const firstUser = await UserModel.findById(firstId)
        const secondUser = await UserModel.findById(secondId)

        const checkUser = await UserModel.findOne({_id: firstId, following: secondId })
        if(!checkUser){
            return res.status(200).json(`${firstUser.username} does not follow ${secondUser.username}`)
        }

        await firstUser.updateOne({ $pull: {following: secondId} })
        await secondUser.updateOne({ $pull: {followers: firstId} })

        res.status(200).json(`${firstUser.username} unfollowed ${secondUser.username} successfully`)

    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getFollowing = async(req, res)=>{
    try {
        const userId = req.params.userId
        const user = await UserModel.findById(userId)
        
        let following = []

        following = user.following.map(async(id)=>{
            return await UserModel.findById(id)
        })

        following = await Promise.all(following)
        return res.status(200).json(following)
        
    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

const getFollowers = async(req, res)=>{
    try {
        const userId = req.params.userId
        const user = await UserModel.findById(userId)
        
        let followers = []

        followers = user.followers.map(async(id)=>{
            return await UserModel.findById(id)
        })

        followers = await Promise.all(followers)
        return res.status(200).json(followers)
        
    } catch (error) {
        res.status(500).json("Internal server error")
        console.log(error)
    }
}

module.exports = {signup, login, getUsers, getUser, followUser, unfollowUser, getFollowing, getFollowers, editProfile}
import { createContext, useCallback} from 'react'
import {baseUrl, deleteRequest, getRequest, postRequest} from '../utils/services'
import { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'

export const PostContext = createContext()

export const PostContextProvider = ({children, user})=>{

    const [followingPosts, setFollowingPosts] = useState([])
    const [postData, setPostData] = useState({
        caption:"",
        image:"",
        userId: ""
    })
    const [postComments, setPostComments] = useState([])
    const [commentData, setCommentData] = useState({
        text:"",
        postId:"",
        userId: ""
    })
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        
        const getFollowingPosts = async()=>{
            if(user?._id){
                const response = await getRequest(`${baseUrl}/post/getfollowingposts/${user?._id}`)
               setFollowingPosts(response)
            }
        }

        getFollowingPosts()
        updatePostData({...postData, userId:user?._id})
        updateCommentData({...commentData, userId: user?._id})

    }, [user, useLocation().pathname])

    const updatePostData = (data)=>{
        setPostData(data)
    }

    const createPost = async(e) =>{
        e.preventDefault()
        console.log(postData)
        const response = await postRequest(`${baseUrl}/post/create`, JSON.stringify(postData))

        if(!response?.error){
            setFollowingPosts((prev)=> [response, ...prev])
        }

        setPostData({...postData , caption:""})
    }

    const likePost = async(postId) =>{

        const response = await postRequest(`${baseUrl}/post/like`, JSON.stringify({postId:postId, userId: user?._id}))

        const temp = await getRequest(`${baseUrl}/user/getuser/${response?.userId}`)

        const response2 =  await postRequest(`${baseUrl}/notification/create`, JSON.stringify({
            text: "liked your post",
            firstId: user?._id,
            secondId: postId,
            userId: temp?._id
        }))

    }

    const unlikePost = async(postId) =>{

        const response = await postRequest(`${baseUrl}/post/unlike`, JSON.stringify({postId:postId, userId: user?._id}))
        const response2 =  await deleteRequest(`${baseUrl}/notification/delete/${user?._id}/${postId}`)

    }

    const getComments = async(postId)=>{
        const response = await getRequest(`${baseUrl}/comment/getpostcomments/${postId}`)
        setPostComments(response)
    }

    const updateCommentData = (data)=>{
        setCommentData(data)
    }

    const createComment = async(postId) =>{
        const response = await postRequest(`${baseUrl}/comment/create`, JSON.stringify({
            text: commentData.text,
            postId: postId,
            userId: commentData?.userId
        }))

        setCommentData({...commentData, text:""})
        if(!response?.error){
            setPostComments((prev)=> [response, ...prev])
        }
    }
    
    const getUserPosts = async(userId)=>{
        const response = await getRequest(`${baseUrl}/post/getuserposts/${userId}`)
        setUserPosts(response)
    }

    const deletePost =async(postId)=>{
        const response = await deleteRequest(`${baseUrl}/post/delete/${postId}`)
    }

    const editPost =async(postId, caption)=>{
        const response = await postRequest(`${baseUrl}/post/edit`, JSON.stringify({
            postId: postId,
            caption:caption
        }))
    }

    return(
        <PostContext.Provider value={{followingPosts, postData, updatePostData, createPost, likePost, unlikePost, getComments, postComments, commentData, updateCommentData, createComment, userPosts, getUserPosts, deletePost, editPost}}>
            {children}
        </PostContext.Provider>
    )
}
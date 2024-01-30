import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/postSection.css'
import moment from 'moment'
import profilepic from '../assets/images/user.png'
import { baseUrl, getRequest } from '../utils/services'
import { PostContext } from '../contexts/PostContext'
import { UserContext } from '../contexts/UserContext'
import InputEmoji from 'react-input-emoji'
import Comment from './Comment'
import '../assets/css/post.css'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {

    const { likePost, unlikePost, getComments, postComments, commentData, updateCommentData, createComment } = useContext(PostContext)
    const { user } = useContext(UserContext)

    const [postUser, setPostUser] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [add, setAdd] = useState(false)
    const [minus, setMinus] = useState(false)
    const [flag, setFlag] = useState(false)
    const [togglePost, setTogglePost] = useState(false)
    const [comments, setComments] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        if (post?.likes?.includes(user?._id)) {
            setIsLiked(true)
            setFlag(true)
        }
    }, [post, user])


    useEffect(() => {
        const getUser = async () => {
            const response = await getRequest(`${baseUrl}/user/getuser/${post?.userId}`)
            setPostUser(response)
        }

        getUser()

    }, [post])

    useEffect(() => {
        const getComments = async () => {
            const response = await getRequest(`${baseUrl}/comment/getpostcomments/${post?._id}`)
            setComments(response)
        }

        getComments()
    }, [post, postComments])

    const likeUserPost = () => {
        likePost(post?._id)
        setIsLiked(true)
        setAdd(true)
        setMinus(false)
    }

    const unlikeUserPost = () => {
        unlikePost(post?._id)
        setIsLiked(false)
        setAdd(false)
        setMinus(true)
    }

    const getUserComments = () => {
        getComments(post?._id)
        setTogglePost(true)

    }

    const updateTogglePost = () => {
        setTogglePost(false)
    }

    useEffect(() => {
        updateCommentData({ ...commentData, text: text })
    }, [text])


    return (
        <>
            <div className="main panel panel-default z-depth-4 mx-5 mb-4" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <div className="panel-body">

                    <div className="media my-2">
                        <div className="media-left" >
                        <Link to={`${user?._id === postUser?._id ? '/profile': postUser?.username}`} state={{u:postUser}}>
                            <img src={`${postUser?.profilePic ? postUser?.profilePic : profilepic}`} className="media-object circle" style={{ borderRadius: "50%", cursor: 'pointer' }} /></Link>
                        </div>
                        <div className="media-body">
                        <Link to={`${user?._id === postUser?._id ? '/profile': postUser?.username}`} state={{u:postUser}} style={{color:'black', textDecoration:'none'}}>
                            <p style={{ cursor: 'pointer' }}>{postUser?.username} </p>
                        </Link>

                        </div>
                    </div>

                    <div className="post">
                        <img className="not" src={`${post?.image}`} />
                        <div className="iconsec">
                            {isLiked ? <button style={{ background: 'none', border: 'none', outline: 'none' }} onClick={() => unlikeUserPost()}> <i className="fa-solid fa-heart" style={{ cursor: 'pointer' }}></i></button>
                                : <span onClick={() => likeUserPost()}><i style={{ cursor: 'pointer' }} className="fa-regular fa-heart mx-2" ></i></span>}
                            {!flag ? add ? <span className="right"><b style={{ marginRight: '15px' }}>{post?.likes?.length + 1} likes</b></span>
                                : <span className="right"><b>{post?.likes?.length} likes</b></span>
                                : minus ? <span className="right"><b style={{ marginRight: '15px' }}>{post?.likes?.length - 1} likes</b></span>:<span className="right"><b>{post?.likes?.length} likes</b></span>
                            }
                            <span onClick={() => getUserComments()}><i style={{ cursor: 'pointer' }} className="fa-regular fa-comment mx-2"></i></span>
                            <span className="right"><b>{comments?.length} comments</b></span>
                            <span style={{ marginLeft: '180px' }} className="time" >{moment(post?.createdAt).calendar()}</span>
                        </div>
                        <p className="caption mt-3">{post?.caption}</p>
                        <p className="read" onClick={() => getUserComments()}>Read {comments?.length} Comments </p>
                    </div>

                </div>
            </div>



            {togglePost && <div className="" style={{ height: '80vh', width: '70vw', zIndex: '100', position: 'fixed', top: '10vh', left: '15vw', display: 'flex' }}>

                <div style={{ width: '50%', height: '100%' }}>
                    <img src={`${post?.image}`} height="100%" width="100%" />
                </div>
                <div style={{ width: '50%', height: '100%', background: 'black' }}>

                    <div className="card pb-3" style={{ backgroundColor: 'black', borderRadius: '0', borderBottom: '0.5px solid grey' }}>
                        <div className="card-body">
                            <div className="d-flex flex-start">
                            <Link to={`${user?._id === postUser?._id ? '/profile': postUser?.username}`} state={{u:postUser}}>
                                <img className="rounded-circle shadow-1-strong me-3"
                                    src={`${postUser?.profilepic ? postUser?.profilepic: profilepic}`} alt="avatar" width="40"
                                    height="40" style={{ cursor: 'pointer' }} /></Link>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                                    <Link to={`${user?._id === postUser?._id ? '/profile': postUser?.username}`} state={{u:postUser}} style={{color:'black', textDecoration:'none'}}>
                                        <h6 className="fw-bold mb-0" style={{ cursor: 'pointer', color: 'white' }}>
                                            <strong>{postUser?.username}</strong>
                                        </h6>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='comment-section' style={{ height: '70%', overflowY: 'scroll', marginBottom: '3vh' }}>
                        {postComments?.length > 0 && postComments.map((comment) => {
                            return (
                                <Comment key={comment?._id} comment={comment} />
                            )
                        })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
                        <InputEmoji value={commentData?.text} onChange={setText} />
                        <span onClick={() => createComment(post?._id)} style={{ cursor: 'pointer' }}><i className="fa-regular fa-paper-plane" style={{ fontSize: '24px', color: '#858585' }}></i></span>
                    </div>
                </div>
                <span style={{ cursor: 'pointer' }} onClick={updateTogglePost}><i className="fa-solid fa-xmark" style={{ fontSize: '24px', color: 'black' }}></i></span>
            </div>

            }
        </>
    )
}

export default Post

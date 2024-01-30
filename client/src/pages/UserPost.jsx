import React, { useContext, useEffect, useState } from 'react'
import profilepic from '../assets/images/user.png'
import InputEmoji from 'react-input-emoji'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { PostContext } from '../contexts/PostContext'
import Comment from '../components/Comment'
import { baseUrl, getRequest } from '../utils/services'

const UserPost = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const { postId } = location.state
    const { user } = useContext(UserContext)
    const { getComments, postComments, likePost, unlikePost, commentData, updateCommentData, createComment, deletePost, editPost } = useContext(PostContext)
    const [isLiked, setIsLiked] = useState(false)
    const [post, setPost] = useState(null)
    const [add, setAdd] = useState(false)
    const [minus, setMinus] = useState(false)
    const [flag, setFlag] = useState(false)
    const [text, setText] = useState("")
    const [popover, setPopover] = useState(false)
    const [caption, setCaption] = useState("")
    
    const [postUser, setpostUser] = useState(null)

    useEffect(() => {
        const getPost = async (postId) => {
            const response = await getRequest(`${baseUrl}/post/getpost/${postId}`)
            setPost(response)
            setCaption(response?.caption)
        }

        if (postId) {
            getPost(postId)
        }

    }, [postId])

    useEffect(() => {
        const getPostUser = async (userId) => {
            const response = await getRequest(`${baseUrl}/user/getuser/${userId}`)
            setpostUser(response)
        }

        if (post) {
            getPostUser(post?.userId)
        }

    }, [post])


    useEffect(() => {
        if (post?._id) {
            getComments(post._id)
        }
    }, [post])

    useEffect(() => {
        if (user?._id) {
            if (post?.likes?.includes(user?._id)) {
                setIsLiked(true)
                setFlag(true)
            }
        }

    }, [user, post])

    const onLikePost = () => {
        likePost(post?._id)
        setIsLiked(true)
        setAdd(true)
        setMinus(false)
    }

    const onUnlikePost = () => {
        unlikePost(post?._id)
        setIsLiked(false)
        setAdd(false)
        setMinus(true)
    }

    useEffect(() => {
        updateCommentData({ ...commentData, text: text })
    }, [text])

    const handlePopover = () => {
        setPopover(!popover)
    }

    const onDeletePost = () => {
        deletePost(post?._id)
        navigate('/profile')
    }

    const onEditPost =()=>{
        editPost(post?._id, caption)
        setPost({...post, caption:caption})
    }

    return (
        <>
            <div class="modal fade" id="editPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div class="modal-dialog" style={{ marginTop: '30vh' }}>
                    <div class="modal-content">
                        <div class="modal-header mb-3">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '12vw' }}>Edit Post</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" >
                            <label htmlFor="caption" className='form-label mx-3'>Caption</label>
                            <InputEmoji  value={caption} borderRadius={10} onChange={setCaption}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" onClick={onEditPost}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: 'black', width: '100vw', height: '100vh', display: 'flex' }}>
                <div className="left" style={{ width: '75%', height: '100%', borderRight: '1px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={`${post?.image}`} alt="Post" height="500px" width="700px" />
                </div>
                <div className="right" style={{ width: '25%' }}>

                    <div className="card pb-1" style={{ backgroundColor: 'black', borderRadius: '0', borderBottom: '0.5px solid grey' }}>
                        <div className="card-body">
                            <div className="d-flex flex-start">
                            <Link to={`/${user?._id === postUser?._id ? 'profile': postUser?.username}`} state={{u:postUser}}>
                                <img className="rounded-circle shadow-1-strong me-3"
                                    src={postUser?.profilepic ? postUser?.profilepic : profilepic} alt="avatar" width="40"
                                    height="40" style={{ cursor: 'pointer' }} /></Link>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center mb-1 mt-1">
                                    <Link to={`/${user?._id === postUser?._id ? 'profile': postUser?.username}`} state={{u:postUser}} style={{textDecoration:'none'}}>
                                        <h6 className="fw-bold mb-0" style={{ cursor: 'pointer', color: 'white' }}>
                                            <strong>{postUser?.username}</strong>
                                        </h6>
                                    </Link>
                                    </div>
                                    <p className='text-light' style={{ fontSize: '14px' }}>{post?.caption}</p>
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
                        <span style={{ cursor: 'pointer' }} onClick={() => createComment(post?._id)}><i className="fa-regular fa-paper-plane" style={{ fontSize: '24px', color: '#858585' }}></i></span>
                    </div>
                </div>
            </div>

            <div style={{ position: 'absolute', right: '26vw', bottom: '12vh', display: 'flex', flexDirection: 'column' }}>
                {isLiked ? <p style={{ marginBottom: '2px' }} onClick={onUnlikePost}><i style={{ cursor: 'pointer', color: 'white', fontSize: '24px' }} className="fa-solid fa-heart" ></i></p> :
                    <span onClick={onLikePost}><i style={{ cursor: 'pointer', color: 'white', fontSize: '24px' }} className="fa-regular fa-heart" ></i></span>}

                {!flag ? add ? <span className="text-light mb-3"><b style={{ marginLeft: '6px' }}>{post?.likes?.length + 1}</b></span>
                    : <span className="text-light mb-3"><b style={{ marginLeft: '6px' }}>{post?.likes?.length}</b></span>

                    : minus ? <span className="text-light mb-3"><b style={{ marginLeft: '6px' }}>{post?.likes?.length - 1}</b></span>
                        : <span className="text-light mb-3"><b style={{ marginLeft: '6px' }}>{post?.likes?.length}</b></span>}

                <span><i style={{ cursor: 'pointer', color: 'white', fontSize: '24px' }} className="fa-regular fa-comment"></i></span>
                <span className="text-light mb-3"><b style={{ marginLeft: '6px' }}>{postComments?.length}</b></span>

                {post?.userId === user?._id && <span onClick={handlePopover}>
                    <i class="fa-solid fa-ellipsis" style={{ color: 'white', cursor: 'pointer', marginRight: '12px', fontSize: '20px' }}></i>
                </span>}
            </div>

            {popover && <div style={{ position: 'absolute', right: '19vw', bottom: '12vh', display: 'flex', flexDirection: 'column' }}>
                <button className='btn btn-dark' style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} onClick={onDeletePost}>Delete Post</button>
                <button className='btn btn-dark' style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} data-bs-toggle="modal" data-bs-target="#editPostModal" onClick={handlePopover}>Edit Post</button>
            </div>}
        </>
    )
}

export default UserPost

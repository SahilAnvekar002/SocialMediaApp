import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import profilepic from '../assets/images/user.png'
import InputEmoji from 'react-input-emoji'
import EmojiPicker from 'emoji-picker-react';
import Post from './Post';
import { PostContext } from '../contexts/PostContext';

const PostSection = () => {

    const { user } = useContext(UserContext)
    const { postData, followingPosts, updatePostData, createPost } = useContext(PostContext)
    const [caption, setCaption] = useState("")

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const onImageChange = async(e) => {
        const base64 = await convertToBase64(e.target.files[0])

        updatePostData({...postData, image: base64})
    }

    useEffect(() => {
        updatePostData({...postData, caption:caption})
    }, [caption])    

    return (
        <>
            <div style={{ width: '50vw', marginLeft: '20vw' }}>
                <div className="card mx-5" style={{ borderRadius: '10px', width: '500px', padding: '10px', marginTop: '50px', height: '250px' }}>
                    <div className="d-flex px-3" style={{ alignItems: 'center' }}>
                        <img src={`${user?.profilepic ? user?.profilepic : profilepic}`} className="profile-pic mr-3" style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'contain', backgroundColor: '#E0E0E0' }} />
                        <div className='mx-3'>
                            <h3 className="mb-0 font-weight-normal">{user?.username}</h3>
                        </div>
                    </div>
                    <div className="row px-2 form-group mt-4 mb-4">
                        <InputEmoji borderRadius={10} value={postData?.caption} onChange={setCaption}></InputEmoji>

                    </div>
                    <div className=" px-3">
                        <input type="file" name="file" id="file" onChange={(e)=>onImageChange(e)} />
                        <div className="btn btn-dark" onClick={(e)=>createPost(e)}>Post</div>
                    </div>
                </div>

                {followingPosts?.length > 0 && followingPosts?.map((post) => {
                    return (
                        <Post key={post?._id} post={post} />
                    )
                })}
            </div>


        </>
    )
}

export default PostSection

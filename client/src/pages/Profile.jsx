import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import profilepic from '../assets/images/user.png'
import { PostContext } from '../contexts/PostContext'
import '../assets/css/profile.css'
import '../assets/js/profile.js'
import User from '../components/User'
import { Link } from 'react-router-dom'

const Profile = () => {

    const { user, getFollowing, followingUsers, getFollowers, followersUsers, logout } = useContext(UserContext)
    const { userPosts, getUserPosts } = useContext(PostContext)

    useEffect(() => {
        if (user?._id) {
            getUserPosts(user?._id)
        }

    }, [user])


    return (
        <>
            <div class="modal fade" id="followingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div class="modal-dialog" style={{ marginTop:'30vh'}}>
                    <div class="modal-content">
                        <div class="modal-header mb-3">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '12vw' }}>Following</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{overflowY:'scroll'}}>
                            {followingUsers?.length >0 ? followingUsers?.map((u)=>{
                                return(
                                    <User key={u?._id} u={u}/>
                                )
                            }): <h3 style={{textAlign:'center', marginBottom:'20px'}}>No following users</h3>}
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="followersModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" style={{ marginTop:'30vh'}}>
                    <div class="modal-content">
                        <div class="modal-header mb-3">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '12vw' }}>Followers</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{overflowY:'scroll'}}>
                            {followersUsers?.length >0 ? followersUsers?.map((u)=>{
                                return(
                                    <User key={u?._id} u={u}/>
                                )
                            }): <h3 style={{textAlign:'center', marginBottom:'20px'}}>No followers</h3>}
                        </div>
                    </div>
                </div>
            </div>

            <section className="h-100 gradient-custom-2" style={{ marginLeft: '20vw' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center h-100" style={{ paddingLeft: '10vw' }}>
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card" style={{ width: '40vw' }}>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
                                        <img src={`${user?.profilepic ? user?.profilepic : profilepic}`}
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', zIndex: "1" }} />
                                        
                                            <Link to='/profile/edit' type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                            style={{ zIndex: "1" }}>
                                            Edit profile
                                        </Link>
                                        
                                    </div>
                                    <div className="ms-3" style={{ marginTop: "130px" }}>
                                        <h5>{user?.username}</h5>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">{userPosts?.length}</p>
                                            <p className="small mb-0">Posts</p>
                                        </div>
                                        <div className="px-3" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#followersModal" onClick={()=>getFollowers(user?._id)}>
                                            <p className="mb-1 h5">{user?.followers?.length}</p>
                                            <p className="small mb-0">Followers</p>
                                        </div>
                                        <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#followingModal" onClick={()=>getFollowing(user?._id)}>
                                            <p className="mb-1 h5">{user?.following?.length}</p>
                                            <p className="small mb-0">Following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                                            <p className="font-italic mb-1">{user?.about}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Recent posts</p>
                                    </div>

                                    <div className="" style={{ display: 'flex', flexWrap: 'wrap', width: '40vw' }}>
                                        {userPosts?.length > 0 && userPosts?.map((post) => {
                                            return (
                                                
                                                <Link to={`/post/${post?._id}`} state={{postId:post?._id}} className="mx-1 mb-2" style={{ width: '45%', cursor: 'pointer' }} key={post?._id} >
                                                    <img src={`${post?.image}`}
                                                        alt="image 1" className="w-100 rounded-3" />
                                                </Link>
                                            )
                                        })}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <button className="btn btn-outline-light" style={{height:'40px', position:'absolute', right:'30vw', top:'70px'}} onClick={logout}>Logout</button>
        </>
    )
}

export default Profile

import React, { useContext, useEffect, useState } from 'react'
import profilepic from '../assets/images/user.png'
import { UserContext } from '../contexts/UserContext'
import {Link} from 'react-router-dom'

const User = ({ u }) => {

    const [isFollowed, setIsFollowed] = useState(false)
    const { user, followUser, unfollowUser } = useContext(UserContext)

    useEffect(() => {
        if (u?.followers?.includes(user?._id)) {
            setIsFollowed(true)
        }

    }, [])

    const onFollowUser = () => {
        followUser(user?._id, u?._id)
        setIsFollowed(true)
    }

    const onUnfollowUser = () => {
        unfollowUser(user?._id, u?._id)
        setIsFollowed(false)
    }

    return (
        <div className="nearby-user" data-bs-dismiss="modal">
            <div className="row">
                <div className="col-md-2 col-sm-2" style={{ width: '20%' }}>
                <Link to={`/${`${user?._id === u?._id ? 'profile': u?.username}`}`} state={{u:u}} >
                    <img style={{ cursor: 'pointer' }} src={`${u?.profilepic ? u?.profilepic : profilepic}`} alt="user" className="profile-photo-lg" />
                    </Link>
                </div>
                <div className="col-md-7 col-sm-7" style={{ width: '50%' }}>
                    <h5><Link to={`/${`${user?._id === u?._id ? 'profile': u?.username}`}`} state={{u:u}} className="profile-link" style={{ color: 'black', textDecoration: 'none' }}>
                        {u?.username}</Link></h5>
                    <p>{u?.email}</p>
                </div>
                {user?._id !== u?._id &&
                <div className="col-md-3 col-sm-3">
                    {!isFollowed ? <button className="btn btn-dark pull-right mt-2" onClick={onFollowUser}>Follow</button> : <button className="btn btn-dark pull-right mt-2" onClick={onUnfollowUser}>Unfollow</button>}
                </div>
                }
            </div>
        </div>
    )
}

export default User

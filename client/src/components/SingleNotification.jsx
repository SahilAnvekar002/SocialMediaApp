import React, { useContext, useEffect } from 'react'
import profilepic from '../assets/images/user.png'
import { baseUrl, getRequest } from '../utils/services'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SingleNotification = ({notification}) => {

    const [sender, setSender] = useState(null)

    useEffect(() => {
      
        const getUser = async () => {
            const response = await getRequest(`${baseUrl}/user/getuser/${notification?.firstId}`)
            setSender(response)
        }

        getUser()
    }, [])
    

    return (
        <Link to={`/${notification?.secondId === notification?.userId ? sender?.username: 'post/'+notification?.secondId}`} state={notification?.secondId === notification?.userId ? {u:sender} : {postId:notification?.secondId}} className="profile-link" style={{ color: 'black', textDecoration: 'none' , width: '25vw', height: '45px', display:'block', marginBottom:'10px'}}>

        <div className="nearby-user mb-3" style={{ width: '25vw', height: '45px', cursor: 'pointer' }}>
            <div className="row" style={{ height: '100%' }}>
                <div className="col-md-2 col-sm-2" style={{ width: '15%', height: '100%' }}>
                    <img src={profilepic} alt="user" className="profile-photo-lg" style={{ height: '40px', width: '40px' }} />
                </div>
                <div className="col-md-7 col-sm-7 d-flex" style={{ height: '100%', alignItems: 'center' }}>
                    <p className='mb-2' style={{ fontSize: '16px', margin: '0' }}>{sender?.username} {notification?.text}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default SingleNotification

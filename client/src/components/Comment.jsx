import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import profilepic from '../assets/images/user.png'
import { baseUrl, getRequest } from '../utils/services'
import {Link} from 'react-router-dom'
import {UserContext} from '../contexts/UserContext'

const Comment = ({comment}) => {

    const [commentUser, setCommentUser] = useState(null)
    const {user} = useContext(UserContext)

    useEffect(() => {
        const getUser = async () => {
            if(comment?.userId){
                const response = await getRequest(`${baseUrl}/user/getuser/${comment?.userId}`)
                setCommentUser(response)
            }
        }

        getUser()
    }, [comment])

    return (
        <div className="card" style={{ backgroundColor: 'black', borderRadius: '0' }}>
            <div className="card-body">
                <div className="d-flex flex-start">

                <Link to={`${user?._id === commentUser?._id ? '/profile': commentUser?.username}`} state={{u:commentUser}} >
                    <img className="rounded-circle shadow-1-strong me-3"
                        src={`${commentUser?.profilepic ? commentUser?.profilepic: profilepic}`} alt="avatar" width="40"
                        height="40" style={{cursor:'pointer'}}/></Link>          
                                
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                        <Link to={`/${commentUser?.username}`} state={{u:commentUser}} style={{color:'black', textDecoration:'none'}}>
                            <h6 className="fw-bold mb-0" style={{ color: 'white' , cursor:'pointer'}}>
                                <strong>{commentUser?.username}</strong>
                                <span className="ms-2" style={{ color: 'white !important' }}>{comment?.text}</span>
                            </h6>
                            </Link>
                            <p className="mb-0" style={{ color: 'white' }}>{moment(comment?.createdAt).calendar()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment

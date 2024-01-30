import React, { useContext, useEffect, useState } from 'react'
import { baseUrl, getRequest } from '../utils/services'
import { UserContext } from '../contexts/UserContext'
import SingleNotification from '../components/SingleNotification'

const Notification = () => {

    const { user } = useContext(UserContext)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = async () => {
            const response = await getRequest(`${baseUrl}/notification/getusernotifications/${user?._id}`)
            setNotifications(response)
        }

        if (user?._id) {
            getNotifications()
        }
    }, [user])

    return (
        <div className='mt-5' style={{ marginLeft: '20vw', paddingLeft: '10vw' }}>
            <h2>Notifications</h2>
            <hr />
            <div>
                {notifications && notifications?.map((notification) => {
                    return (
                        <SingleNotification key={notification?._id} notification={notification}/>
                    )
                })}

            </div>
        </div>
    )
}

export default Notification

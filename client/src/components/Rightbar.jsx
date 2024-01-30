import React, { useContext } from 'react'
import '../assets/css/rightbar.css'
import { UserContext } from '../contexts/UserContext'
import SuggestedUser from './SuggestedUser'

const Rightbar = () => {

    const { user, users } = useContext(UserContext)

    return (
        <div>
            <div className="container my-5" style={{position:'fixed'}}>
                <h3 className='mb-4'>Suggested users for you</h3>
                <div className="row">
                    <div className="col-md-8">
                        <div className="people-nearby">
                            {users && users?.slice(0,10)?.map((u) => { 
                                return u?._id !== user?._id && (
                                    <SuggestedUser key={u?._id} u={u} />
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar

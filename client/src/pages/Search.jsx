import React, { useEffect } from 'react'
import profilepic from '../assets/images/user.png'
import { useState } from 'react'
import { baseUrl, getRequest } from '../utils/services'
import { useContext } from 'react'
import {UserContext} from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const Search = () => {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [searchedUsers, setSearchedUsers] = useState([])
    const {user} = useContext(UserContext)

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await getRequest(`${baseUrl}/user/getUsers`)
            setUsers(response)
        }

        getAllUsers()
    }, [])

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if(search === ""){
            setSearchedUsers([])    
        }
        else{
            let temp = users.filter(u => u?.username?.startsWith(search))
            setSearchedUsers(temp)
        }
    }, [search])


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20vw', paddingLeft: '10vw' }}>
                <div class="d-flex mt-5 mb-3" role="search" style={{ width: '30vw' }}>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => updateSearch(e)} />
                    <button class="btn btn-dark" type="submit">Search</button>
                </div>
                <div>
                    {searchedUsers && searchedUsers?.map((u) => {
                        return u?._id !== user?._id && (
                            <Link to={`/${u?.username}`} state={{u:u}} className="profile-link" style={{ color: 'black', textDecoration: 'none' , width: '25vw', height: '45px', display:'block', marginBottom:'10px'}} key={u?._id}>
                            <div className="nearby-user mb-3" style={{ width: '25vw', height: '45px', cursor:'pointer' }}>
                                <div className="row" style={{ height: '100%' }}>
                                    <div className="col-md-2 col-sm-2" style={{ width: '15%', height: '100%' }}>
                                        <img src={`${u?.profilepic? u?.profilepic: profilepic}`} alt="user" className="profile-photo-lg" style={{ height: '40px', width: '40px' }} />
                                    </div>
                                    <div className="col-md-7 col-sm-7 d-flex" style={{ height: '100%', alignItems: 'center' }}>
                                        <h5>{u?.username}</h5>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Search

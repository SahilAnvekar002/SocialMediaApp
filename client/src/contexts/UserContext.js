import {createContext, useCallback, useEffect, useState} from 'react'
import {baseUrl, deleteRequest, getRequest, postRequest} from '../utils/services'
import { useLocation, useNavigate } from 'react-router-dom'
 
export const UserContext = createContext()

export const UserContextProvider = ({children})=>{

    const navigate = useNavigate()
    
    const [user, setUser] = useState(null)
    const [signupInfo, setSignupInfo] = useState({
        username:"",
        email:"",
        password:"",
        cpassword:""
    })
    const [signupError, setSignupError] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        username:"",
        password:""
    })
    const [loginError, setLoginError] = useState(null)
    const [users, setUsers] = useState([])
    const [followingUsers, setFollowingUsers] = useState([])
    const [followersUsers, setFollowersUsers] = useState([])
    const [editProfileError, setEditProfileError] = useState(null)

    useEffect(() => {
        const getAllUsers = async()=>{
            const response = await getRequest(`${baseUrl}/user/getUsers`)
            setUsers(response)
        }

        getAllUsers()

    }, [useLocation().pathname])
    
    useEffect(() => {
        const u = localStorage.getItem('user')
        setUser(JSON.parse(u))
    }, [])
    

    const updateSignupInfo = useCallback((info)=>{
        setSignupInfo(info)
    },[])

    const signupUser = useCallback(async(e)=>{
        e.preventDefault()
        setSignupError(null)

        if(signupInfo.password !== signupInfo.cpassword){
            return setSignupError("Passwords does not match")
        }

        const response = await postRequest(`${baseUrl}/user/signup`, JSON.stringify({
            username:signupInfo.username,
            email:signupInfo.email,
            password:signupInfo.password
        }))

        if(response?.error){
            return setSignupError(response.message)
        }

        setUser(response)
        localStorage.setItem('user', JSON.stringify(response))
        navigate('/')

    },[signupInfo])

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)
    },[])

    const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/user/login`, JSON.stringify({
            username:loginInfo.username,
            password:loginInfo.password
        }))

        if(response?.error){
            return setLoginError(response.message)
        }

        setUser(response)
        localStorage.setItem('user', JSON.stringify(response))
        navigate('/')

    },[loginInfo])

    const followUser = async(firstId, secondId)=>{
        const response =  await postRequest(`${baseUrl}/user/follow`, JSON.stringify({
            firstId:firstId,
            secondId:secondId
        }))

        const response2 =  await postRequest(`${baseUrl}/notification/create`, JSON.stringify({
            text: "started following you",
            firstId: firstId,
            secondId: secondId,
            userId: secondId
        }))
    }

    const unfollowUser = async(firstId, secondId)=>{
        const response =  await postRequest(`${baseUrl}/user/unfollow`, JSON.stringify({
            firstId:firstId,
            secondId:secondId
        }))

        const response2 =  await deleteRequest(`${baseUrl}/notification/delete/${firstId}/${secondId}`)
    }

    const getFollowing =async(userId)=>{
        const response = await getRequest(`${baseUrl}/user/getfollowing/${userId}`)
        setFollowingUsers(response)
    }

    const getFollowers =async(userId)=>{
        const response = await getRequest(`${baseUrl}/user/getfollowers/${userId}`)
        setFollowersUsers(response)
    }

    const editProfile = useCallback(async(data)=>{
        setEditProfileError(null)

        const response = await postRequest(`${baseUrl}/user/editprofile`, JSON.stringify(data))

        if(response?.error){
            return setEditProfileError(response.message)
        }

        setUser(response)
        localStorage.setItem('user', JSON.stringify(response))
        navigate('/profile')

    },[])

    const logout =()=>{
        setUser(null)
        localStorage.removeItem('user')
        navigate('/login')
    }

    return(
        <UserContext.Provider value={{user, signupInfo, signupError, updateSignupInfo, signupUser, loginInfo, loginError, updateLoginInfo, loginUser , users, followUser, unfollowUser, getFollowing, followingUsers, getFollowers, followersUsers, editProfile, editProfileError, logout}}>
            {children}
        </UserContext.Provider>
    )
}
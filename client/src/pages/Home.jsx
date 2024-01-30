import React, { useContext, useEffect } from 'react'
import PostSection from '../components/PostSection'
import Rightbar from '../components/Rightbar'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const user =  JSON.parse(localStorage.getItem('user')) 
  const navigate = useNavigate()

  useEffect(() => {

    const checkUser=()=>{
      if(!user?._id){
          navigate('/login')
      }
    }

    checkUser()
    
  }, [user])
  
  return (
    <>
      <PostSection />
      <Rightbar />
    </>
  )
}

export default Home

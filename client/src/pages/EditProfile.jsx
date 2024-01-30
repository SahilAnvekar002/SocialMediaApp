import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import profilepic from '../assets/images/user.png'

const EditProfile = () => {

    const { user, editProfile, editProfileError } = useContext(UserContext)

    const [profileData, setProfileData] = useState({
        userId:"",
        username:"",
        email:"",
        profilepic:"",
        about:""
    })

    useEffect(() => {
        
        if(user?._id){
            setProfileData({userId:user?._id, username:user?.username, email:user?.email, profilepic:user?.profilepic, about:user?.about})
        }
        
    }, [user])
    
    const updateProfileData = (data)=>{
        setProfileData(data)
    }

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

        updateProfileData({...profileData, profilepic: base64})
    }

    return (
        <section style={{ marginLeft: '20vw' , width:'50vw'}} className='container my-5'>
                <div style={{ paddingLeft: '10vw' }}>
                    <div style={{border:'1px solid rgba(0,0,0,0.175)', padding:'30px', borderRadius:'10px'}}>
                    <h3 className='mb-5'>Edit profile</h3>
                    <div className="nearby-user mb-4" style={{width:'25vw'}}>
                        <div className="row">
                            <div className="col-md-2 col-sm-2" style={{ width: '20%' }}>
                                <img src={`${user?.profilepic ? user?.profilepic : profilepic}`} alt="user" className="profile-photo-lg" />

                            </div>
                            <div className="col-md-7 col-sm-7" style={{ width: '45%' }}>
                                <h5>{user?.username}</h5>
                                <p>{user?.email}</p>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <input type="file" name="image" id="image" style={{ display: 'none' }} onChange={(e)=>onImageChange(e)}/>
                                <label htmlFor='image' className="btn btn-dark pull-right mt-2" style={{width:'130px'}}>Change photo</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mb-2'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" id='email' name='email' className='form-control' value={profileData?.email} onChange={(e)=>updateProfileData({...profileData, email:e.target.value})}/>
                    </div>
                    
                    <div className='mb-2'>
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" id='username' name='username' className='form-control' value={profileData?.username} onChange={(e)=>updateProfileData({...profileData, username:e.target.value})}/>
                    </div>

                    <div className='mb-3'>
                    <label htmlFor="about" className='form-label'>About</label>
                    <textarea name="about" id="about" cols="30" rows="5" className='form-control' value={profileData?.about} onChange={(e)=>updateProfileData({...profileData, about:e.target.value})}></textarea>
                    </div>

                    <button className='btn btn-dark' onClick={()=>editProfile(profileData)}>Save changes</button>
                    </div>
                </div>
        </section>
    )
}

export default EditProfile

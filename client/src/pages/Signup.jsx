import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Signup = () => {

    const { signupInfo, updateSignupInfo, signupUser, signupError } = useContext(UserContext)

    return (
        <>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60vw', marginTop:'15vh' }}>
                <h2 className='mb-4'>Create an Account</h2>
                <form className='mb-3' onSubmit={(e) => signupUser(e)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" onChange={(e) => updateSignupInfo({
                            ...signupInfo, username: e.target.value
                        })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => updateSignupInfo({
                            ...signupInfo, email: e.target.value
                        })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => updateSignupInfo({
                            ...signupInfo, password: e.target.value
                        })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" onChange={(e) => updateSignupInfo({
                            ...signupInfo, cpassword: e.target.value
                        })} />
                    </div>
                    <div className='mb-3'>
                        <label className="form-check-label">Already have an account? <Link to='/login'>Click here</Link> to login</label>
                    </div>
                    <button type="submit" className="btn btn-dark">Signup</button>
                </form>
                {signupError && <div className="alert alert-danger" role="alert">
                    {signupError}
                </div>}
            </div>
        </>
    )
}

export default Signup

import React, {  } from 'react'
import { useContext } from 'react'
import { Link,  } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Login = () => {

    const {user ,loginInfo, updateLoginInfo, loginUser, loginError } = useContext(UserContext)

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60vw', marginTop: '23vh' }}>
            <h2 className='mb-4'>Login into Account</h2>
            <form className='mb-3' onSubmit={(e) => loginUser(e)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => updateLoginInfo({
                        ...loginInfo, username: e.target.value
                    })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => updateLoginInfo({
                        ...loginInfo, password: e.target.value
                    })} />
                </div>
                <div className='mb-3'>
                    <label className="form-check-label">Don't have an account? <Link to='/signup'>Click here</Link> to signup</label>
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
            {loginError && <div className="alert alert-danger" role="alert">
                {loginError}
            </div>}
        </div>
    )
}

export default Login

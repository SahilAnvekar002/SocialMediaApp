import React, {useContext} from 'react'
import '../assets/css/style.css'
import '../assets/js/script'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const {user} = useContext(UserContext)

    return (
        <>
            <div id="layoutSidenav_nav" style={{ width: '20vw', height: '100vh' , position:'fixed'}}>
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu d-flex" style={{ alignItems: 'center' }}>
                        <div className="nav">
                            <h2 className='mx-3 my-4'>Instagram</h2>
                            <Link className="nav-link" to='/'>
                                <div className="sb-nav-link-icon"><i className="fas fa-house"></i></div>
                                Home
                            </Link>
                            <Link className="nav-link" to="/search">
                                <div className="sb-nav-link-icon"><i className="fas fa-magnifying-glass"></i></div>
                                Search
                            </Link>
                            <Link className="nav-link" to="notifications">
                                <div className="sb-nav-link-icon"><i className="fas fa-bell"></i></div>
                                Notifications
                            </Link>
                            <Link className="nav-link" to="/profile">
                                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {user?.username}
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Sidebar

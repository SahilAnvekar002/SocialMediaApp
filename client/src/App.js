import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { PostContextProvider } from './contexts/PostContext';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import Sidebar from './components/Sidebar'
import Profile from './pages/Profile';
import UserProfile from './components/UserProfile';
import EditProfile from './pages/EditProfile';
import UserPost from './pages/UserPost';
import Search from './pages/Search';
import Notification from './pages/Notification';

function App() {

  const { user } = useContext(UserContext)
  const location = useLocation()

  return (
    <>
      <PostContextProvider user={user}>
        <div style={{ display: 'flex' }}>
          {location.pathname !== '/login' && location.pathname !== '/signup' && !location.pathname.includes('/post')  && <Sidebar />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/:username' element={<UserProfile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/post/:postid' element={<UserPost />} />
            <Route path='/search' element={<Search />} />
            <Route path='/notifications' element={<Notification />} />
          </Routes>
        </div>
      </PostContextProvider>
    </>
  );
}

export default App;

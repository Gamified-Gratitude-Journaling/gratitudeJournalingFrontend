import React, { useState, useContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';

import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context';
import Contribute from './pages/Contribute';
import About from './pages/About';
const Test = React.lazy(() => import('./pages/Test'));

function RequireAuth({ children }) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

// Render each example Component with an appropriate header
export default function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const client = useApolloClient();

  const login = (token, userId, tokenExpiration, email, username) => {
    setToken(token); setUserId(userId); setEmail(email); setUsername(username);
    sessionStorage.setItem('token', token); //still needed for apollo client
  }

  const logout = () => {
    setToken(null); setUserId(null); setEmail(null);
    client.clearStore();
  }


  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          email: email,
          username: username,
          login: login,
          logout: logout,
        }}
      >
        <div className='sticky top-0 z-50'>
          <NavBar className='mb-6'/>
        </div>

        
        <div className="max-w-3xl mx-auto px-2 z-0 my-10 min-h-screen" id = 'mainBodyDiv'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/journal" element={<RequireAuth><Journal /></RequireAuth>} />
            <Route path="/contribute" element={<RequireAuth><Contribute /></RequireAuth>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            {process.env.NODE_ENV !== 'production' && (
              <Route path="/test" element={
                <Suspense fallback={<p>loading...</p>}>
                  <Test />
                </Suspense>
              } />
            )}
            <Route path="*" element={<Navigate to="/journal" />} />
          </Routes>
        </div>
      
        <div className='grid bg-gray-200 h-screen-3/6 pt-4 mt-10'>
          <div className='flex px-10 place-content-center'>
            <NavLink to='/about'>About</NavLink>
          </div>
          <p className='align-self-end text-center'>© Copyright 2022</p>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}


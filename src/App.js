import React, { useState, useContext, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context';
import Contribute from './pages/Contribute';
import About from './pages/About';
import Error from './components/Error';
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
  const [isTreatment, setIsTreatment] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const client = useApolloClient();

  const login = (token, userId, tokenExpiration, email, username, isTreatment) => {
    setToken(token); setUserId(userId); setEmail(email); setUsername(username); setIsTreatment(isTreatment);
    sessionStorage.setItem('token', token); //still needed for apollo client
  }

  const logout = () => {
    setToken(null); setUserId(null); setEmail(null);
    client.clearStore();
  }


  return (
    <ErrorBoundary
      FallbackComponent={Error}
      onError={(error, errorInfo) => { console.log(error) }}
    >
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          email: email,
          username: username,
          isTreatment: isTreatment,
          login: login,
          logout: logout,
        }}
      >
        <div className='sticky top-0 z-50'>
          <NavBar className='mb-6' />
        </div>


        <div className="max-w-3xl mx-auto px-2 z-0 my-10 min-h-screen" id='mainBodyDiv'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/journal" element={<RequireAuth><Journal /></RequireAuth>} />
            <Route path="/contribute" element={<RequireAuth><Contribute /></RequireAuth>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Leaderboard />} />
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
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
      />
    </ErrorBoundary>
  );
}


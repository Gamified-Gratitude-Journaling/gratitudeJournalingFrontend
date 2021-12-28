import React, { useState, useContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';

import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context';
import Contribute from './pages/Contribute';
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
  const client = useApolloClient();

  const login = (token, userId, tokenExpiration, email) => {
    setToken(token); setUserId(userId); setEmail(email);
    sessionStorage.setItem('token', token);
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
          login: login,
          logout: logout,
        }}
      >
        <div className='sticky top-0 z-5'>
          <NavBar />
        </div>

        
        <div className="max-w-3xl mx-auto px-2 mt-6 z-0 " id = 'mainBodyDiv'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/journal" element={<RequireAuth><Journal /></RequireAuth>} />
            <Route path="/contribute" element={<RequireAuth><Contribute /></RequireAuth>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile/:username" element={<Profile />} />
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
      
      
      </AuthContext.Provider>
    </BrowserRouter>
  );
}


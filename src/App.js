import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';

import MainPage from './pages/MainPage';
import Login from './pages/Login';
import AuthContext from './context/auth-context';

function RequireAuth({ children }) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  console.log(auth.token);
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
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/MainPage"/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/MainPage" element={<RequireAuth><MainPage /></RequireAuth>} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}


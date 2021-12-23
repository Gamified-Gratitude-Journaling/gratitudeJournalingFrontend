import React, { useState, useContext, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';

import MainPage from './pages/MainPage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context';
const Test = React.lazy(() => import('./pages/Test'));

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
    <HashRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          email: email,
          login: login,
          logout: logout,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/MainPage" element={<RequireAuth><MainPage /></RequireAuth>} />
          {process.env.NODE_ENV !== 'production' && (
            <Route path="/Test" element={
              <Suspense fallback={<p>loading...</p>}>
                <Test />
              </Suspense>
            } />
          )}
          <Route path="*" element={<Navigate to="/MainPage" />} />
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  );
}


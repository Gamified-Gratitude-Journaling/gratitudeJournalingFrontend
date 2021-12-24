import React, { useState, useContext, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';

import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context';
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
        <div className="max-w-3xl mx-auto mt-6 px-2">
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/MainPage" element={<RequireAuth><MainPage /></RequireAuth>} />
            <Route path="/Journal" element={<RequireAuth><Journal /></RequireAuth>} />
            <Route path="/Profile" element={<RequireAuth><Profile /></RequireAuth>} />
            {process.env.NODE_ENV !== 'production' && (
              <Route path="/Test" element={
                <Suspense fallback={<p>loading...</p>}>
                  <Test />
                </Suspense>
              } />
            )}
            <Route path="*" element={<Navigate to="/MainPage" />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </HashRouter>
  );
}


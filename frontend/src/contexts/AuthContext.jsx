import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // On mount, if token exists, fetch user profile
  useEffect(() => {
    console.log('AuthProvider useEffect: token =', token, 'user =', user);
    if (token && !user) {
      fetchProfile()
        .then(profile => {
          console.log('Fetched profile:', profile);
          setUser(profile);
        })
        .catch((err) => {
          console.error('Failed to fetch profile:', err);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

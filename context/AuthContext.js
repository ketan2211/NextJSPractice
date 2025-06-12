'use client'; // for app directory; remove if using pages/

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null if not logged in

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // set fake user with token
    }
  }, []);

  const login = (username, password) => {
    if (username && password) {
      const fakeToken = 'fake-token-123';
      localStorage.setItem('token', fakeToken);
      setUser({ token: fakeToken });
    }
  };

  const register = (username, password) => {
    // Normally you'd send this to an API
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

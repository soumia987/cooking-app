import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminCredentials] = useState({
    username: 'admin',
    password: 'admin123' // À changer en production!
  });

  const login = (role = 'user') => setUser({ role });
  
  const adminLogin = (username, password) => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setUser({ role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
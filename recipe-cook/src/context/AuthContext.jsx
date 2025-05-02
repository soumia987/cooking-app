import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminAccounts, setAdminAccounts] = useState([
    { username: 'admin', password: 'admin123' } // Compte admin par défaut
  ]);

  const login = (role = 'user') => setUser({ role });
  
  const adminLogin = (username, password) => {
    const account = adminAccounts.find(acc => 
      acc.username === username && acc.password === password
    );
    if (account) {
      setUser({ role: 'admin' });
      return true;
    }
    return false;
  };

  const registerAdmin = (username, password) => {
    const exists = adminAccounts.some(acc => acc.username === username);
    if (exists) return false;
    
    setAdminAccounts([...adminAccounts, { username, password }]);
    return true;
  };

  const logout = () => setUser(null);
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      adminLogin,
      registerAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
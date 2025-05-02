import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-6">Connexion</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        onClick={() => handleLogin('user')}
      >
        Se connecter en tant qu'utilisateur
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => handleLogin('admin')}
      >
        Se connecter en tant qu'admin
      </button>
    </div>
  );
};

export default Login;
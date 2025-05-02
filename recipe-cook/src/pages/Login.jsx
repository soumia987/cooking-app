import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserLogin = () => {
    login('user');
    navigate('/');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        
        {!showAdminForm ? (
          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              onClick={handleUserLogin}
            >
              Se connecter en tant qu'utilisateur
            </button>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              onClick={() => setShowAdminForm(true)}
            >
              Se connecter en tant qu'admin
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setShowAdminForm(false)}
              >
                ← Retour
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Se connecter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
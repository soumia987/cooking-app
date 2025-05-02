import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, adminLogin, registerAdmin } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('main'); // 'main', 'admin-login', 'admin-register'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleUserLogin = () => {
    login('user');
    navigate('/');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const success = adminLogin(formData.username, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleAdminRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    const success = registerAdmin(formData.username, formData.password);
    if (success) {
      setError('');
      setView('admin-login');
      alert('Inscription réussie! Veuillez vous connecter.');
    } else {
      setError("Ce nom d'utilisateur est déjà pris");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {view === 'main' ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
            <div className="space-y-4">
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={handleUserLogin}
              >
                Se connecter en tant qu'utilisateur
              </button>
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                onClick={() => setView('admin-login')}
              >
                Se connecter en tant qu'admin
              </button>
              <div className="text-center pt-4 border-t">
                <button 
                  onClick={() => setView('admin-register')}
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  Créer un compte admin
                </button>
              </div>
            </div>
          </>
        ) : view === 'admin-login' ? (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">Connexion Admin</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setView('main')}
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
        ) : (
          <form onSubmit={handleAdminRegister} className="space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">Inscription Admin</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="reg-username">
                Nom d'utilisateur
              </label>
              <input
                id="reg-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="reg-password">
                Mot de passe
              </label>
              <input
                id="reg-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="reg-confirm-password">
                Confirmer le mot de passe
              </label>
              <input
                id="reg-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setView('main')}
              >
                ← Retour
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                S'inscrire
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
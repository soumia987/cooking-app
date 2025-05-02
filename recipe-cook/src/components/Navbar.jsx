import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/Logo.png';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Mamie's Kitchen Logo" 
            className="h-12 w-auto object-contain"
          />
          <span className="text-xl font-semibold text-orange-400 hover:text-orange-300 transition-colors">
            Mamie's Kitchen
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link 
          to="/" 
          className="hover:text-orange-300 transition-colors px-2 py-1 rounded hover:bg-gray-700"
        >
          Accueil
        </Link>
        {user && isAdmin && (
          <Link 
            to="/dashboard" 
            className="hover:text-orange-300 transition-colors px-2 py-1 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
        )}
        {!user ? (
          <Link 
            to="/login" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Connexion
          </Link>
        ) : (
          <button 
            onClick={handleLogout} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
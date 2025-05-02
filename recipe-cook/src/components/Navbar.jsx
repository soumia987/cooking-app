import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-orange-400">
        <Link to="/">🍽️ Mamie's Kitchen</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        {user && isAdmin && (
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}
        {!user ? (
          <Link to="/login" className="hover:underline">
            Connexion
          </Link>
        ) : (
          <button onClick={handleLogout} className="hover:underline">
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
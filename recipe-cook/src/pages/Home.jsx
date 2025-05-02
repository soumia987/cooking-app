import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const categories = [
    { value: 'Moroccan', label: 'Plats Marocains' },
    { value: 'Italian', label: 'Plats Italiens' },
    { value: 'French', label: 'Plats Français' },
    { value: 'Indian', label: 'Plats Indiens' },
    { value: 'Chinese', label: 'Plats Chinois' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes?search=${searchTerm}&category=${selectedCategory}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Découvrez les délices de Mamie's Kitchen</h1>
          <p className="text-xl mb-8">Des recettes authentiques pour des moments savoureux</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex shadow-lg rounded-lg overflow-hidden">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher une recette..."
                  className="w-full py-4 px-6 text-gray-800 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-4 text-gray-600"
                >
                  <FiSearch size={20} />
                </button>
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border-l border-gray-200 py-4 px-6 pr-10 text-gray-800 focus:outline-none"
                >
                  <option value="">Toutes catégories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter size={18} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Recettes populaires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example Recipe Cards - You can replace with dynamic data */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img 
              src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" 
              alt="Tajine" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Tajine marocain</h3>
              <p className="text-gray-600 mb-4">Un délicieux tajine aux légumes et agneau, parfumé aux épices.</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Voir la recette
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img 
              src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" 
              alt="Couscous" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Couscous royal</h3>
              <p className="text-gray-600 mb-4">Le plat traditionnel marocain avec viande et légumes.</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Voir la recette
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img 
              src="https://www.themealdb.com/images/media/meals/1529446352.jpg" 
              alt="Pastilla" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Pastilla au poulet</h3>
              <p className="text-gray-600 mb-4">La célèbre pastilla marocaine, sucrée-salée.</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Voir la recette
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
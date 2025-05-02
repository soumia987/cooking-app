import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
          cancelToken: source.token
        });
        
        if (isMounted) {
          if (response.data.meals) {
            setRecipes(response.data.meals);
          } else {
            setError("Aucune recette trouvée.");
          }
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isCancel(err)) {
            console.log('Request canceled:', err.message);
          } else {
            setError("Échec du chargement des recettes.");
            console.error(err);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      isMounted = false;
      source.cancel('Component unmounted, canceling request');
    };
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des recettes</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded-t-lg mb-3"
            />
            <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
            <p className="text-gray-600 line-clamp-3">
              {recipe.strInstructions ? recipe.strInstructions.substring(0, 150) + '...' : 'No instructions available'}
            </p>
            <div className="mt-3">
              <span className="text-sm text-blue-600">Catégorie: {recipe.strCategory}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
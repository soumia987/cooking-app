import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          { cancelToken: source.token }
        );

        if (isMounted) {
          if (response.data.meals && response.data.meals.length > 0) {
            setRecipe(response.data.meals[0]);
          } else {
            setError("Recette non trouvée.");
          }
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isCancel(err)) {
            console.log('Request canceled:', err.message);
          } else {
            setError("Échec du chargement de la recette.");
            console.error(err);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();

    return () => {
      isMounted = false;
      source.cancel('Component unmounted, canceling request');
    };
  }, [id]);

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!recipe) return <p className="p-4">Aucune recette disponible.</p>;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`]
      });
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Retour à la liste
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-lg shadow-md"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Catégorie</h2>
            <p>{recipe.strCategory}</p>
            
            <h2 className="text-xl font-semibold mt-4 mb-2">Origine</h2>
            <p>{recipe.strArea}</p>
            
            {recipe.strYoutube && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Vidéo</h2>
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Voir sur YouTube
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Ingrédients</h2>
          <ul className="list-disc pl-5 mb-6">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>
          
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <div className="whitespace-pre-line">{recipe.strInstructions}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
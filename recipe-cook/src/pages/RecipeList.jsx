import React from 'react';

const RecipeList = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des recettes</h1>
      <ul className="space-y-2">
        <li className="p-4 bg-white shadow rounded">Spaghetti Bolognese</li>
        <li className="p-4 bg-white shadow rounded">Poulet au curry</li>
      </ul>
    </div>
  );
};

export default RecipeList;
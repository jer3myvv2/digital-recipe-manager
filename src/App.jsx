import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Favorite from "./components/Favorite";
import Profile from "./components/Profile";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        if (!data.meals) { setRecipes([]); setLoading(false); return; }
        const formatted = data.meals.map(m => {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = m[`strIngredient${i}`];
            const meas = m[`strMeasure${i}`];
            if (ing && ing.trim()) ingredients.push(`${meas ? meas.trim() : ''} ${ing.trim()}`.trim());
          }
          return {
            id: m.idMeal,
            name: m.strMeal,
            country: m.strArea,
            image: m.strMealThumb,
            description: m.strInstructions,
            category: m.strCategory,
            tags: m.strTags ? m.strTags.split(',').map(t => t.trim()).filter(Boolean) : [],
            ingredients,
            isFavorite: false
          };
        });
        setRecipes(formatted);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const addRecipe = (newRecipe) => setRecipes(prev => [newRecipe, ...prev]);

  const toggleFavorite = (id) =>
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));

  const deleteRecipe = (id) =>
    setRecipes(prev => prev.filter(r => r.id !== id));

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main style={{ flex: 1, background: '#F8FAFC', overflowY: 'auto', minWidth: 0 }}>
          <Routes>
            <Route path="/" element={
              <Dashboard
                recipes={recipes}
                onAddRecipe={addRecipe}
                onFavorite={toggleFavorite}
                onDelete={deleteRecipe}
                loading={loading}
              />
            } />
            <Route path="/favorite" element={
              <Favorite recipes={recipes.filter(r => r.isFavorite)} onFavorite={toggleFavorite} />
            } />
            <Route path="/profile" element={<Profile recipes={recipes} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

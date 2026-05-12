import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Favorite from "./components/Favorite";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => {
        const formatted = data.meals.map(m => ({
          id: m.idMeal,
          name: m.strMeal,
          country: m.strArea,
          image: m.strMealThumb,
          description: m.strInstructions,
          isfavorite: false
        }))
        setRecipes(formatted);
        setLoading(false);
      });
        },[]);

   const addRecipe = (newRecipe) => 
    setRecipes([...recipes, newRecipe]);
  
   const toggleFavorite = (id) => {
    setRecipes(prev => prev.map (r => r.id === id ? {...r, isfavorite: !r.isfavorite} : r));
   }

   return (
    <Router>
      <div style ={{ display: 'flex', height: '100vh', width: '100vw', overflow:'hidden' }}>
        <Navbar />
        <main style={{ flex: 1, background: '#F8FAFC', overflowY: 'auto' }}>
        <Routes>
          <Route path='/' element = {<Dashboard recipes= {recipes} onAddRecipe={addRecipe} onFavorite={toggleFavorite} loading={loading} />} />
          <Route path='/favorite' element = {<Favorite recipes= {recipes.filter(r => r.isFavorite)} onFavorite={toggleFavorite} />} />
        </Routes>
        </main>
      </div>
    </Router>
   );
}

export default App;

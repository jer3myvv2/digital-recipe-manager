import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const RecipeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    country: '',
    image: '',
    description: ''
  });

  const [ingredients, setIngredients] = useState(['', '']);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...form,
      id: Date.now(),
      isFavorite: false
    });

    setForm({ name: '', country: '', image: '', description: '' });
    setIngredients(['', '']);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <h2>Add Recipe</h2>

      <input
        placeholder="Food Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Country"
        value={form.country}
        onChange={e => setForm({ ...form, country: e.target.value })}
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit" style={{
        background: '#0D9488',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '8px'
      }}>
        Save Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
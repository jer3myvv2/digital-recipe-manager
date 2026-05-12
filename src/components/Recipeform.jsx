import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const RecipeForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', country: '', image: '', description: '' });
  const [ingredients, setIngredients] = useState(['', '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now(), isFavorite: false });
    setForm({ name: '', country: '', image: '', description: '' });
    setIngredients(['', '']);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h2>Add/Edit Recipe</h2>
      <label style={labelStyle}>Food Name</label>
      <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      
      <label style={labelStyle}>Country of Origin</label>
      <input style={inputStyle} value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
      
      <label style={labelStyle}>Image URL</label>
      <input style={inputStyle} value={form.image} onChange={e => setForm({...form, image: e.target.value})} />

      <label style={labelStyle}>Description</label>
      <textarea style={{...inputStyle, height: '80px'}} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

      <label style={labelStyle}>Ingredients</label>
      {ingredients.map((ing, i) => (
        <input key={i} style={inputStyle} placeholder="Add Ingredient" value={ing} onChange={e => {
          const newIngs = [...ingredients];
          newIngs[i] = e.target.value;
          setIngredients(newIngs);
        }} />
      ))}
      <button type="button" onClick={() => setIngredients([...ingredients, ''])} style={{ color: '#0D9488', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Plus size={16} /> Add Ingredient
      </button>

      <button type="submit" style={{ background: '#0D9488', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Save Recipe</button>
    </form>
  );
};

const labelStyle = { fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' };

export default RecipeForm;
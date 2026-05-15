import React, { useState } from 'react';
import { Plus, ChefHat, X } from 'lucide-react';

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #E2E8F0',
  borderRadius: '10px',
  fontSize: '0.85rem',
  outline: 'none',
  color: '#1E293B',
  background: '#F8FAFC',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border 0.18s, box-shadow 0.18s'
};

const Label = ({ children }) => (
  <label style={{
    display: 'block', fontSize: '0.7rem', fontWeight: '700',
    color: '#64748B', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.06em'
  }}>
    {children}
  </label>
);

const RecipeForm = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ name: '', country: '', image: '', description: '', category: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const focusStyle = (e) => {
    e.target.style.border = '1px solid #0D9488';
    e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.1)';
    e.target.style.background = 'white';
  };
  const blurStyle = (e) => {
    e.target.style.border = '1px solid #E2E8F0';
    e.target.style.boxShadow = 'none';
    e.target.style.background = '#F8FAFC';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    onAdd({ ...form, id: Date.now(), isFavorite: false });
    setForm({ name: '', country: '', image: '', description: '', ingredients: [], category: '' });
  };

  const canSubmit = form.name.trim().length > 0;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
            borderRadius: '12px', padding: '9px',
            display: 'flex', boxShadow: '0 4px 14px rgba(13,148,136,0.35)'
          }}>
            <ChefHat size={18} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Add Recipe</h2>
            <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: 0 }}>Fill in the details below</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            border: 'none', background: '#F1F5F9', borderRadius: '8px',
            padding: '7px', cursor: 'pointer', color: '#64748B', display: 'flex',
            transition: 'background 0.18s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
          onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
          >
            <X size={15} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <Label>Recipe Name *</Label>
          <input
            placeholder="e.g. Chicken Tikka Masala"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            style={fieldStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <Label>Country</Label>
            <input
              placeholder="e.g. Indian"
              value={form.country}
              onChange={e => set('country', e.target.value)}
              style={fieldStyle}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
          <div>
            <Label>Category</Label>
            <input
              placeholder="e.g. Chicken"
              value={form.category}
              onChange={e => set('category', e.target.value)}
              style={fieldStyle}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
        </div>

        <div>
          <Label>Ingredients</Label>
          <input
            placeholder="e.g. 200g chicken, 100ml yogurt..."
            value={form.ingredients}
            onChange={e => set('ingredients', e.target.value)}
            style={fieldStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <input
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={e => set('image', e.target.value)}
            style={fieldStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div>
          <Label>Description / Instructions</Label>
          <textarea
            placeholder="How to make this dish..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
            style={{ ...fieldStyle, height: '100px', resize: 'vertical' }}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          style={{
            background: canSubmit
              ? 'linear-gradient(135deg, #0D9488, #14B8A6)'
              : '#E2E8F0',
            color: canSubmit ? 'white' : '#94A3B8',
            padding: '12px',
            border: 'none', borderRadius: '10px',
            fontWeight: '700', fontSize: '0.875rem',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            transition: 'all 0.18s',
            boxShadow: canSubmit ? '0 4px 14px rgba(13,148,136,0.35)' : 'none',
            marginTop: '4px'
          }}
        >
          <Plus size={16} />
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;

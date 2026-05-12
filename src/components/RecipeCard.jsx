import React from 'react';
import { Clock, BarChart, Heart, Trash2 } from 'lucide-react';

const RecipeCard = ({ recipe, onFavorite }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      <img
        src={recipe.image}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
        alt={recipe.name}
      />

      <button
        onClick={() => onFavorite(recipe.id)}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          border: 'none',
          background: 'white',
          borderRadius: '50%',
          padding: '6px',
          cursor: 'pointer'
        }}
      >
        <Heart
          size={18}
          fill={recipe.isFavorite ? "#EF4444" : "none"}
          color={recipe.isFavorite ? "#EF4444" : "#64748B"}
        />
      </button>

      <div style={{ padding: '20px' }}>
        <div style={{
          fontSize: '0.7rem',
          background: '#F1F5F9',
          padding: '4px 10px',
          borderRadius: '20px',
          display: 'inline-block',
          fontWeight: 'bold'
        }}>
          📍 {recipe.country}
        </div>

        <h3 style={{ margin: '12px 0 8px 0' }}>{recipe.name}</h3>

        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          {recipe.description?.substring(0, 80)}...
        </p>

        <div style={{
          display: 'flex',
          gap: '15px',
          fontSize: '0.8rem',
          color: '#94A3B8',
          marginTop: '15px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} /> 1 hr
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BarChart size={14} /> Medium
          </span>

          <Trash2 size={16} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        </div>

        <button style={{
          width: '100%',
          background: '#0891B2',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '10px',
          fontWeight: 'bold',
          marginTop: '15px',
          cursor: 'pointer'
        }}>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
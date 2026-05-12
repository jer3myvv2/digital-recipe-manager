import React from 'react';
import { Heart, Utensils } from 'lucide-react';
import RecipeCard from './RecipeCard';

const Favorite = ({ recipes, onFavorite }) => {
  return (
    <div style={{ padding: '40px', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <Heart size={32} fill="#EF4444" color="#EF4444" />
        <h1 style={{
          margin: 0,
          fontSize: '2rem',
          color: '#0F172A'
        }}>
          Favorite Recipes
        </h1>
      </div>

      {/* Favorites list */}
      {recipes && recipes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div style={{
          textAlign: 'center',
          marginTop: '100px',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <Utensils size={64} strokeWidth={1} />

          <div>
            <h3 style={{
              margin: '0 0 10px 0',
              color: '#475569'
            }}>
              No favorites yet
            </h3>

            <p style={{ margin: 0 }}>
              Go back to the dashboard and click the heart on recipes you love!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
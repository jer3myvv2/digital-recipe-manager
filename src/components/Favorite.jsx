import { useState } from 'react';
import { Heart, Utensils } from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

const Favorite = ({ recipes, onFavorite }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div style={{ padding: '32px', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
        <div style={{
          background: '#FEE2E2', borderRadius: '12px', padding: '10px',
          display: 'flex', flexShrink: 0
        }}>
          <Heart size={22} fill="#EF4444" color="#EF4444" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.55rem', fontWeight: '800', color: '#0F172A' }}>
            Favorite Recipes
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
            {recipes.length} saved recipe{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={{ height: '1px', background: '#F1F5F9', margin: '22px 0 26px' }} />

      {recipes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {recipes.map((recipe, i) => (
            <div key={recipe.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <RecipeCard
                recipe={recipe}
                onFavorite={onFavorite}
                onClick={() => setSelectedRecipe(recipe)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', marginTop: '80px', color: '#94A3B8',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px'
        }}>
          <div style={{
            background: '#F1F5F9', borderRadius: '50%',
            padding: '28px', display: 'inline-flex'
          }}>
            <Utensils size={48} strokeWidth={1} color="#CBD5E1" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px 0', color: '#475569', fontWeight: '700', fontSize: '1.1rem' }}>
              No favorites yet
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', maxWidth: '320px' }}>
              Go back to the dashboard and click the heart on recipes you love!
            </p>
          </div>
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={recipes.find(r => r.id === selectedRecipe.id) || selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onFavorite={onFavorite}
        />
      )}
    </div>
  );
};

export default Favorite;

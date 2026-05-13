import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, X, Grid3X3, List } from 'lucide-react';
import Recipeform from "./Recipeform";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import FeaturedSlider from "./FeaturedSlider";

const Dashboard = ({ recipes, onAddRecipe, onFavorite, onDelete, loading }) => {
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered = useMemo(() =>
    recipes.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.country?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (r.category?.toLowerCase() || '').includes(search.toLowerCase())
    ),
    [recipes, search]
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: showForm && !isMobile ? 'min(370px, 33%) 1fr' : '1fr',
      height: '100%',
      transition: 'grid-template-columns 0.28s ease'
    }}>
      {/* Add Recipe Sidebar */}
      {showForm && (
        <aside style={{
          borderRight: '1px solid #E2E8F0',
          background: 'white',
          overflowY: 'auto',
          padding: '28px',
          ...(isMobile ? {
            position: 'fixed', inset: 0, zIndex: 200,
            gridColumn: 'auto'
          } : {})
        }}>
          <Recipeform onAdd={r => { onAddRecipe(r); if (isMobile) setShowForm(false); }} onClose={() => setShowForm(false)} />
        </aside>
      )}

      {/* Mobile form overlay backdrop */}
      {showForm && isMobile && (
        <div
          onClick={() => setShowForm(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 199, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)' }}
        />
      )}

      {/* Main content */}
      <section style={{ padding: isMobile ? '68px 16px 28px' : '28px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '24px', gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div>
            <h1 style={{ fontSize: '1.55rem', fontWeight: '800', color: '#0F172A', margin: '0 0 3px 0' }}>
              My Recipes
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
              {recipes.length} recipes in your collection
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#94A3B8" style={{
                position: 'absolute', left: '11px', top: '50%',
                transform: 'translateY(-50%)', pointerEvents: 'none'
              }} />
              <input
                placeholder="Search recipes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '8px 12px 8px 32px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  width: isMobile ? '160px' : '210px',
                  fontSize: '0.825rem',
                  outline: 'none',
                  background: 'white',
                  color: '#1E293B',
                  transition: 'border 0.18s, box-shadow 0.18s'
                }}
                onFocus={e => { e.target.style.border = '1px solid #0D9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.1)'; }}
                onBlur={e => { e.target.style.border = '1px solid #E2E8F0'; e.target.style.boxShadow = 'none'; }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{
                  position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '2px'
                }}>
                  <X size={13} color="#94A3B8" />
                </button>
              )}
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', gap: '2px' }}>
              {[{ mode: 'grid', Icon: Grid3X3 }, { mode: 'list', Icon: List }].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    border: 'none', cursor: 'pointer',
                    padding: '6px 9px', borderRadius: '6px',
                    background: viewMode === mode ? 'white' : 'transparent',
                    color: viewMode === mode ? '#0D9488' : '#94A3B8',
                    boxShadow: viewMode === mode ? '0 1px 4px rgba(0,0,0,0.09)' : 'none',
                    transition: 'all 0.18s', display: 'flex'
                  }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Add Recipe button */}
            <button
              onClick={() => setShowForm(f => !f)}
              style={{
                background: showForm
                  ? '#F1F5F9'
                  : 'linear-gradient(135deg, #0D9488, #14B8A6)',
                color: showForm ? '#475569' : 'white',
                border: 'none', padding: '8px 16px',
                borderRadius: '10px', fontWeight: '600',
                fontSize: '0.825rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                transition: 'all 0.18s',
                boxShadow: showForm ? 'none' : '0 4px 14px rgba(13,148,136,0.3)'
              }}
            >
              <Plus size={15} />
              {showForm ? 'Cancel' : 'Add Recipe'}
            </button>
          </div>
        </div>

        {/* Featured Slider */}
        {!loading && recipes.length > 0 && (
          <FeaturedSlider recipes={recipes} onOpen={setSelectedRecipe} />
        )}

        {/* All Recipes grid */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '16px'
        }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A' }}>
            All Recipes
            {search && <span style={{ color: '#94A3B8', fontWeight: '400', marginLeft: '8px', fontSize: '0.85rem' }}>
              — {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
            </span>}
          </h2>
        </div>

        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '300px', borderRadius: '16px' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
            <div style={{ background: '#F1F5F9', borderRadius: '50%', padding: '20px', display: 'inline-flex', marginBottom: '16px' }}>
              <Search size={40} strokeWidth={1} color="#CBD5E1" />
            </div>
            <h3 style={{ color: '#475569', marginBottom: '8px', fontWeight: '600' }}>No recipes found</h3>
            <p style={{ fontSize: '0.875rem' }}>Try a different search term or add a new recipe</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid'
              ? 'repeat(auto-fill, minmax(240px, 1fr))'
              : '1fr',
            gap: '20px'
          }}>
            {filtered.map((recipe, i) => (
              <div
                key={recipe.id}
                className="animate-fadeUp"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onFavorite={onFavorite}
                  onDelete={onDelete}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recipe detail modal */}
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

export default Dashboard;

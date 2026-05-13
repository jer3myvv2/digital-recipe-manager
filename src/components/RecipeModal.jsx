import React, { useEffect } from 'react';
import { X, Heart, Clock, ChefHat, Globe, BookOpen } from 'lucide-react';

const RecipeModal = ({ recipe, onClose, onFavorite }) => {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!recipe) return null;

  const steps = recipe.description
    ?.split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean) || [];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,23,42,0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'overlayIn 0.2s ease'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 30px 70px rgba(0,0,0,0.28)',
          animation: 'modalIn 0.26s ease'
        }}
      >
        {/* Hero image */}
        <div style={{ position: 'relative', height: '240px', flexShrink: 0 }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          {/* Action buttons */}
          <button onClick={onClose} style={iconBtnStyle('#0F172A')}>
            <X size={17} color="#0F172A" />
          </button>
          <button
            onClick={() => onFavorite(recipe.id)}
            style={{ ...iconBtnStyle(null), right: '56px', background: recipe.isFavorite ? '#EF4444' : 'rgba(255,255,255,0.95)' }}
          >
            <Heart size={17} fill={recipe.isFavorite ? 'white' : 'none'} color={recipe.isFavorite ? 'white' : '#EF4444'} />
          </button>

          {/* Title overlay */}
          <div style={{ position: 'absolute', bottom: '20px', left: '22px', right: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Globe size={11} /> {recipe.country || 'International'}
              </span>
              {recipe.category && (
                <span style={{
                  background: 'rgba(13,148,136,0.9)', color: 'white',
                  padding: '2px 10px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: '700'
                }}>
                  {recipe.category}
                </span>
              )}
            </div>
            <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>{recipe.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Meta strip */}
          <div style={{
            display: 'flex', gap: '16px', padding: '18px 24px',
            borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', alignItems: 'center'
          }}>
            <Chip icon={<Clock size={14} color="#0D9488" />} bg="#CCFBF1" label="45 min" />
            <Chip icon={<ChefHat size={14} color="#F59E0B" />} bg="#FEF3C7" label="Medium" />
            {recipe.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginLeft: 'auto' }}>
                {recipe.tags.slice(0, 4).map((tag, i) => (
                  <span key={i} style={{
                    background: '#F1F5F9', color: '#475569',
                    padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '500'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div style={{ padding: '22px 24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#CCFBF1', borderRadius: '8px', padding: '6px', display: 'flex' }}>
                <BookOpen size={15} color="#0D9488" />
              </div>
              <h3 style={{ fontSize: '0.975rem', fontWeight: '700', color: '#0F172A' }}>Instructions</h3>
            </div>
            {steps.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {steps.slice(0, 10).map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
                      color: 'white', fontSize: '0.68rem', fontWeight: '700',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '1px'
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>No instructions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const iconBtnStyle = (color) => ({
  position: 'absolute', top: '14px', right: '14px',
  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
  border: 'none', borderRadius: '50%',
  width: '36px', height: '36px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
});

const Chip = ({ icon, bg, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem' }}>
    <div style={{ background: bg, borderRadius: '8px', padding: '6px', display: 'flex' }}>{icon}</div>
    <span style={{ fontWeight: '500' }}>{label}</span>
  </div>
);

export default RecipeModal;

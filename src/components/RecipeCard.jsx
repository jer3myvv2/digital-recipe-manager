import React from 'react';
import { Clock, ChefHat, Heart, Trash2, Globe } from 'lucide-react';

const RecipeCard = ({ recipe, onFavorite, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        border: '1px solid #F1F5F9',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '188px', flexShrink: 0 }}>
        <img
          src={recipe.image}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
          alt={recipe.name}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 55%)',
          pointerEvents: 'none'
        }} />

        {/* Category badge */}
        {recipe.category && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.68rem',
            fontWeight: '700',
            color: '#0D9488',
            letterSpacing: '0.03em',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}>
            {recipe.category}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={e => { e.stopPropagation(); onFavorite(recipe.id); }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            border: 'none',
            background: recipe.isFavorite ? '#EF4444' : 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
          }}
        >
          <Heart
            size={15}
            fill={recipe.isFavorite ? 'white' : 'none'}
            color={recipe.isFavorite ? 'white' : '#EF4444'}
          />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '7px' }}>
          <Globe size={11} color="#94A3B8" />
          <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {recipe.country || 'International'}
          </span>
        </div>

        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '0.975rem',
          fontWeight: '700',
          color: '#0F172A',
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {recipe.name}
        </h3>

        <p style={{
          fontSize: '0.8rem',
          color: '#64748B',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: 'auto',
          flex: 1
        }}>
          {recipe.description?.substring(0, 110)}...
        </p>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: '12px'
          }}>
            {recipe.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={idx} style={{
                background: '#F1F5F9',
                color: '#0f172A',
                padding: '5px 9px',
                borderRadius: '20px',
                fontSize: '0.68rem',
                fontWeight: '600',
              }}
              >
                {typeof ing === 'string' ? ing : ing.name}
              </span>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '12px',
          fontSize: '0.75rem',
          paddingTop: '12px',
          marginTop: '12px',
          borderTop: '1px solid #F1F5F9',
          alignItems: 'center'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} color="#0D9488" />
            <span style={{ color: '#475569', fontWeight: '500' }}>45 min</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ChefHat size={13} color="#F59E0B" />
            <span style={{ color: '#475569', fontWeight: '500' }}>Medium</span>
          </span>
          {onDelete && (
            <button
              onClick={e => { e.stopPropagation(); onDelete(recipe.id); }}
              style={{
                marginLeft: 'auto',
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px',
                borderRadius: '6px', display: 'flex',
                alignItems: 'center', color: '#CBD5E1',
                transition: 'color 0.18s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
              onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

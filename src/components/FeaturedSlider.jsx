import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const FeaturedSlider = ({ recipes, onOpen }) => {
  const scrollRef = useRef(null);
  const featured = recipes.slice(0, 10);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-slider-card]');
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (!featured.length) return null;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Star size={17} fill="#F59E0B" color="#F59E0B" />
          <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>Featured Recipes</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <button
              key={i}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              style={{
                width: '32px', height: '32px',
                border: '1px solid #E2E8F0', borderRadius: '50%',
                background: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748B',
                transition: 'all 0.18s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#0D9488';
                e.currentTarget.style.borderColor = '#0D9488';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(13,148,136,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
              }}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="slider-scroll"
        style={{ display: 'flex', gap: '16px', paddingBottom: '4px' }}
      >
        {featured.map(recipe => (
          <div
            key={recipe.id}
            data-slider-card
            onClick={() => onOpen(recipe)}
            style={{
              flexShrink: 0,
              width: '250px',
              height: '158px',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.22s ease, box-shadow 0.22s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.035)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)'
            }} />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
              <div style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '0.63rem',
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px', fontWeight: '600'
              }}>
                {recipe.country}
              </div>
              <div style={{
                color: 'white', fontWeight: '700', fontSize: '0.875rem',
                lineHeight: 1.25,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {recipe.name}
              </div>
            </div>

            {/* Teal accent bar at bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #0D9488, #14B8A6)'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;

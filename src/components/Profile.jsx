import React, { useState } from 'react';
import { Edit3, Save, X, Heart, BookOpen, Globe, Camera, MapPin } from 'lucide-react';

const DEFAULT_PROFILE = {
  name: 'Chef User',
  username: '@chefuser',
  bio: 'Passionate about cooking and exploring world cuisines. Always looking for new flavors and techniques.',
  location: 'Kitchen Anywhere',
  initials: 'C'
};

const loadProfile = () => {
  try {
    const saved = localStorage.getItem('recipeMgrProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  } catch { return DEFAULT_PROFILE; }
};

const inputStyle = {
  width: '100%', padding: '10px 13px',
  border: '1px solid #E2E8F0', borderRadius: '10px',
  fontSize: '0.875rem', outline: 'none',
  color: '#1E293B', background: '#F8FAFC',
  fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'border 0.18s, box-shadow 0.18s'
};

const focusInput = (e) => {
  e.target.style.border = '1px solid #0D9488';
  e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.1)';
  e.target.style.background = 'white';
};
const blurInput = (e) => {
  e.target.style.border = '1px solid #E2E8F0';
  e.target.style.boxShadow = 'none';
  e.target.style.background = '#F8FAFC';
};

const FieldLabel = ({ children, required }) => (
  <label style={{
    display: 'block', fontSize: '0.7rem', fontWeight: '700',
    color: '#64748B', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.06em'
  }}>
    {children}{required && <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>}
  </label>
);

const Profile = ({ recipes }) => {
  const [profile, setProfile] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const favoritesCount = recipes.filter(r => r.isFavorite).length;
  const countries = [...new Set(recipes.map(r => r.country).filter(Boolean))];
  const favoriteRecipes = recipes.filter(r => r.isFavorite).slice(0, 6);

  const save = () => {
    const updated = {
      ...draft,
      initials: draft.name?.charAt(0)?.toUpperCase() || 'C'
    };
    setProfile(updated);
    localStorage.setItem('recipeMgrProfile', JSON.stringify(updated));
    setEditing(false);
  };

  const cancel = () => { setDraft(profile); setEditing(false); };

  const stats = [
    {
      label: 'Total Recipes', value: recipes.length,
      icon: BookOpen, color: '#0D9488', bg: '#CCFBF1',
      gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)'
    },
    {
      label: 'Favorites', value: favoritesCount,
      icon: Heart, color: '#EF4444', bg: '#FEE2E2',
      gradient: 'linear-gradient(135deg, #EF4444, #F87171)'
    },
    {
      label: 'Countries', value: countries.length,
      icon: Globe, color: '#F59E0B', bg: '#FEF3C7',
      gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '840px', margin: '0 auto' }}>

      {/* Profile card */}
      <div style={{
        background: 'white', borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid #F1F5F9', marginBottom: '20px'
      }}>
        {/* Cover gradient */}
        <div style={{
          height: '130px',
          background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 55%, #14B8A6 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)'
          }} />
        </div>

        {/* Avatar + info */}
        <div style={{ padding: '0 32px 28px', position: 'relative' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '18px'
          }}>
            {/* Avatar */}
            <div style={{
              width: '78px', height: '78px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
              border: '4px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '800', fontSize: '2rem', color: 'white',
              marginTop: '-39px',
              boxShadow: '0 6px 20px rgba(239,68,68,0.25)',
              position: 'relative', flexShrink: 0
            }}>
              {profile.initials}
              {editing && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <Camera size={16} color="white" />
                </div>
              )}
            </div>

            {/* Edit / Save buttons */}
            {editing ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={cancel} style={{
                  border: '1px solid #E2E8F0', background: 'white',
                  padding: '8px 16px', borderRadius: '9px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  color: '#64748B', fontSize: '0.825rem', fontWeight: '500'
                }}>
                  <X size={13} /> Cancel
                </button>
                <button onClick={save} style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
                  color: 'white', padding: '8px 18px', borderRadius: '9px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  gap: '5px', fontWeight: '700', fontSize: '0.825rem',
                  boxShadow: '0 4px 14px rgba(13,148,136,0.35)'
                }}>
                  <Save size={13} /> Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setDraft(profile); setEditing(true); }}
                style={{
                  border: '1px solid #E2E8F0', background: 'white',
                  padding: '8px 16px', borderRadius: '9px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: '#475569', fontSize: '0.825rem', fontWeight: '500',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'all 0.18s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
              >
                <Edit3 size={13} /> Edit Profile
              </button>
            )}
          </div>

          {/* Profile info or edit form */}
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <FieldLabel required>Display Name</FieldLabel>
                  <input
                    value={draft.name}
                    onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                    style={inputStyle}
                    placeholder="Your name"
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
                <div>
                  <FieldLabel>Username</FieldLabel>
                  <input
                    value={draft.username}
                    onChange={e => setDraft(d => ({ ...d, username: e.target.value }))}
                    style={inputStyle}
                    placeholder="@username"
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Location</FieldLabel>
                <input
                  value={draft.location}
                  onChange={e => setDraft(d => ({ ...d, location: e.target.value }))}
                  style={inputStyle}
                  placeholder="Your location"
                  onFocus={focusInput} onBlur={blurInput}
                />
              </div>
              <div>
                <FieldLabel>Bio</FieldLabel>
                <textarea
                  value={draft.bio}
                  onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
                  style={{ ...inputStyle, height: '85px', resize: 'vertical' }}
                  placeholder="Tell us about yourself..."
                  onFocus={focusInput} onBlur={blurInput}
                />
              </div>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', margin: '0 0 3px' }}>
                {profile.name}
              </h2>
              <div style={{ color: '#0D9488', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                {profile.username}
              </div>
              {profile.location && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  color: '#94A3B8', fontSize: '0.8rem', marginBottom: '10px'
                }}>
                  <MapPin size={12} /> {profile.location}
                </div>
              )}
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: '520px' }}>
                {profile.bio}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {stats.map(({ label, value, icon: Icon, color, bg, gradient }) => (
          <div key={label} style={{
            background: 'white', borderRadius: '16px', padding: '20px 22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'center', gap: '16px',
            overflow: 'hidden', position: 'relative'
          }}>
            <div style={{ background: bg, borderRadius: '14px', padding: '12px', flexShrink: 0, display: 'flex' }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{
                fontSize: '2rem', fontWeight: '800',
                color: '#0F172A', lineHeight: 1,
                marginBottom: '3px'
              }}>
                {value}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '500' }}>{label}</div>
            </div>
            {/* Decorative */}
            <div style={{
              position: 'absolute', right: '-12px', top: '-12px',
              width: '60px', height: '60px', borderRadius: '50%',
              background: bg, opacity: 0.5
            }} />
          </div>
        ))}
      </div>

      {/* Countries explored */}
      {countries.length > 0 && (
        <div style={{
          background: 'white', borderRadius: '16px', padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #F1F5F9', marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '0.95rem', fontWeight: '700', color: '#0F172A',
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '5px', display: 'flex' }}>
              <Globe size={15} color="#F59E0B" />
            </div>
            Cuisines Explored
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {countries.map(c => (
              <span key={c} style={{
                background: '#F8FAFC', border: '1px solid #E2E8F0',
                color: '#475569', padding: '5px 13px',
                borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500'
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Recipes */}
      {favoriteRecipes.length > 0 && (
        <div style={{
          background: 'white', borderRadius: '16px', padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #F1F5F9'
        }}>
          <h3 style={{
            fontSize: '0.95rem', fontWeight: '700', color: '#0F172A',
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <div style={{ background: '#FEE2E2', borderRadius: '8px', padding: '5px', display: 'flex' }}>
              <Heart size={15} fill="#EF4444" color="#EF4444" />
            </div>
            Pinned Favorites
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {favoriteRecipes.map(r => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#F8FAFC', borderRadius: '12px',
                padding: '8px 14px 8px 8px',
                border: '1px solid #F1F5F9',
                transition: 'border-color 0.18s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#E2E8F0'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#F1F5F9'}
              >
                <img
                  src={r.image} alt={r.name}
                  style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1E293B', lineHeight: 1.2 }}>{r.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{r.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Heart, User, ChevronLeft, ChevronRight, Utensils, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/',         icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/favorite', icon: Heart,           label: 'Favorites'  },
  { path: '/profile',  icon: User,            label: 'Profile'    },
];

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('recipeMgrProfile')) || {}; }
    catch { return {}; }
  })();
  const initials = profile.initials || profile.name?.charAt(0)?.toUpperCase() || 'C';
  const displayName = profile.name || 'Chef User';

  const navWidth = isMobile ? (mobileOpen ? '100vw' : '0px') : (collapsed ? '72px' : '230px');

  const sidebarContent = (
    <>
      {/* Logo */}
      <div style={{
        padding: collapsed && !isMobile ? '26px 0 20px' : '26px 20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
        flexShrink: 0
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(13,148,136,0.4)'
        }}>
          <Utensils size={18} color="white" />
        </div>
        {(!collapsed || isMobile) && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'white', lineHeight: 1.2 }}>Recipe</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#14B8A6', lineHeight: 1.2 }}>Manager</div>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{
            marginLeft: 'auto', background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex'
          }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <div style={{
        flex: 1,
        padding: collapsed && !isMobile ? '16px 8px' : '16px 12px',
        display: 'flex', flexDirection: 'column', gap: '4px',
        overflowY: 'auto'
      }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed && !isMobile ? '12px 0' : '11px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(13,148,136,0.4), rgba(20,184,166,0.2))'
                  : 'transparent',
                borderLeft: isActive ? '3px solid #14B8A6' : '3px solid transparent',
                fontWeight: isActive ? '600' : '400',
                fontSize: '0.875rem',
                transition: 'all 0.18s ease',
                justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }
              }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {(!collapsed || isMobile) && <span>{label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Profile section */}
      <div style={{
        padding: collapsed && !isMobile ? '14px 8px' : '14px 12px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0
      }}>
        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            padding: collapsed && !isMobile ? '8px 0' : '10px 12px',
            borderRadius: '10px',
            justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
            transition: 'background 0.18s',
            color: 'inherit'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '800', fontSize: '0.85rem', color: 'white',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
          }}>
            {initials}
          </div>
          {(!collapsed || isMobile) && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>View Profile</div>
            </div>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger trigger */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: 'fixed', top: '16px', left: '16px', zIndex: 100,
            background: '#0F172A', border: 'none', borderRadius: '10px',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}
        >
          <Menu size={18} color="white" />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 49, backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Sidebar */}
      <nav style={{
        width: navWidth,
        background: 'linear-gradient(180deg, #0F172A 0%, #111827 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        transition: isMobile ? 'none' : 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
        flexShrink: 0,
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 0 : 'auto',
        left: isMobile ? (mobileOpen ? 0 : '-100%') : 'auto',
        height: isMobile ? '100vh' : '100%',
        zIndex: isMobile ? 50 : 10,
        boxShadow: '4px 0 24px rgba(0,0,0,0.14)',
        overflow: 'hidden'
      }}>
        {sidebarContent}

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              position: 'absolute', top: '50%', right: '-12px',
              width: '24px', height: '24px',
              background: '#1E3A5F', border: '2px solid #2D4A6F',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white', zIndex: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              transform: 'translateY(-50%)'
            }}
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;

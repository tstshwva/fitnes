/**
 * Component: Header
 * Global Navigation Bar with official VITALIA logo, role-aware menu, active highlights, and profile preview.
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';
import {
  Home,
  BookOpen,
  Video,
  FileText,
  Activity,
  User,
  ClipboardList,
  Layers,
  Users,
  LogOut,
  LogIn,
  Radio,
  Sparkles
} from 'lucide-react';

export const Header = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: isActive(path) ? 700 : 500,
    color: isActive(path) ? '#15803d' : '#475569',
    background: isActive(path) ? '#f0fdf4' : 'transparent',
    transition: 'all 0.15s ease',
    textDecoration: 'none'
  });

  return (
    <header
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: '37px', // below dev switcher
        zIndex: 900,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {/* Brand with Official Vitalia Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img
            src={logoImg}
            alt="Vitalia"
            style={{
              height: '46px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '6px'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0c3822', letterSpacing: '0.04em', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
              VITALIA
            </div>
            <div style={{ fontSize: '10px', color: '#65a30d', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Educación &bull; Movimiento &bull; Bienestar
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {/* Public link */}
          <Link to="/" style={navLinkStyle('/')}>
            <Home size={15} /> Inicio
          </Link>

          {/* Student links */}
          {isAuthenticated && role === 'student' && (
            <>
              <Link to="/app/dashboard" style={navLinkStyle('/app/dashboard')}>
                <Home size={15} /> Mi Panel
              </Link>
              <Link to="/app/programa" style={navLinkStyle('/app/programa')}>
                <Layers size={15} /> Mi Programa
              </Link>
              <Link to="/app/clases" style={navLinkStyle('/app/clases')}>
                <Video size={15} /> Clases
              </Link>
              <Link to="/app/ejercicios" style={navLinkStyle('/app/ejercicios')}>
                <Activity size={15} /> Ejercicios
              </Link>
              <Link to="/app/biblioteca" style={navLinkStyle('/app/biblioteca')}>
                <FileText size={15} /> Recursos
              </Link>
              <Link to="/app/evaluacion" style={navLinkStyle('/app/evaluacion')}>
                <ClipboardList size={15} /> Evaluación
              </Link>
            </>
          )}

          {/* Instructor links */}
          {isAuthenticated && role === 'instructor' && (
            <>
              <Link to="/admin/dashboard" style={navLinkStyle('/admin/dashboard')}>
                <Home size={15} /> Panel Instructora
              </Link>
              <Link to="/admin/alumnos" style={navLinkStyle('/admin/alumnos')}>
                <Users size={15} /> Alumnos
              </Link>
              <Link to="/admin/programas" style={navLinkStyle('/admin/programas')}>
                <Layers size={15} /> Programas
              </Link>
              <Link to="/admin/clases" style={navLinkStyle('/admin/clases')}>
                <Video size={15} /> Clases
              </Link>
              <Link to="/admin/ejercicios" style={navLinkStyle('/admin/ejercicios')}>
                <Activity size={15} /> Ejercicios
              </Link>
            </>
          )}
        </nav>

        {/* User profile / Auth CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to={role === 'instructor' ? '/admin/dashboard' : '/app/perfil'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none'
                }}
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt={user?.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #16a34a' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
                    {user?.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '10px', color: role === 'instructor' ? '#7c3aed' : '#15803d', fontWeight: 700, textTransform: 'uppercase' }}>
                    {role === 'instructor' ? 'Instructora' : 'Alumno'}
                  </div>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                title="Cerrar sesión"
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#64748b',
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  textDecoration: 'none'
                }}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Inscribirme
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/**
 * Component: LayoutPlaceholder
 * Base structural shell for Phase 1 routing and navigation testing.
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DevRoleSwitcher } from './DevRoleSwitcher';
import {
  GraduationCap,
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
  LogIn
} from 'lucide-react';

export const LayoutPlaceholder = ({ children }) => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: isActive(path) ? 600 : 400,
    color: isActive(path) ? '#2563eb' : '#475569',
    background: isActive(path) ? '#eff6ff' : 'transparent',
    transition: 'all 0.15s ease'
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <DevRoleSwitcher />

      {/* Main Header / Navigation */}
      <header
        style={{
          borderBottom: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: '#2563eb',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '16px', margin: 0, fontWeight: 700, color: '#0f172a' }}>
              Programa de Educación y Formación Continua
            </h1>
            <p style={{ fontSize: '12px', margin: 0, color: '#64748b' }}>
              Instructora Yessi Lizama &bull; Cultura Física &amp; Salud
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {/* Public links */}
          <Link to="/" style={linkStyle('/')}>
            <Home size={16} /> Inicio
          </Link>

          {/* Student Links */}
          {isAuthenticated && role === 'student' && (
            <>
              <Link to="/app/dashboard" style={linkStyle('/app/dashboard')}>
                <Home size={16} /> Panel Alumno
              </Link>
              <Link to="/app/evaluacion" style={linkStyle('/app/evaluacion')}>
                <ClipboardList size={16} /> Evaluación
              </Link>
              <Link to="/app/programa" style={linkStyle('/app/programa')}>
                <Layers size={16} /> Mi Programa
              </Link>
              <Link to="/app/clases" style={linkStyle('/app/clases')}>
                <Video size={16} /> Clases
              </Link>
              <Link to="/app/biblioteca" style={linkStyle('/app/biblioteca')}>
                <FileText size={16} /> Recursos
              </Link>
              <Link to="/app/ejercicios" style={linkStyle('/app/ejercicios')}>
                <Activity size={16} /> Ejercicios
              </Link>
              <Link to="/app/perfil" style={linkStyle('/app/perfil')}>
                <User size={16} /> Perfil
              </Link>
            </>
          )}

          {/* Instructor Links */}
          {isAuthenticated && role === 'instructor' && (
            <>
              <Link to="/admin/dashboard" style={linkStyle('/admin/dashboard')}>
                <Home size={16} /> Panel Instructora
              </Link>
              <Link to="/admin/alumnos" style={linkStyle('/admin/alumnos')}>
                <Users size={16} /> Alumnos
              </Link>
              <Link to="/admin/programas" style={linkStyle('/admin/programas')}>
                <Layers size={16} /> Programas
              </Link>
              <Link to="/admin/clases" style={linkStyle('/admin/clases')}>
                <Video size={16} /> Clases
              </Link>
              <Link to="/admin/ejercicios" style={linkStyle('/admin/ejercicios')}>
                <Activity size={16} /> Ejercicios
              </Link>
            </>
          )}

          {/* Auth button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#ef4444',
                fontSize: '13px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              <LogOut size={15} /> Salir
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                background: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                marginLeft: '8px'
              }}
            >
              <LogIn size={15} /> Iniciar Sesión
            </Link>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1, background: '#f8fafc', padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#64748b'
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Programa de Educación y Formación Continua</strong> &bull; Yessi Lizama &bull; Estructura Base (Fase 1) &bull; Arquitectura desacoplada UI &rarr; Services &rarr; Mock/Supabase
        </p>
      </footer>
    </div>
  );
};

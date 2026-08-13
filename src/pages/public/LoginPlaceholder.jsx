/**
 * Page: LoginPlaceholder (Public)
 * Handles user login simulation via authService.
 */

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Key, Mail } from 'lucide-react';

export const LoginPlaceholder = () => {
  const [email, setEmail] = useState('carlos@ejemplo.com');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, allUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const user = await login(email);
      const destination = location.state?.from?.pathname || (user.role === 'instructor' ? '/admin/dashboard' : '/app/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (userEmail) => {
    setEmail(userEmail);
    setIsSubmitting(true);
    try {
      const user = await login(userEmail);
      const destination = user.role === 'instructor' ? '/admin/dashboard' : '/app/dashboard';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '40px auto', background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', margin: '0 0 8px 0', color: '#0f172a' }}>Iniciar Sesión</h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
          Accede al Programa de Educación y Formación Continua
        </p>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Correo Electrónico
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', background: '#f8fafc' }}>
            <Mail size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Contraseña (Simulada)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', background: '#f8fafc' }}>
            <Key size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input
              type="password"
              value="••••••••"
              disabled
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: '#94a3b8' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: '#2563eb',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '8px'
          }}
        >
          <LogIn size={16} /> {isSubmitting ? 'Verificando...' : 'Entrar'}
        </button>
      </form>

      {/* Quick Login for Prototype Testing */}
      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0', textAlign: 'center', fontWeight: 600 }}>
          Acceso Rápido Prototipo:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleQuickLogin(u.email)}
              style={{
                background: u.role === 'instructor' ? '#f5f3ff' : '#f0fdf4',
                color: u.role === 'instructor' ? '#6d28d9' : '#15803d',
                border: `1px solid ${u.role === 'instructor' ? '#ddd6fe' : '#bbf7d0'}`,
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span><strong>{u.name}</strong> ({u.email})</span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                {u.role === 'instructor' ? 'Instructora' : 'Alumno'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

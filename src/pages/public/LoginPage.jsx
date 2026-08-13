/**
 * Page: LoginPage (Public)
 * Modern split-screen login page with Vitalia brand logo and instant demo access.
 */

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';
import {
  LogIn,
  Mail,
  Key,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LoginPage = () => {
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        maxWidth: '1000px',
        margin: '20px auto',
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}
      className="animate-fade"
    >
      {/* Left Column: Brand & Philosophy */}
      <div
        style={{
          background: 'linear-gradient(135deg, #061e12 0%, #0d3822 50%, #14532d 100%)',
          color: '#ffffff',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <img
              src={logoImg}
              alt="Vitalia"
              style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ffffff', padding: '2px' }}
            />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                VITALIA
              </div>
              <div style={{ fontSize: '10px', color: '#bef264', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Educación &bull; Movimiento &bull; Bienestar
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '26px', color: '#ffffff', lineHeight: 1.25, margin: '0 0 16px 0' }}>
            El conocimiento transforma tu salud.
          </h2>

          <p style={{ fontSize: '14px', color: '#dcfce7', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Accede a tus clases magistrales, videoteca técnica, recursos prácticos y acompañamiento con Yessi Lizama.
          </p>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <p style={{ margin: 0, fontSize: '13px', color: '#f0fdf4', fontStyle: 'italic' }}>
              "El saber te da el poder para avanzar y cuidar tu salud con confianza."
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#86efac', marginTop: '24px' }}>
          VITALIA &bull; Plataforma Oficial de Formación Continua
        </div>
      </div>

      {/* Right Column: Login Form & Quick Access */}
      <div style={{ padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 6px 0', color: '#0f172a' }}>Iniciar Sesión</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Ingresa a tu cuenta de VITALIA o usa los accesos de prueba
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Correo Electrónico
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', background: '#f8fafc' }}>
              <Mail size={16} color="#64748b" style={{ marginRight: '10px' }} />
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
              Contraseña
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', background: '#f8fafc' }}>
              <Key size={16} color="#64748b" style={{ marginRight: '10px' }} />
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
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px', borderRadius: '8px' }}
          >
            <LogIn size={16} /> {isSubmitting ? 'Accediendo...' : 'Entrar a VITALIA'}
          </button>
        </form>

        {/* Quick Demo Login Buttons */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Sparkles size={14} color="#15803d" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Accesos Rápidos de Prueba (1 Clic)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allUsers.map((u) => {
              const isInstructor = u.role === 'instructor';
              return (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u.email)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${isInstructor ? '#ddd6fe' : '#bbf7d0'}`,
                    background: isInstructor ? '#f5f3ff' : '#f0fdf4',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isInstructor ? <ShieldCheck size={16} color="#7c3aed" /> : <UserCheck size={16} color="#15803d" />}
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isInstructor ? '#5b21b6' : '#14532d' }}>
                      {u.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isInstructor ? '#ede9fe' : '#dcfce7',
                      color: isInstructor ? '#6d28d9' : '#15803d'
                    }}
                  >
                    {isInstructor ? 'Instructora' : 'Alumno'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          ¿Aún no te has registrado?{' '}
          <Link to="/register" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'none' }}>
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

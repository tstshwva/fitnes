/**
 * Page: RegisterPage (Public)
 * Modern registration page with MOVARA brand identity.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UserPlus,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    bio: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const newUser = await register(formData);
      navigate(newUser.role === 'instructor' ? '/admin/dashboard' : '/app/evaluacion');
    } catch (err) {
      setError(err.message || 'Error al registrar la cuenta');
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
      {/* Left Column: MOVARA Brand & Info */}
      <div
        className="animate-slide-left"
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
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#ffffff',
                color: '#0c3822',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '20px',
                fontFamily: 'var(--font-heading)'
              }}
            >
              M
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                MOVARA
              </div>
              <div style={{ fontSize: '10px', color: '#bef264', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Educación &bull; Movimiento &bull; Bienestar
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '26px', color: '#ffffff', lineHeight: 1.25, margin: '0 0 16px 0' }}>
            Inicia tu formación consciente en MOVARA.
          </h2>

          <p style={{ fontSize: '14px', color: '#dcfce7', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Al crear tu cuenta tendrás acceso a los programas estructurados, evaluación de hábitos, clases en vivo y biblioteca de ejercicios.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Diagnóstico inicial de hábitos y objetivos',
              'Clases magistrales grabadas y en directo',
              'Biblioteca pedagógica de técnica y biomecánica',
              'Comunidad guiada por la instructora Yessi Lizama'
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#f0fdf4' }}>
                <CheckCircle2 size={16} color="#4ade80" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#86efac', marginTop: '24px' }}>
          MOVARA &bull; Registro de Alumnos
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="animate-slide-right" style={{ padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 6px 0', color: '#0f172a' }}>Crear Cuenta</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Ingresa tus datos para comenzar tu formación
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Nombre y Apellidos
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', background: '#f8fafc' }}>
              <User size={16} color="#64748b" style={{ marginRight: '10px' }} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Sofía Hernández"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Correo Electrónico
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', background: '#f8fafc' }}>
              <Mail size={16} color="#64748b" style={{ marginRight: '10px' }} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sofia@ejemplo.com"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Rol de Usuario
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
            >
              <option value="student">Alumno / Estudiante</option>
              <option value="instructor">Instructora / Administradora</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              ¿Qué esperas aprender en MOVARA? (Opcional)
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Ej. Quiero aprender a hacer ejercicio correctamente sin lesionarme..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px', borderRadius: '8px' }}
          >
            <UserPlus size={16} /> {isSubmitting ? 'Registrando...' : 'Completar Registro'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'none' }}>
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

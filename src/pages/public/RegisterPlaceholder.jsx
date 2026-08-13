/**
 * Page: RegisterPlaceholder (Public)
 * Handles new user registration simulation via authService.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Mail, User, Shield } from 'lucide-react';

export const RegisterPlaceholder = () => {
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
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', margin: '0 0 8px 0', color: '#0f172a' }}>Registro de Nuevo Usuario</h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
          Únete a la plataforma de Educación y Formación Continua
        </p>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Nombre Completo
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', background: '#f8fafc' }}>
            <User size={16} color="#64748b" style={{ marginRight: '8px' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', background: '#f8fafc' }}>
            <Mail size={16} color="#64748b" style={{ marginRight: '8px' }} />
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
            Tipo de Rol
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          >
            <option value="student">Alumno / Estudiante</option>
            <option value="instructor">Instructora / Administradora</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Breve Biografía o Motivación (Opcional)
          </label>
          <textarea
            rows={2}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="¿Qué esperas aprender en el programa?"
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
          />
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
          <UserPlus size={16} /> {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

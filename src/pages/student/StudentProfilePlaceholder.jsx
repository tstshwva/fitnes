/**
 * Page: StudentProfilePlaceholder (Student)
 * User profile view and update.
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { User, Mail, FileText, Check } from 'lucide-react';

export const StudentProfilePlaceholder = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    await authService.updateProfile(user.id, formData);
    await refreshUser();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
          alt={user?.name}
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h2 style={{ fontSize: '20px', margin: 0, color: '#0f172a' }}>{user?.name}</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{user?.email} &bull; Rol: {user?.role}</span>
        </div>
      </div>

      {success && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Check size={16} /> Perfil actualizado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Nombre Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Teléfono de Contacto
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+52 55..."
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Biografía o Metas Personales
          </label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: '#2563eb',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

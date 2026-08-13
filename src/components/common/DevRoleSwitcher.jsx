/**
 * Component: DevRoleSwitcher
 * Floating prototype toolbar to quickly switch between roles (Instructor vs Students)
 * and test permissions, enrollments, and progress without manual logins.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockClient } from '../../services/api/mockClient';
import { Users, RotateCcw, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

export const DevRoleSwitcher = () => {
  const { user, role, allUsers, switchDevUser, refreshUser } = useAuth();

  const handleResetData = async () => {
    if (window.confirm('¿Deseas reiniciar los datos de demostración a su estado inicial?')) {
      await mockClient.resetAll();
      await refreshUser();
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#f8fafc',
        padding: '8px 20px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            padding: '3px 8px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#a5b4fc'
          }}
        >
          <Sparkles size={12} /> PROTOTIPO INTERACTIVO
        </div>
        <span style={{ color: '#94a3b8' }}>
          Sesión actual:{' '}
          <strong style={{ color: role === 'instructor' ? '#c084fc' : '#4ade80' }}>
            {user ? `${user.name} (${user.role === 'instructor' ? 'Instructora' : 'Alumno'})` : 'Sin sesión'}
          </strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ color: '#64748b', fontSize: '11px', marginRight: '4px' }}>Cambiar a:</span>
        {allUsers.map((u) => {
          const isActive = user?.id === u.id;
          const isInstructor = u.role === 'instructor';
          return (
            <button
              key={u.id}
              onClick={() => switchDevUser(u.id)}
              style={{
                background: isActive
                  ? isInstructor
                    ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                    : 'linear-gradient(135deg, #059669, #047857)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              {isInstructor ? <ShieldCheck size={12} color="#ddd6fe" /> : <UserCheck size={12} color="#bbf7d0" />}
              {u.name.split(' ')[0]}
            </button>
          );
        })}

        <button
          onClick={handleResetData}
          title="Reiniciar datos de prueba a valores iniciales"
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '6px'
          }}
        >
          <RotateCcw size={11} /> Reset DB
        </button>
      </div>
    </div>
  );
};

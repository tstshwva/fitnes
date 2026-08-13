/**
 * Page: StudentProfilePage (Student - Phase 3)
 * Student Profile & Diagnostic Overview.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { evaluationService } from '../../services/evaluationService';
import { enrollmentService } from '../../services/enrollmentService';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  ClipboardCheck,
  CheckCircle2,
  Check,
  Award,
  Layers
} from 'lucide-react';

export const StudentProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });
  const [evaluation, setEvaluation] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || '',
      bio: user.bio || '',
      phone: user.phone || ''
    });

    const loadProfileData = async () => {
      try {
        const [evalData, enrs] = await Promise.all([
          evaluationService.getByStudentId(user.id),
          enrollmentService.getByStudentId(user.id)
        ]);
        setEvaluation(evalData);
        setEnrollments(enrs);
      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    await authService.updateProfile(user.id, formData);
    await refreshUser();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando información de tu perfil...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Profile Header */}
      <div
        className="card-premium"
        style={{
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
      >
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
          alt={user?.name}
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
        />
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '24px', color: '#0f172a', margin: 0 }}>{user?.name}</h2>
            <span className="badge-pill badge-green" style={{ textTransform: 'uppercase' }}>
              Alumno Activo
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {user?.email} &bull; Miembro desde {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Edit Profile Form + Diagnostic Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Edit Info */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 16px 0' }}>Datos Personales</h3>

          {success && (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Check size={16} /> Datos de perfil actualizados.
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
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Teléfono
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+52 55..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Motivación o Metas Personales
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Escribe tus objetivos..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '8px', alignSelf: 'flex-start' }}
            >
              Guardar Cambios
            </button>
          </form>
        </div>

        {/* Right: Diagnostic & Enrollments Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Diagnostic Card */}
          <div className="card-premium" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '17px', color: '#0f172a', margin: 0 }}>Tu Diagnóstico Inicial</h3>
              {evaluation && (
                <span className="badge-pill badge-purple">
                  Nivel: {evaluation.currentLevel}
                </span>
              )}
            </div>

            {evaluation ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
                <div><strong>Experiencia:</strong> {evaluation.exerciseExperience}</div>
                <div><strong>Frecuencia habitual:</strong> {evaluation.activityFrequency} días/semana</div>
                <div><strong>Calidad de descanso:</strong> {evaluation.restHabits}</div>
                <div><strong>Disponibilidad semanal:</strong> {evaluation.weeklyAvailability}</div>
                {evaluation.notes && (
                  <div style={{ marginTop: '8px', fontStyle: 'italic', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px' }}>
                    "{evaluation.notes}"
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                No has completado tu evaluación inicial.
              </p>
            )}
          </div>

          {/* Enrolled Programs */}
          <div className="card-premium" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 14px 0' }}>Programas Matriculados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {enrollments.map((enr) => (
                <div
                  key={enr.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h5 style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#0f172a' }}>
                      {enr.program?.title || 'Programa Formatvo'}
                    </h5>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Inicio: {new Date(enr.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="badge-pill badge-green" style={{ fontSize: '11px' }}>
                    {enr.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

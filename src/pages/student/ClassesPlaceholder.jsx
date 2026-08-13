/**
 * Page: ClassesPlaceholder (Student)
 * Lists all live and recorded classes with filters and video/session player details.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { progressService } from '../../services/progressService';
import { Video, Calendar, Clock, CheckCircle2, Play, Radio } from 'lucide-react';

export const ClassesPlaceholder = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'live' | 'recorded'
  const [userProgress, setUserProgress] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user) return;
    try {
      const [allCls, progList] = await Promise.all([
        classService.getAllClasses(),
        progressService.getProgressByStudent(user.id)
      ]);
      setClasses(allCls);
      setUserProgress(progList);
      if (allCls.length > 0 && !selectedClass) {
        setSelectedClass(allCls[0]);
      }
    } catch (err) {
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleToggleComplete = async (cls) => {
    if (!user) return;
    await progressService.toggleClassCompleted(user.id, cls.id, cls.programId);
    const updated = await progressService.getProgressByStudent(user.id);
    setUserProgress(updated);
  };

  const isCompleted = (classId) => {
    return userProgress.some((p) => p.classId === classId && p.completed);
  };

  const filteredClasses = classes.filter((c) => {
    if (filter === 'all') return true;
    return c.type === filter;
  });

  if (loading) return <div style={{ padding: '24px' }}>Cargando clases...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>Clases del Programa</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Sesiones en directo y lecciones grabadas para tu formación continua.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: '#e2e8f0', padding: '4px', borderRadius: '8px' }}>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'recorded', label: 'Grabadas' },
            { id: 'live', label: 'En Vivo' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? '#ffffff' : 'transparent',
                color: filter === f.id ? '#0f172a' : '#64748b',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: filter === f.id ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Player / Details + Class List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Selected Class Player / Info */}
        {selectedClass && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  background: selectedClass.type === 'live' ? '#f5f3ff' : '#eff6ff',
                  color: selectedClass.type === 'live' ? '#7c3aed' : '#2563eb',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {selectedClass.type === 'live' ? <Radio size={14} /> : <Video size={14} />}
                {selectedClass.type === 'live' ? 'Sesión en Vivo' : 'Clase Grabada'}
              </span>

              <button
                onClick={() => handleToggleComplete(selectedClass)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isCompleted(selectedClass.id) ? '#dcfce7' : '#f1f5f9',
                  color: isCompleted(selectedClass.id) ? '#15803d' : '#475569',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <CheckCircle2 size={15} />
                {isCompleted(selectedClass.id) ? 'Completada' : 'Marcar Completada'}
              </button>
            </div>

            <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#0f172a' }}>{selectedClass.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {selectedClass.description}
            </p>

            {/* Video simulation or Live call CTA */}
            {selectedClass.type === 'live' ? (
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
                <Calendar size={32} color="#8b5cf6" style={{ marginBottom: '8px' }} />
                <h4 style={{ margin: '0 0 6px 0', color: '#581c87' }}>Sesión Programada en Directo</h4>
                <p style={{ fontSize: '13px', color: '#6b21a8', margin: '0 0 16px 0' }}>
                  Fecha: {selectedClass.date ? new Date(selectedClass.date).toLocaleString() : 'Próximamente'}
                </p>
                <a
                  href={selectedClass.liveLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#8b5cf6',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    display: 'inline-block'
                  }}
                >
                  Abrir Enlace de Transmisión
                </a>
              </div>
            ) : (
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '20px', color: '#ffffff', textAlign: 'center', minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={40} color="#60a5fa" style={{ marginBottom: '8px', cursor: 'pointer' }} />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Reproductor de Video Pedagogía (Fase 1 Mock)</span>
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Duración: {selectedClass.durationMinutes} minutos</span>
              </div>
            )}

            {/* Key takeaways */}
            {selectedClass.keyTakeaways?.length > 0 && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#1e293b' }}>Puntos Clave del Conocimiento:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  {selectedClass.keyTakeaways.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Right: Class List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '16px', margin: 0, color: '#334155' }}>
            Lista de Lecciones ({filteredClasses.length})
          </h3>
          {filteredClasses.map((cls) => {
            const active = selectedClass?.id === cls.id;
            const completed = isCompleted(cls.id);

            return (
              <div
                key={cls.id}
                onClick={() => setSelectedClass(cls)}
                style={{
                  background: active ? '#eff6ff' : '#ffffff',
                  border: `1px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
                  padding: '14px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: cls.type === 'live' ? '#7c3aed' : '#2563eb' }}>
                      {cls.type === 'live' ? 'En Vivo' : 'Grabada'}
                    </span>
                    &bull;
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{cls.durationMinutes} min</span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>{cls.title}</h4>
                </div>

                {completed && <CheckCircle2 size={18} color="#16a34a" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

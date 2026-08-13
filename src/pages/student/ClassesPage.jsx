/**
 * Page: ClassesPage (Student - Phase 3)
 * Full-featured video player, live stream hub, takeaways tabs, and class selector.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { progressService } from '../../services/progressService';
import {
  Video,
  Play,
  CheckCircle2,
  Calendar,
  Clock,
  Radio,
  FileText,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const ClassesPage = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'live' | 'recorded'
  const [selectedClass, setSelectedClass] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [activeTab, setActiveTab] = useState('takeaways'); // 'takeaways' | 'notes'
  const [studentNote, setStudentNote] = useState('');
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);
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
    if (!user || !cls) return;
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

  const handleSaveNote = () => {
    if (selectedClass && typeof window !== 'undefined') {
      localStorage.setItem(`yessi_class_note_${selectedClass.id}_${user?.id}`, studentNote);
      setSavedNoteSuccess(true);
      setTimeout(() => setSavedNoteSuccess(false), 2500);
    }
  };

  useEffect(() => {
    if (selectedClass && user && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`yessi_class_note_${selectedClass.id}_${user.id}`);
      setStudentNote(saved || '');
    }
  }, [selectedClass, user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando catálogo de clases...</p>
      </div>
    );
  }

  const completedCurrent = selectedClass ? isCompleted(selectedClass.id) : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      {/* Header & Filter Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0' }}>
            Aula Virtual y Clases Magistrales
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Visualiza tus clases grabadas y únete a las transmisiones en vivo con Yessi Lizama.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
          {[
            { id: 'all', label: 'Todas las Clases' },
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
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: filter === f.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid: Player & Side Playlist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(300px, 1.2fr)', gap: '24px' }}>
        {/* Left Column: Active Class / Video Player */}
        {selectedClass ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Player Container */}
            <div
              style={{
                background: '#090d16',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                border: '1px solid #1e293b'
              }}
            >
              {selectedClass.type === 'live' ? (
                /* LIVE SESSION VIEW */
                <div
                  style={{
                    padding: '48px 24px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #3b0764 100%)',
                    color: '#ffffff'
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fca5a5',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      marginBottom: '16px'
                    }}
                  >
                    <Radio size={14} className="pulse-indicator" /> SALA EN VIVO PROGRAMADA
                  </div>

                  <h3 style={{ fontSize: '22px', margin: '0 0 8px 0', color: '#ffffff' }}>
                    {selectedClass.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#e9d5ff', maxWidth: '500px', margin: '0 auto 20px auto' }}>
                    Sesión interactiva en directo de análisis y retroalimentación pedagógica.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '13px', color: '#cbd5e1', marginBottom: '24px' }}>
                    <span>📅 {selectedClass.date ? new Date(selectedClass.date).toLocaleDateString() : 'Próximamente'}</span>
                    <span>⏱️ {selectedClass.durationMinutes} minutos</span>
                  </div>

                  <a
                    href={selectedClass.liveLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{
                      padding: '12px 24px',
                      fontSize: '14px',
                      background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    <Video size={16} /> Entrar a la Transmisión (Zoom / Meet) <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                /* RECORDED VIDEO PLAYER */
                <div>
                  <video
                    controls
                    poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&auto=format&fit=crop&q=80"
                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '420px', background: '#000000' }}
                    src={selectedClass.videoUrl}
                  >
                    Tu navegador no soporta el reproductor de video.
                  </video>
                </div>
              )}
            </div>

            {/* Class Info & Actions Card */}
            <div className="card-premium" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <span
                    style={{
                      background: selectedClass.type === 'live' ? '#ede9fe' : '#eff6ff',
                      color: selectedClass.type === 'live' ? '#7c3aed' : '#2563eb',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    {selectedClass.type === 'live' ? 'En Vivo' : 'Clase Grabada'} &bull; {selectedClass.durationMinutes} min
                  </span>
                  <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '8px 0 4px 0' }}>
                    {selectedClass.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    {selectedClass.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleComplete(selectedClass)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: completedCurrent ? '#dcfce7' : '#f1f5f9',
                    color: completedCurrent ? '#15803d' : '#334155',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <CheckCircle2 size={18} color={completedCurrent ? '#16a34a' : '#94a3b8'} />
                  {completedCurrent ? 'Lección Completada' : 'Marcar como Vista'}
                </button>
              </div>

              {/* Tabs for takeaways and student notes */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
                  <button
                    onClick={() => setActiveTab('takeaways')}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === 'takeaways' ? '2px solid #2563eb' : '2px solid transparent',
                      padding: '8px 4px',
                      fontSize: '13px',
                      fontWeight: activeTab === 'takeaways' ? 700 : 500,
                      color: activeTab === 'takeaways' ? '#2563eb' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    Puntos Clave del Conocimiento
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === 'notes' ? '2px solid #2563eb' : '2px solid transparent',
                      padding: '8px 4px',
                      fontSize: '13px',
                      fontWeight: activeTab === 'notes' ? 700 : 500,
                      color: activeTab === 'notes' ? '#2563eb' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    Mis Apuntes Personales
                  </button>
                </div>

                {activeTab === 'takeaways' && (
                  <div>
                    {selectedClass.keyTakeaways?.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                        {selectedClass.keyTakeaways.map((point, idx) => (
                          <li key={idx}>
                            <strong>{point}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                        No hay puntos clave registrados para esta sesión.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <textarea
                      rows={3}
                      value={studentNote}
                      onChange={(e) => setStudentNote(e.target.value)}
                      placeholder="Escribe aquí tus reflexiones, preguntas o sensaciones durante esta lección..."
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
                        {savedNoteSuccess ? '✓ Apunte guardado' : ''}
                      </span>
                      <button
                        onClick={handleSaveNote}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '6px' }}
                      >
                        Guardar Apuntes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-premium" style={{ padding: '40px', textAlign: 'center' }}>
            <p>Selecciona una clase de la lista para comenzar.</p>
          </div>
        )}

        {/* Right Column: Class Playlist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '15px', color: '#0f172a', margin: 0 }}>
              Lecciones Disponibles ({filteredClasses.length})
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '680px', overflowY: 'auto' }}>
            {filteredClasses.map((cls, idx) => {
              const active = selectedClass?.id === cls.id;
              const done = isCompleted(cls.id);

              return (
                <div
                  key={cls.id}
                  onClick={() => setSelectedClass(cls)}
                  className="card-premium"
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    background: active ? '#eff6ff' : '#ffffff',
                    border: `1.5px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: active ? '#2563eb' : '#f1f5f9',
                        color: active ? '#fff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: cls.type === 'live' ? '#7c3aed' : '#2563eb' }}>
                          {cls.type === 'live' ? 'En Vivo' : 'Grabada'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>&bull; {cls.durationMinutes} min</span>
                      </div>
                      <h5 style={{ margin: 0, fontSize: '13px', color: '#0f172a', fontWeight: active ? 700 : 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cls.title}
                      </h5>
                    </div>
                  </div>

                  {done && <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

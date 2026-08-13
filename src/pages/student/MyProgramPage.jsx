/**
 * Page: MyProgramPage (Student - Phase 3)
 * Interactive curriculum syllabus with collapsible module cards, completion checkboxes, and quick lesson launches.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { programService } from '../../services/programService';
import { progressService } from '../../services/progressService';
import {
  Layers,
  CheckCircle2,
  Circle,
  Video,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Radio,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';

export const MyProgramPage = () => {
  const { user } = useAuth();
  const [programData, setProgramData] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user) return;
    try {
      const enrollments = await enrollmentService.getByStudentId(user.id);
      const activeEnr = enrollments.find((e) => e.status === 'active') || enrollments[0];

      if (activeEnr) {
        const [fullProgram, progList] = await Promise.all([
          programService.getProgramWithCurriculum(activeEnr.programId),
          progressService.getProgressByStudent(user.id)
        ]);
        setProgramData(fullProgram);
        setUserProgress(progList);

        // Expand all modules by default
        if (fullProgram?.modules) {
          const initialExpanded = {};
          fullProgram.modules.forEach((m) => {
            initialExpanded[m.id] = true;
          });
          setExpandedModules(initialExpanded);
        }
      }
    } catch (err) {
      console.error('Error loading program:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleToggleClass = async (classId) => {
    if (!user || !programData) return;
    await progressService.toggleClassCompleted(user.id, classId, programData.id);
    const updated = await progressService.getProgressByStudent(user.id);
    setUserProgress(updated);
  };

  const isClassCompleted = (classId) => {
    return userProgress.some((p) => p.classId === classId && p.completed);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando temario del programa...</p>
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="card-premium" style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
        <BookOpen size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 8px 0' }}>No tienes ningún programa inscrito</h3>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0' }}>
          Realiza tu evaluación inicial para que el sistema te asigne el programa ideal.
        </p>
        <Link to="/app/evaluacion" className="btn-primary">
          Ir a Evaluación Inicial
        </Link>
      </div>
    );
  }

  // Calculate stats
  let totalClasses = 0;
  let completedClasses = 0;
  programData.modules?.forEach((mod) => {
    mod.classes?.forEach((cls) => {
      totalClasses++;
      if (isClassCompleted(cls.id)) completedClasses++;
    });
  });
  const percentage = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* 1. PROGRAM HERO BANNER */}
      <div
        className="card-premium"
        style={{
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
      >
        <div style={{ borderRadius: '14px', overflow: 'hidden', height: '200px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
          <img
            src={programData.coverImage}
            alt={programData.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge-pill badge-blue">
              {programData.badge}
            </span>
            <span className="badge-pill badge-green">
              Nivel: {programData.level}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
              &bull; {programData.durationWeeks} Semanas de formación
            </span>
          </div>

          <h2 style={{ fontSize: '24px', color: '#0f172a', margin: 0, lineHeight: 1.25 }}>
            {programData.title}
          </h2>

          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            {programData.description}
          </p>

          {/* Progress row */}
          <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              <span>Tu Progreso General</span>
              <span style={{ color: '#059669' }}>{percentage}% ({completedClasses}/{totalClasses} clases)</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  borderRadius: '999px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODULES & LESSONS LIST */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
            Plan de Estudios y Módulos Temáticos ({programData.modules?.length || 0})
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {programData.modules?.map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id] ?? true;
            const moduleClasses = mod.classes || [];
            const moduleCompletedCount = moduleClasses.filter((c) => isClassCompleted(c.id)).length;
            const moduleAllDone = moduleClasses.length > 0 && moduleCompletedCount === moduleClasses.length;

            return (
              <div
                key={mod.id}
                className="card-premium"
                style={{
                  overflow: 'hidden',
                  border: `1.5px solid ${moduleAllDone ? '#bbf7d0' : '#e2e8f0'}`
                }}
              >
                {/* Module Header / Accordion trigger */}
                <div
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    padding: '20px 24px',
                    background: moduleAllDone ? '#f0fdf4' : '#f8fafc',
                    borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: moduleAllDone ? '#dcfce7' : '#eff6ff',
                        color: moduleAllDone ? '#16a34a' : '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}
                    >
                      {modIdx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', color: '#0f172a', margin: '0 0 2px 0' }}>
                        {mod.title}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: moduleAllDone ? '#16a34a' : '#64748b' }}>
                      {moduleCompletedCount}/{moduleClasses.length} completadas
                    </span>
                    {isExpanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                  </div>
                </div>

                {/* Module Content */}
                {isExpanded && (
                  <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {moduleClasses.map((cls) => {
                      const completed = isClassCompleted(cls.id);
                      return (
                        <div
                          key={cls.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: completed ? '#f0fdf4' : '#ffffff',
                            border: `1px solid ${completed ? '#bbf7d0' : '#e2e8f0'}`,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                              type="button"
                              onClick={() => handleToggleClass(cls.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                              title={completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                            >
                              {completed ? <CheckCircle2 size={22} color="#16a34a" /> : <Circle size={22} color="#cbd5e1" />}
                            </button>

                            <div>
                              <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                                {cls.title}
                              </h5>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '12px', color: '#64748b' }}>
                                {cls.type === 'live' ? (
                                  <span style={{ color: '#7c3aed', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <Radio size={12} /> Sesión en Vivo
                                  </span>
                                ) : (
                                  <span style={{ color: '#2563eb', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <Video size={12} /> Clase Grabada
                                  </span>
                                )}
                                &bull;
                                <span><Clock size={12} style={{ verticalAlign: 'middle' }} /> {cls.durationMinutes} min</span>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/app/clases"
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}
                          >
                            <PlayCircle size={14} color="#2563eb" /> Abrir Lección
                          </Link>
                        </div>
                      );
                    })}

                    {/* Resources section inside Module */}
                    {mod.resources?.length > 0 && (
                      <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px dashed #e2e8f0' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Material Complementario:
                        </span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                          {mod.resources.map((res) => (
                            <a
                              key={res.id}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: '#1e293b',
                                fontWeight: 600,
                                textDecoration: 'none'
                              }}
                            >
                              <FileText size={14} color="#2563eb" /> {res.title} ({res.fileSize})
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

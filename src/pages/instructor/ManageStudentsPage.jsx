/**
 * Page: ManageStudentsPage (Instructor - Phase 4)
 * Supervision and diagnostic evaluation tracking for enrolled students in MOVARA.
 */

import React, { useEffect, useState } from 'react';
import { enrollmentService } from '../../services/enrollmentService';
import { evaluationService } from '../../services/evaluationService';
import { progressService } from '../../services/progressService';
import { programService } from '../../services/programService';
import {
  Users,
  Search,
  ClipboardCheck,
  Award,
  BookOpen,
  Filter,
  CheckCircle2,
  Calendar,
  Eye,
  X,
  Layers,
  Phone,
  Mail,
  HeartPulse,
  Moon
} from 'lucide-react';

export const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedEval, setSelectedEval] = useState(null);
  const [studentProgress, setStudentProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allStudents, allEvals, allProgs] = await Promise.all([
        enrollmentService.getAllStudents(),
        evaluationService.getAll(),
        programService.getPrograms()
      ]);

      // Enrich student objects with their enrollments and evaluations
      const enriched = await Promise.all(
        allStudents.map(async (st) => {
          const enrs = await enrollmentService.getByStudentId(st.id);
          const ev = allEvals.find((e) => e.studentId === st.id);
          let progSummary = null;
          if (enrs.length > 0) {
            progSummary = await progressService.getProgramProgressSummary(st.id, enrs[0].programId);
          }
          return {
            ...st,
            enrollment: enrs[0] || null,
            evaluation: ev || null,
            progress: progSummary
          };
        })
      );

      setStudents(enriched);
      setEvaluations(allEvals);
      setPrograms(allProgs);
    } catch (err) {
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setSelectedEval(student.evaluation);
    setStudentProgress(student.progress);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setSelectedEval(null);
    setStudentProgress(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Header Bar */}
      <div
        className="card-premium animate-fade-up stagger-1"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, #0c3822 0%, #14532d 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#bef264', letterSpacing: '0.05em' }}>
            Supervisión Pedagógica
          </span>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', color: '#ffffff' }}>
            Gestión y Diagnóstico de Alumnos
          </h2>
          <p style={{ fontSize: '13px', color: '#dcfce7', margin: '6px 0 0 0' }}>
            Monitorea el avance, evaluaciones de hábitos y programas activos de tus alumnos.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Users size={18} color="#84cc16" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
            {students.length} Alumnos Registrados
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-premium animate-fade-up stagger-2" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Search size={18} color="#64748b" />
        <input
          type="text"
          placeholder="Buscar alumno por nombre o correo electrónico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
        />
      </div>

      {/* Students Table / Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '8px' }}>🌿</div>
          <p>Cargando información de alumnos...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="card-premium" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <p>No se encontraron alumnos que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredStudents.map((st, idx) => {
            const percentage = st.progress?.percentage || 0;
            return (
              <div
                key={st.id}
                className={`card-premium animate-fade-up stagger-${(idx % 6) + 1}`}
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Top info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img
                      src={st.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={st.name}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #16a34a' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '16px', color: '#0f172a' }}>{st.name}</h4>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{st.email}</span>
                    </div>
                  </div>

                  {/* Program & Level */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>Programa:</span>
                      <strong style={{ color: '#0f172a' }}>{st.enrollment?.program?.title || 'No asignado'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>Nivel Diagnóstico:</span>
                      <span className="badge-pill badge-green" style={{ fontSize: '10px' }}>
                        {st.evaluation?.currentLevel || 'Pendiente'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span style={{ color: '#64748b' }}>Progreso de clases</span>
                      <strong style={{ color: '#15803d' }}>{percentage}%</strong>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #65a30d, #15803d)',
                          borderRadius: '999px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal View Button */}
                <button
                  onClick={() => openStudentModal(st)}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '8px 14px', fontSize: '13px', borderRadius: '8px' }}
                >
                  <Eye size={15} /> Ver Ficha y Diagnóstico
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Student Detailed Profile & Evaluation */}
      {selectedStudent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div
            className="card-premium animate-scale-in"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              background: '#ffffff',
              borderRadius: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={selectedStudent.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt={selectedStudent.name}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #16a34a' }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>{selectedStudent.name}</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedStudent.email} &bull; {selectedStudent.phone || 'Sin teléfono'}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Diagnostic Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h4 style={{ fontSize: '15px', color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ClipboardCheck size={18} color="#15803d" /> Evaluación Diagnóstica de Hábitos
                </h4>

                {selectedEval ? (
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Nivel Sugerido</span>
                      <strong style={{ color: '#15803d', fontSize: '14px' }}>{selectedEval.currentLevel}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Experiencia</span>
                      <strong style={{ color: '#0f172a' }}>{selectedEval.exerciseExperience}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Frecuencia Semanal</span>
                      <strong style={{ color: '#0f172a' }}>{selectedEval.activityFrequency} días por semana</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Descanso &amp; Sueño</span>
                      <strong style={{ color: '#0f172a' }}>{selectedEval.restHabits}</strong>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Objetivos Prioritarios</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedEval.goals?.map((g, i) => (
                          <span key={i} className="badge-pill badge-vitalia" style={{ fontSize: '11px' }}>
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedEval.notes && (
                      <div style={{ gridColumn: '1 / -1', background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                        <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Comentarios del Alumno:</span>
                        <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#334155' }}>"{selectedEval.notes}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: '#64748b', fontSize: '13px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                    Este alumno aún no ha completado el formulario de diagnóstico inicial.
                  </p>
                )}
              </div>

              {/* Program & Progress */}
              <div>
                <h4 style={{ fontSize: '15px', color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={18} color="#15803d" /> Estado en MOVARA
                </h4>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Programa Asignado:</span>
                    <strong>{selectedStudent.enrollment?.program?.title || 'Ninguno'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Fecha de Inscripción:</span>
                    <span>{new Date(selectedStudent.enrollment?.startDate || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Lecciones Completadas:</span>
                    <strong style={{ color: '#15803d' }}>
                      {studentProgress?.completedClasses || 0} de {studentProgress?.totalClasses || 0} ({studentProgress?.percentage || 0}%)
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button onClick={closeModal} className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

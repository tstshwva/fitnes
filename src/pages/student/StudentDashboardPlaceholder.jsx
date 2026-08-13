/**
 * Page: StudentDashboardPlaceholder
 * Student Overview: active program, progress, upcoming live sessions, quick actions.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { progressService } from '../../services/progressService';
import { classService } from '../../services/classService';
import { evaluationService } from '../../services/evaluationService';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ClipboardCheck,
  Video,
  Award
} from 'lucide-react';

export const StudentDashboardPlaceholder = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [progressSummary, setProgressSummary] = useState(null);
  const [upcomingLive, setUpcomingLive] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [enrs, liveClasses, evalData] = await Promise.all([
          enrollmentService.getByStudentId(user.id),
          classService.getLiveClasses(),
          evaluationService.getByStudentId(user.id)
        ]);

        setEnrollments(enrs);
        setUpcomingLive(liveClasses);
        setEvaluation(evalData);

        if (enrs.length > 0 && enrs[0].programId) {
          const prog = await progressService.getProgramProgressSummary(user.id, enrs[0].programId);
          setProgressSummary(prog);
        }
      } catch (err) {
        console.error('Error loading student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return <div style={{ padding: '24px' }}>Cargando panel del alumno...</div>;
  }

  const activeEnrollment = enrollments.find((e) => e.status === 'active');
  const activeProgram = activeEnrollment?.program;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: '#ffffff',
          padding: '28px',
          borderRadius: '12px'
        }}
      >
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>¡Bienvenido/a de nuevo, {user.name}!</h2>
        <p style={{ margin: '0 0 16px 0', color: '#bfdbfe', fontSize: '14px', maxWidth: '650px', lineHeight: 1.5 }}>
          "El conocimiento transforma. El saber te da el poder para avanzar y cuidar tu salud con confianza."
        </p>

        {!evaluation && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '12px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ClipboardCheck size={20} color="#fde047" />
              <span style={{ fontSize: '13px' }}>
                Aún no has completado tu <strong>Evaluación Inicial de Hábitos y Objetivos</strong>.
              </span>
            </div>
            <Link
              to="/app/evaluacion"
              style={{
                background: '#ffffff',
                color: '#1e40af',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Completar Ahora
            </Link>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Programa Activo</span>
            <BookOpen size={18} color="#2563eb" />
          </div>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            {activeProgram ? activeProgram.title : 'Sin inscripción'}
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Progreso del Programa</span>
            <Award size={18} color="#10b981" />
          </div>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#10b981' }}>
            {progressSummary ? `${progressSummary.percentage}%` : '0%'}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            {progressSummary?.completedClasses || 0} de {progressSummary?.totalClasses || 0} clases completadas
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Próximas Clases en Vivo</span>
            <Video size={18} color="#8b5cf6" />
          </div>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>
            {upcomingLive.length}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            Sesiones de retroalimentación programadas
          </p>
        </div>
      </div>

      {/* Main Sections: Active Program & Upcoming sessions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Active Program Card */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#0f172a' }}>Tu Programa Actual</h3>
          {activeProgram ? (
            <div>
              <img
                src={activeProgram.coverImage}
                alt={activeProgram.title}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }}
              />
              <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                {activeProgram.badge}
              </span>
              <h4 style={{ margin: '8px 0', fontSize: '16px', color: '#1e293b' }}>{activeProgram.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                {activeProgram.description}
              </p>
              <Link
                to="/app/programa"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#2563eb',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Continuar Estudio <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>No estás inscrito en ningún programa actualmente.</p>
          )}
        </div>

        {/* Quick Links / Next Live Class */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#0f172a' }}>Próxima Sesión en Vivo</h3>
          {upcomingLive.length > 0 ? (
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                EN VIVO &bull; ZOOM / MEET
              </span>
              <h4 style={{ margin: '10px 0 6px 0', fontSize: '15px', color: '#0f172a' }}>
                {upcomingLive[0].title}
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
                {upcomingLive[0].description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#475569', marginBottom: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {new Date(upcomingLive[0].date).toLocaleDateString()}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {upcomingLive[0].durationMinutes} min
                </span>
              </div>
              <a
                href={upcomingLive[0].liveLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#8b5cf6',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <Video size={14} /> Unirse a la Sesión
              </a>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>No hay clases en vivo programadas esta semana.</p>
          )}

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#334155' }}>Accesos Rápidos</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link to="/app/clases" style={{ padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '12px', textDecoration: 'none', color: '#334155', fontWeight: 500 }}>
                Todas las Clases
              </Link>
              <Link to="/app/ejercicios" style={{ padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '12px', textDecoration: 'none', color: '#334155', fontWeight: 500 }}>
                Biblioteca de Ejercicios
              </Link>
              <Link to="/app/biblioteca" style={{ padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '12px', textDecoration: 'none', color: '#334155', fontWeight: 500 }}>
                Guías y PDFs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

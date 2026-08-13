/**
 * Page: StudentDashboard (Student)
 * Premium student dashboard for MOVARA.
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
  Award,
  Radio,
  Activity,
  FileText,
  Sparkles,
  Play
} from 'lucide-react';

export const StudentDashboard = () => {
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
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '12px' }}>🌿</div>
        <p>Cargando tu aula virtual MOVARA...</p>
      </div>
    );
  }

  const activeEnrollment = enrollments.find((e) => e.status === 'active') || enrollments[0];
  const activeProgram = activeEnrollment?.program;
  const percentage = progressSummary?.percentage || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. WELCOME BANNER */}
      <div
        className="animate-fade-up stagger-1"
        style={{
          background: 'linear-gradient(135deg, #061e12 0%, #0d3822 50%, #14532d 100%)',
          color: '#ffffff',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px -5px rgba(6, 30, 18, 0.4)',
          border: '1px solid rgba(132, 204, 22, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ maxWidth: '700px' }}>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(132, 204, 22, 0.4)',
                color: '#bef264',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '12px'
              }}
            >
              Aula Virtual MOVARA
            </span>
            <h2 style={{ fontSize: '26px', margin: '0 0 10px 0', color: '#ffffff' }}>
              ¡Hola, {user?.name.split(' ')[0]}!
            </h2>
            <p style={{ fontSize: '14px', color: '#dcfce7', lineHeight: 1.6, margin: 0 }}>
              "El conocimiento transforma. El saber te da el poder para avanzar y cuidar tu salud con confianza."
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
              alt={user?.name}
              style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #84cc16', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Evaluation alert banner if pending */}
        {!evaluation && (
          <div
            className="animate-scale-in stagger-2"
            style={{
              marginTop: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ClipboardCheck size={20} color="#fde047" />
              <span style={{ fontSize: '13px', color: '#fef08a' }}>
                Completa tu <strong>Evaluación Inicial</strong> para que la instructora adapte tus contenidos.
              </span>
            </div>
            <Link
              to="/app/evaluacion"
              style={{
                background: '#ffffff',
                color: '#14532d',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Completar Ahora
            </Link>
          </div>
        )}
      </div>

      {/* 2. STATS & PROGRESS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {/* Progress Card */}
        <div className="card-premium animate-fade-up stagger-2" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Avance Formativo</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={18} color="#15803d" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#15803d', fontFamily: 'var(--font-heading)' }}>
              {percentage}%
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>completado</span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #65a30d, #15803d)',
                borderRadius: '999px',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            {progressSummary?.completedClasses || 0} de {progressSummary?.totalClasses || 0} lecciones terminadas
          </p>
        </div>

        {/* Next Live Class */}
        <div className="card-premium animate-fade-up stagger-3" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Próxima Clase en Directo</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={18} color="#7c3aed" />
            </div>
          </div>
          {upcomingLive.length > 0 ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span className="pulse-indicator" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: 700 }}>Programada</span>
              </div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {upcomingLive[0].title}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                {upcomingLive[0].date ? new Date(upcomingLive[0].date).toLocaleDateString() : 'Próximamente'} &bull; {upcomingLive[0].durationMinutes} min
              </p>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>No hay clases en vivo programadas esta semana.</p>
          )}
        </div>

        {/* Pedagogical Exercise Guide Card */}
        <div className="card-premium animate-fade-up stagger-4" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Biblioteca de Técnica</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="#059669" />
            </div>
          </div>
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
            Consulta la biomecánica, pasos y precauciones de cada movimiento.
          </p>
          <Link
            to="/app/ejercicios"
            style={{ fontSize: '13px', fontWeight: 700, color: '#15803d', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Explorar Ejercicios <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3. MAIN SECTION: ACTIVE PROGRAM & SHORTCUTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Active Program Details */}
        <div className="card-premium animate-fade-up stagger-4" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>Tu Programa Inscrito</h3>
            <span className="badge-pill badge-green">Activo</span>
          </div>

          {activeProgram ? (
            <div>
              <div style={{ position: 'relative', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={activeProgram.coverImage}
                  alt={activeProgram.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(12, 56, 34, 0.85)',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {activeProgram.badge}
                </div>
              </div>

              <h4 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                {activeProgram.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                {activeProgram.description}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/app/programa"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px 16px', fontSize: '13px' }}
                >
                  Ver Temario Completo <ArrowRight size={14} />
                </Link>
                <Link
                  to="/app/clases"
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '13px' }}
                >
                  Ver Clases
                </Link>
              </div>
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No tienes ningún programa activo.</p>
          )}
        </div>

        {/* Shortcuts & Live Session Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Live stream trigger card */}
          {upcomingLive.length > 0 && (
            <div
              className="animate-scale-in stagger-5"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
                color: '#ffffff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 8px 20px -4px rgba(76, 29, 149, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Radio size={16} color="#fca5a5" className="pulse-indicator" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#e9d5ff' }}>
                  Sesión en Vivo con Yessi Lizama
                </span>
              </div>
              <h4 style={{ fontSize: '16px', margin: '0 0 8px 0', color: '#ffffff' }}>
                {upcomingLive[0].title}
              </h4>
              <p style={{ fontSize: '13px', color: '#ddd6fe', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                {upcomingLive[0].description}
              </p>
              <a
                href={upcomingLive[0].liveLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  color: '#4c1d95',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Video size={15} /> Unirse a la Sala Virtual
              </a>
            </div>
          )}

          {/* Quick study material */}
          <div className="card-premium animate-fade-up stagger-6" style={{ padding: '24px', flex: 1 }}>
            <h4 style={{ fontSize: '15px', color: '#0f172a', margin: '0 0 12px 0' }}>Accesos Directos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                to="/app/biblioteca"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  color: '#1e293b',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color="#15803d" /> Guías y Manuales PDF
                </span>
                <ArrowRight size={14} color="#64748b" />
              </Link>

              <Link
                to="/app/evaluacion"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  color: '#1e293b',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardCheck size={16} color="#15803d" /> Mi Evaluación Inicial
                </span>
                <ArrowRight size={14} color="#64748b" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

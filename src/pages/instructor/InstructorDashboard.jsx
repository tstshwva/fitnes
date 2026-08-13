/**
 * Page: InstructorDashboard (Instructor - Yessi Lizama)
 * Master dashboard for managing the MOVARA educational platform.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { programService } from '../../services/programService';
import { classService } from '../../services/classService';
import { exerciseService } from '../../services/exerciseService';
import { evaluationService } from '../../services/evaluationService';
import {
  Users,
  Layers,
  Video,
  Activity,
  Plus,
  ArrowRight,
  TrendingUp,
  ClipboardList,
  Calendar,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const InstructorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPrograms: 0,
    totalClasses: 0,
    totalExercises: 0,
    evaluationsCount: 0
  });
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [allStudents, allPrograms, allClasses, allExercises, allEvals] = await Promise.all([
          enrollmentService.getAllStudents(),
          programService.getPrograms(),
          classService.getClasses(),
          exerciseService.getExercises(),
          evaluationService.getAll()
        ]);

        const lives = allClasses.filter((c) => c.isLive);

        setStats({
          totalStudents: allStudents.length,
          totalPrograms: allPrograms.length,
          totalClasses: allClasses.length,
          totalExercises: allExercises.length,
          evaluationsCount: allEvals.length
        });

        setStudents(allStudents);
        setPrograms(allPrograms);
        setLiveClasses(lives);
      } catch (err) {
        console.error('Error loading instructor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '12px' }}>🌿</div>
        <p>Cargando panel de gestión MOVARA...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. TOP BANNER */}
      <div
        className="animate-fade-up stagger-1"
        style={{
          background: 'linear-gradient(135deg, #0c3822 0%, #14532d 50%, #15803d 100%)',
          color: '#ffffff',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px -5px rgba(12, 56, 34, 0.35)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Panel de Instructora &bull; MOVARA
            </span>
          </div>
          <h2 style={{ fontSize: '26px', margin: '0 0 8px 0', color: '#ffffff' }}>
            Bienvenida, {user?.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#dcfce7', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
            Aquí puedes supervisar a tus alumnos, crear nuevos programas, programar clases en vivo y enriquecer la biblioteca técnica.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/programas"
            className="btn-primary"
            style={{ background: '#ffffff', color: '#14532d', padding: '10px 18px', fontSize: '13px' }}
          >
            <Plus size={16} /> Crear Programa
          </Link>
          <Link
            to="/admin/clases"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <Video size={16} /> Programar Clase en Vivo
          </Link>
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Alumnos Matriculados', value: stats.totalStudents, icon: <Users size={20} color="#15803d" />, bg: '#dcfce7', link: '/admin/alumnos', delay: 'stagger-2' },
          { label: 'Programas Activos', value: stats.totalPrograms, icon: <Layers size={20} color="#7c3aed" />, bg: '#ede9fe', link: '/admin/programas', delay: 'stagger-3' },
          { label: 'Clases Publicadas', value: stats.totalClasses, icon: <Video size={20} color="#0284c7" />, bg: '#e0f2fe', link: '/admin/clases', delay: 'stagger-4' },
          { label: 'Ejercicios con Técnica', value: stats.totalExercises, icon: <Activity size={20} color="#ea580c" />, bg: '#ffedd5', link: '/admin/ejercicios', delay: 'stagger-5' }
        ].map((kpi, idx) => (
          <Link
            key={idx}
            to={kpi.link}
            className={`card-premium animate-fade-up ${kpi.delay}`}
            style={{ padding: '20px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{kpi.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon}
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
              {kpi.value}
            </div>
          </Link>
        ))}
      </div>

      {/* 3. TWO-COLUMN MANAGEMENT SECTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Left Column: Recent Students */}
        <div className="card-premium animate-fade-up stagger-4" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', color: '#0f172a', margin: 0 }}>Alumnos en Formación</h3>
            <Link to="/admin/alumnos" style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {students.map((st) => (
              <div
                key={st.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={st.avatar}
                    alt={st.name}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ margin: '0 0 2px 0', fontSize: '14px', color: '#0f172a' }}>{st.name}</h5>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{st.email}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge-pill badge-green" style={{ fontSize: '11px' }}>
                    Activo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Programs & Live Classes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Programs Overview */}
          <div className="card-premium animate-fade-up stagger-5" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', color: '#0f172a', margin: 0 }}>Programas de MOVARA</h3>
              <Link to="/admin/programas" style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Gestionar <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {programs.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#0f172a' }}>{p.title}</h5>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {p.durationWeeks} semanas &bull; Nivel {p.level}
                      </span>
                    </div>
                  </div>

                  <span className="badge-pill badge-blue" style={{ fontSize: '11px' }}>
                    Publicado
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Live Classes */}
          <div className="card-premium animate-fade-up stagger-6" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', color: '#0f172a', margin: 0 }}>Próximas Sesiones en Vivo</h3>
              <Link to="/admin/clases" style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>

            {liveClasses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {liveClasses.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#faf5ff',
                      border: '1px solid #e9d5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h5 style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#581c87' }}>{cls.title}</h5>
                      <span style={{ fontSize: '11px', color: '#7e22ce' }}>
                        {cls.date ? new Date(cls.date).toLocaleDateString() : 'Sin fecha'} &bull; {cls.durationMinutes} min
                      </span>
                    </div>
                    <a
                      href={cls.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#7c3aed',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      Enlace
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>No hay clases en vivo agendadas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

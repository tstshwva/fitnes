/**
 * Page: InstructorDashboardPlaceholder (Instructor)
 * Overview of student roster, programs, scheduled classes, and evaluations.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { programService } from '../../services/programService';
import { classService } from '../../services/classService';
import { exerciseService } from '../../services/exerciseService';
import { evaluationService } from '../../services/evaluationService';
import {
  Users,
  Layers,
  Video,
  Activity,
  ClipboardList,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

export const InstructorDashboardPlaceholder = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    programs: 0,
    classes: 0,
    exercises: 0,
    evaluations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [students, programs, classes, exercises, evals] = await Promise.all([
          authService.getStudents(),
          programService.getPrograms(),
          classService.getAllClasses(),
          exerciseService.getAllExercises(),
          evaluationService.getAllEvaluations()
        ]);

        setStats({
          students: students.length,
          programs: programs.length,
          classes: classes.length,
          exercises: exercises.length,
          evaluations: evals
        });
      } catch (err) {
        console.error('Error loading instructor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div style={{ padding: '24px' }}>Cargando panel de instructora...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
          color: '#ffffff',
          padding: '28px',
          borderRadius: '12px'
        }}
      >
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
          Panel Administrativo &bull; Instructora Yessi Lizama
        </span>
        <h2 style={{ margin: '8px 0', fontSize: '24px' }}>Gestión de Educación y Formación Continua</h2>
        <p style={{ margin: 0, color: '#e9d5ff', fontSize: '14px', maxWidth: '600px', lineHeight: 1.5 }}>
          Supervisa el progreso de tus alumnos, planifica clases en vivo y actualiza los contenidos pedagógicos.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Alumnos Activos</span>
            <Users size={18} color="#8b5cf6" />
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{stats.students}</p>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Programas Creados</span>
            <Layers size={18} color="#2563eb" />
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{stats.programs}</p>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Clases Totales</span>
            <Video size={18} color="#059669" />
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{stats.classes}</p>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span>Biblioteca Ejercicios</span>
            <Activity size={18} color="#d97706" />
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{stats.exercises}</p>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Module administration links */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a' }}>Acciones Rápidas de Contenido</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              to="/admin/programas"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#1e293b', border: '1px solid #e2e8f0' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
                <Layers size={16} color="#2563eb" /> Administrar Programas y Módulos
              </span>
              <ArrowRight size={16} color="#64748b" />
            </Link>

            <Link
              to="/admin/clases"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#1e293b', border: '1px solid #e2e8f0' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
                <Video size={16} color="#059669" /> Programar Clases en Vivo / Grabadas
              </span>
              <ArrowRight size={16} color="#64748b" />
            </Link>

            <Link
              to="/admin/ejercicios"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#1e293b', border: '1px solid #e2e8f0' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
                <Activity size={16} color="#d97706" /> Agregar Ejercicio a la Biblioteca
              </span>
              <ArrowRight size={16} color="#64748b" />
            </Link>
          </div>
        </div>

        {/* Diagnostic assessment submissions */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList size={18} color="#8b5cf6" /> Evaluaciones Iniciales Recibidas ({stats.evaluations.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.evaluations.map((ev) => (
              <div key={ev.id} style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>Nivel: {ev.currentLevel}</span>
                  <span style={{ color: '#64748b' }}>{new Date(ev.completedAt).toLocaleDateString()}</span>
                </div>
                <p style={{ margin: '0 0 4px 0', color: '#475569' }}>
                  Frecuencia: {ev.activityFrequency} días/sem &bull; Disponibilidad: {ev.weeklyAvailability}
                </p>
                {ev.notes && <p style={{ margin: 0, color: '#64748b', fontStyle: 'italic' }}>"{ev.notes}"</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

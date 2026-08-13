/**
 * Page: InstructorDashboard (Instructor)
 * Executive management console for Instructor Yessi Lizama.
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
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const InstructorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    programs: 0,
    classes: 0,
    exercises: 0,
    evaluations: [],
    studentsList: []
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
          evaluations: evals,
          studentsList: students
        });
      } catch (err) {
        console.error('Error loading instructor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <div className="pulse-indicator" style={{ fontSize: '24px', marginBottom: '12px' }}>✨</div>
        <p>Cargando panel de instructora...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* 1. EXECUTIVE BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #31104b 50%, #4c1d95 100%)',
          color: '#ffffff',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px -5px rgba(76, 29, 149, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <span
            style={{
              background: 'rgba(168, 85, 247, 0.25)',
              border: '1px solid rgba(192, 132, 252, 0.3)',
              color: '#d8b4fe',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '12px'
            }}
          >
            Panel Administrativo &bull; Yessi Lizama
          </span>
          <h2 style={{ fontSize: '26px', margin: '0 0 8px 0', color: '#ffffff' }}>
            Centro de Gestión y Formación Continua
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', lineHeight: 1.5, margin: 0 }}>
            Administra tus alumnos, crea programas estructurados, programa clases en vivo y actualiza la biblioteca pedagógica.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            to="/admin/clases"
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '8px', fontSize: '13px' }}
          >
            <Video size={15} /> Programar Clase
          </Link>
          <Link
            to="/admin/programas"
            className="btn-secondary"
            style={{ borderRadius: '8px', fontSize: '13px' }}
          >
            <Layers size={15} /> Nuevo Programa
          </Link>
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="card-premium" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Alumnos Inscritos</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} color="#7c3aed" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {stats.students}
          </p>
          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>Activos en plataforma</span>
        </div>

        <div className="card-premium" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Programas Creados</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={16} color="#2563eb" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {stats.programs}
          </p>
          <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>Formaciones publicadas</span>
        </div>

        <div className="card-premium" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Clases y Talleres</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={16} color="#059669" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {stats.classes}
          </p>
          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>En vivo y grabadas</span>
        </div>

        <div className="card-premium" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Biblioteca Ejercicios</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={16} color="#d97706" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {stats.exercises}
          </p>
          <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>Guías pedagógicas</span>
        </div>
      </div>

      {/* 3. MAIN SECTION: EVALUATIONS & DIRECTORY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Evaluations review */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={20} color="#7c3aed" />
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>
                Evaluaciones de Alumnos ({stats.evaluations.length})
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.evaluations.map((ev) => {
              const student = stats.studentsList.find((s) => s.id === ev.studentId);
              return (
                <div
                  key={ev.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                      {student ? student.name : 'Alumno'}
                    </span>
                    <span className="badge-pill badge-purple">
                      Nivel: {ev.currentLevel}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Frecuencia: {ev.activityFrequency} días/sem &bull; Disponibilidad: {ev.weeklyAvailability}
                  </div>

                  {ev.notes && (
                    <p style={{ margin: 0, fontSize: '12px', color: '#334155', fontStyle: 'italic', background: '#ffffff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                      "{ev.notes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Management Hub */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-premium" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 16px 0' }}>
              Gestión Rápida de la Plataforma
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/admin/alumnos"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  color: '#1e293b'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={18} color="#7c3aed" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Directorio de Alumnos</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Ver inscripciones, avances y diagnósticos</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#94a3b8" />
              </Link>

              <Link
                to="/admin/programas"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  color: '#1e293b'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={18} color="#2563eb" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Programas y Módulos</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Estructurar temas y contenidos formativos</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#94a3b8" />
              </Link>

              <Link
                to="/admin/ejercicios"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  color: '#1e293b'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={18} color="#d97706" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Biblioteca de Ejercicios</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Explicar biomecánica, técnica y errores</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#94a3b8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

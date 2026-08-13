/**
 * Page: EvaluationPage (Student - Phase 3)
 * Interactive diagnostic questionnaire with visual card selectors, recommendation engine, and direct enrollment.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { evaluationService } from '../../services/evaluationService';
import { enrollmentService } from '../../services/enrollmentService';
import { programService } from '../../services/programService';
import {
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Activity,
  Heart,
  Moon,
  Clock,
  Check
} from 'lucide-react';

export const EvaluationPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    exerciseExperience: 'principiante',
    activityFrequency: '1-2',
    primaryGoals: ['bienestar_general', 'aprender_tecnica'],
    restHabits: 'regular',
    weeklyAvailability: '3 horas por semana',
    currentLevel: 'fundamentos',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [recommendedProgram, setRecommendedProgram] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const [existingEval, programs] = await Promise.all([
          evaluationService.getByStudentId(user.id),
          programService.getPrograms()
        ]);

        if (existingEval) {
          setFormData({
            exerciseExperience: existingEval.exerciseExperience || 'principiante',
            activityFrequency: existingEval.activityFrequency || '1-2',
            primaryGoals: existingEval.primaryGoals || ['bienestar_general'],
            restHabits: existingEval.restHabits || 'regular',
            weeklyAvailability: existingEval.weeklyAvailability || '3 horas por semana',
            currentLevel: existingEval.currentLevel || 'fundamentos',
            notes: existingEval.notes || ''
          });
        }

        // Set default recommended program
        if (programs.length > 0) {
          setRecommendedProgram(programs[0]);
        }
      } catch (err) {
        console.error('Error loading evaluation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleGoalToggle = (goalId) => {
    setFormData((prev) => {
      const exists = prev.primaryGoals.includes(goalId);
      return {
        ...prev,
        primaryGoals: exists
          ? prev.primaryGoals.filter((g) => g !== goalId)
          : [...prev.primaryGoals, goalId]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Determine level dynamically
    let calculatedLevel = 'fundamentos';
    if (formData.exerciseExperience === 'avanzado' || formData.activityFrequency === '5+') {
      calculatedLevel = 'avanzado';
    } else if (formData.exerciseExperience === 'intermedio' || formData.activityFrequency === '3-4') {
      calculatedLevel = 'intermedio';
    }

    const payload = {
      studentId: user.id,
      ...formData,
      currentLevel: calculatedLevel
    };

    await evaluationService.saveEvaluation(payload);
    setFormData((prev) => ({ ...prev, currentLevel: calculatedLevel }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleQuickEnroll = async () => {
    if (!user || !recommendedProgram) return;
    setEnrolling(true);
    try {
      await enrollmentService.enroll(user.id, recommendedProgram.id);
      setEnrolledSuccess(true);
    } catch (err) {
      console.error('Error enrolling:', err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando cuestionario diagnóstico...</p>
      </div>
    );
  }

  const experienceOptions = [
    {
      id: 'ninguna',
      title: 'Comenzando desde cero',
      desc: 'No realizo actividad actualmente y quiero aprender los principios básicos con seguridad.'
    },
    {
      id: 'principiante',
      title: 'Principiante / Intermitente',
      desc: 'He hecho ejercicio por temporadas pero sin estructura ni conocimiento claro del propósito.'
    },
    {
      id: 'intermedio',
      title: 'Intermedio Constante',
      desc: 'Entreno hace más de 6 meses de forma regular y busco perfeccionar técnica y biomecánica.'
    },
    {
      id: 'avanzado',
      title: 'Avanzado',
      desc: 'Entrenamiento sólido y hábitos consolidados, interesado en optimización y control motor.'
    }
  ];

  const goalOptions = [
    { id: 'bienestar_general', label: 'Bienestar General & Energía Diaria', icon: <Heart size={16} color="#ef4444" /> },
    { id: 'aprender_tecnica', label: 'Técnica Correcta y Prevención', icon: <Activity size={16} color="#2563eb" /> },
    { id: 'fuerza_movilidad', label: 'Ganar Fuerza y Movilidad Articular', icon: <Sparkles size={16} color="#8b5cf6" /> },
    { id: 'habito_constante', label: 'Crear un Hábito Constante y Sostenible', icon: <CheckCircle2 size={16} color="#10b981" /> },
    { id: 'nutricion_salud', label: 'Entender Nutrición con Propósito', icon: <HeartPulseIcon size={16} /> },
    { id: 'descanso_optimo', label: 'Mejorar Calidad de Sueño y Recuperación', icon: <Moon size={16} color="#6366f1" /> }
  ];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <span className="badge-pill badge-blue" style={{ marginBottom: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd' }}>
            Diagnóstico Inicial
          </span>
          <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#ffffff' }}>
            Evaluación de Hábitos y Objetivos
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '580px', lineHeight: 1.5, margin: 0 }}>
            Tus respuestas permiten a la instructora **Yessi Lizama** orientarte hacia los módulos más adecuados para tu nivel y metas personales.
          </p>
        </div>

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#60a5fa'
          }}
        >
          <ClipboardCheck size={36} />
        </div>
      </div>

      {savedSuccess && (
        <div
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          <Check size={20} />
          Evaluación guardada con éxito. Nivel asignado: <strong>{formData.currentLevel.toUpperCase()}</strong>.
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 1. Experiencia Previa */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 6px 0' }}>
            1. Experiencia Previa con Ejercicio y Deporte
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            Selecciona la opción que mejor describa tu punto de partida.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {experienceOptions.map((opt) => {
              const selected = formData.exerciseExperience === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, exerciseExperience: opt.id })}
                  style={{
                    border: `2px solid ${selected ? '#2563eb' : '#e2e8f0'}`,
                    background: selected ? '#eff6ff' : '#ffffff',
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '14px', color: selected ? '#1d4ed8' : '#0f172a' }}>
                      {opt.title}
                    </strong>
                    {selected && <CheckCircle2 size={16} color="#2563eb" />}
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Frecuencia de Actividad */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 6px 0' }}>
            2. Frecuencia Actual de Actividad Física
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            ¿Cuántos días a la semana realizas actualmente actividad física consciente?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {[
              { id: '0', label: '0 días', sub: 'Sedentario/a' },
              { id: '1-2', label: '1 - 2 días', sub: 'Ocasional' },
              { id: '3-4', label: '3 - 4 días', sub: 'Moderado' },
              { id: '5+', label: '5+ días', sub: 'Frecuente' }
            ].map((freq) => {
              const selected = formData.activityFrequency === freq.id;
              return (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, activityFrequency: freq.id })}
                  style={{
                    padding: '14px 8px',
                    borderRadius: '10px',
                    border: `2px solid ${selected ? '#2563eb' : '#e2e8f0'}`,
                    background: selected ? '#eff6ff' : '#f8fafc',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 700, color: selected ? '#1d4ed8' : '#0f172a' }}>
                    {freq.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {freq.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Objetivos Principales */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 6px 0' }}>
            3. Objetivos Principales
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            Marca todos los aspectos en los que deseas profundizar en este programa formativo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {goalOptions.map((goal) => {
              const active = formData.primaryGoals.includes(goal.id);
              return (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: `1.5px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
                    background: active ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => {}} // handled by parent onClick
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {goal.icon}
                    <span style={{ fontSize: '13px', fontWeight: active ? 700 : 500, color: active ? '#1e40af' : '#334155' }}>
                      {goal.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Descanso y Disponibilidad */}
        <div className="card-premium" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 16px 0' }}>
            4. Calidad del Descanso y Disponibilidad Semanal
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Calidad de Sueño / Descanso
              </label>
              <select
                value={formData.restHabits}
                onChange={(e) => setFormData({ ...formData, restHabits: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
              >
                <option value="malo">Malo (Menos de 6h o sueño interrumpido)</option>
                <option value="regular">Regular (6-7h pero despierto con fatiga)</option>
                <option value="bueno">Bueno (7-8h descanso reparador usual)</option>
                <option value="optimo">Óptimo (Excelente higiene de sueño y energía)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Disponibilidad para Clases y Práctica
              </label>
              <input
                type="text"
                value={formData.weeklyAvailability}
                onChange={(e) => setFormData({ ...formData, weeklyAvailability: e.target.value })}
                placeholder="Ej. 3 a 4 horas semanales"
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Notas adicionales para la Instructora Yessi
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Escribe dudas específicas sobre tu postura, dolores recurrentes o expectativas..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '14px 28px', fontSize: '15px', borderRadius: '10px', alignSelf: 'flex-start' }}
        >
          <ClipboardCheck size={18} /> Guardar y Actualizar Evaluación
        </button>
      </form>

      {/* Program Recommendation Box */}
      {recommendedProgram && (
        <div
          className="card-premium"
          style={{
            padding: '28px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #bfdbfe'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge-pill badge-green" style={{ marginBottom: '8px' }}>
                Recomendación Automática para tu Nivel
              </span>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '4px 0 6px 0' }}>
                {recommendedProgram.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, maxWidth: '560px' }}>
                {recommendedProgram.description}
              </p>
            </div>

            <button
              onClick={handleQuickEnroll}
              disabled={enrolling || enrolledSuccess}
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '8px' }}
            >
              {enrolledSuccess ? '¡Inscrito con Éxito!' : enrolling ? 'Inscribiendo...' : 'Inscribirme al Programa'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function HeartPulseIcon(props) {
  return <Heart size={props.size || 16} color="#059669" />;
}

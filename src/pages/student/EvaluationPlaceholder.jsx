/**
 * Page: EvaluationPlaceholder (Student)
 * Form for initial student assessment and habits diagnosis.
 * Non-medical, focused on sports experience, habits, and objectives.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { evaluationService } from '../../services/evaluationService';
import { ClipboardCheck, Check, AlertCircle } from 'lucide-react';

export const EvaluationPlaceholder = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    exerciseExperience: 'principiante',
    activityFrequency: '1-2',
    primaryGoals: ['bienestar_general'],
    restHabits: 'regular',
    weeklyAvailability: '3 horas por semana',
    currentLevel: 'fundamentos',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    evaluationService.getByStudentId(user.id).then((existing) => {
      if (existing) {
        setFormData({
          exerciseExperience: existing.exerciseExperience || 'principiante',
          activityFrequency: existing.activityFrequency || '1-2',
          primaryGoals: existing.primaryGoals || ['bienestar_general'],
          restHabits: existing.restHabits || 'regular',
          weeklyAvailability: existing.weeklyAvailability || '3 horas por semana',
          currentLevel: existing.currentLevel || 'fundamentos',
          notes: existing.notes || ''
        });
      }
      setLoading(false);
    });
  }, [user]);

  const handleGoalToggle = (goal) => {
    setFormData((prev) => {
      const exists = prev.primaryGoals.includes(goal);
      return {
        ...prev,
        primaryGoals: exists
          ? prev.primaryGoals.filter((g) => g !== goal)
          : [...prev.primaryGoals, goal]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    await evaluationService.saveEvaluation({
      studentId: user.id,
      ...formData
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando evaluación...</div>;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#dbeafe', color: '#2563eb', padding: '10px', borderRadius: '8px' }}>
          <ClipboardCheck size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', margin: 0, color: '#0f172a' }}>Evaluación Inicial de Hábitos y Objetivos</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
            Ayuda a la instructora Yessi Lizama a conocer tu punto de partida para adaptar tu proceso.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Check size={16} /> Evaluación guardada exitosamente en el sistema.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Experience */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            1. Experiencia previa con ejercicio físico o deporte
          </label>
          <select
            value={formData.exerciseExperience}
            onChange={(e) => setFormData({ ...formData, exerciseExperience: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          >
            <option value="ninguna">Ninguna / Completamente nuevo</option>
            <option value="principiante">Principiante (He entrenado de forma intermitente)</option>
            <option value="intermedio">Intermedio (Entreno con regularidad hace más de 6 meses)</option>
            <option value="avanzado">Avanzado (Entrenamiento constante y buena técnica)</option>
          </select>
        </div>

        {/* Activity frequency */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            2. Frecuencia actual de actividad física
          </label>
          <select
            value={formData.activityFrequency}
            onChange={(e) => setFormData({ ...formData, activityFrequency: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          >
            <option value="0">0 días por semana (Sedentario/a)</option>
            <option value="1-2">1 a 2 días por semana</option>
            <option value="3-4">3 a 4 días por semana</option>
            <option value="5+">5 o más días por semana</option>
          </select>
        </div>

        {/* Goals Checkboxes */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            3. Objetivos principales en este programa
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
            {[
              { id: 'bienestar_general', label: 'Bienestar general y energía' },
              { id: 'aprender_tecnica', label: 'Aprender técnica correcta' },
              { id: 'fuerza', label: 'Aumentar fuerza y movilidad' },
              { id: 'habito_constante', label: 'Crear un hábito constante' },
              { id: 'alimentacion_salud', label: 'Comprender nutrición con propósito' }
            ].map((goal) => (
              <label
                key={goal.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#334155',
                  background: formData.primaryGoals.includes(goal.id) ? '#eff6ff' : '#f8fafc',
                  border: `1px solid ${formData.primaryGoals.includes(goal.id) ? '#bfdbfe' : '#e2e8f0'}`,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.primaryGoals.includes(goal.id)}
                  onChange={() => handleGoalToggle(goal.id)}
                />
                {goal.label}
              </label>
            ))}
          </div>
        </div>

        {/* Rest Habits */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            4. Calidad y hábitos de descanso / sueño
          </label>
          <select
            value={formData.restHabits}
            onChange={(e) => setFormData({ ...formData, restHabits: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          >
            <option value="malo">Malo (Menos de 6h o sueño muy interrumpido)</option>
            <option value="regular">Regular (6-7h pero despierto con cansancio)</option>
            <option value="bueno">Bueno (7-8h descanso reparador habitual)</option>
            <option value="optimo">Óptimo (Excelente higiene de sueño)</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            5. Disponibilidad semanal para clases y estudio
          </label>
          <input
            type="text"
            value={formData.weeklyAvailability}
            onChange={(e) => setFormData({ ...formData, weeklyAvailability: e.target.value })}
            placeholder="Ej. 3 a 4 horas semanales"
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px' }}
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            6. Notas adicionales o dudas iniciales
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="¿Hay algo específico que te gustaría que la instructora considere?"
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: '#2563eb',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Guardar Evaluación
        </button>
      </form>
    </div>
  );
};

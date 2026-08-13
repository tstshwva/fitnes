/**
 * Page: ExercisesPlaceholder (Student)
 * Pedagogical exercise library focusing on purpose, movement mechanics, and safety.
 */

import React, { useEffect, useState } from 'react';
import { exerciseService } from '../../services/exerciseService';
import { Activity, AlertTriangle, CheckCircle, Info, Filter } from 'lucide-react';

export const ExercisesPlaceholder = () => {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exerciseService.getExercisesByCategory(category).then((data) => {
      setExercises(data);
      if (data.length > 0 && !selectedExercise) {
        setSelectedExercise(data[0]);
      }
      setLoading(false);
    });
  }, [category]);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fuerza', label: 'Fuerza Consciente' },
    { id: 'postura', label: 'Patrones y Postura' },
    { id: 'movilidad', label: 'Movilidad Articular' },
    { id: 'resistencia', label: 'Estabilidad y Core' },
    { id: 'respiracion', label: 'Respiración & Recuperación' }
  ];

  if (loading) return <div style={{ padding: '24px' }}>Cargando biblioteca de ejercicios...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>
          Biblioteca Pedagógica de Ejercicios
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Comprende el propósito y biomecánica de cada movimiento para entrenar con total seguridad.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            style={{
              background: category === cat.id ? '#2563eb' : '#ffffff',
              color: category === cat.id ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: category === cat.id ? 600 : 400
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2-Column Layout: Exercise Details + List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Detail Card */}
        {selectedExercise && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                {selectedExercise.category} &bull; {selectedExercise.difficulty}
              </span>
            </div>

            <h3 style={{ fontSize: '20px', margin: '0 0 8px 0', color: '#0f172a' }}>
              {selectedExercise.name}
            </h3>

            {/* Purpose section */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #2563eb', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={15} color="#2563eb" /> ¿Por qué realizamos este ejercicio?
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                {selectedExercise.purpose}
              </p>
            </div>

            {/* Execution Guide */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#1e293b' }}>
                Guía de Ejecución Paso a Paso:
              </h4>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                {selectedExercise.executionGuide.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Common mistakes */}
            {selectedExercise.commonMistakes?.length > 0 && (
              <div style={{ marginBottom: '16px', background: '#fffbeb', padding: '12px', borderRadius: '6px', border: '1px solid #fef3c7' }}>
                <h4 style={{ fontSize: '13px', margin: '0 0 6px 0', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} /> Errores frecuentes a evitar:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>
                  {selectedExercise.commonMistakes.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Muscle groups */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Estructuras involucradas:</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {selectedExercise.muscleGroups?.map((mg, idx) => (
                  <span key={idx} style={{ background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                    {mg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right: Exercise List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '16px', margin: 0, color: '#334155' }}>
            Ejercicios Registrados ({exercises.length})
          </h3>
          {exercises.map((ex) => {
            const active = selectedExercise?.id === ex.id;
            return (
              <div
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                style={{
                  background: active ? '#eff6ff' : '#ffffff',
                  border: `1px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
                  padding: '14px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  {ex.category}
                </span>
                <h4 style={{ margin: '4px 0', fontSize: '15px', color: '#0f172a' }}>{ex.name}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ex.purpose}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

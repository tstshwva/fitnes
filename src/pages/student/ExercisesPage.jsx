/**
 * Page: ExercisesPage (Student - Phase 3)
 * Pedagogical movement library focusing on biomechanics, purpose, error prevention, and technique.
 */

import React, { useEffect, useState } from 'react';
import { exerciseService } from '../../services/exerciseService';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
  Search,
  Sparkles,
  ShieldAlert,
  PlayCircle
} from 'lucide-react';

export const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exerciseService.getAllExercises().then((data) => {
      setExercises(data);
      if (data.length > 0 && !selectedExercise) {
        setSelectedExercise(data[0]);
      }
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fuerza', label: 'Fuerza Consciente' },
    { id: 'postura', label: 'Patrones y Postura' },
    { id: 'movilidad', label: 'Movilidad Articular' },
    { id: 'resistencia', label: 'Estabilidad y Core' },
    { id: 'respiracion', label: 'Respiración & Recuperación' }
  ];

  const filtered = exercises.filter((ex) => {
    const matchesCat = category === 'all' || ex.category === category;
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.purpose.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscleGroups?.some((m) => m.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando biblioteca de ejercicios...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0' }}>
          Biblioteca Pedagógica de Ejercicios
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Comprende el propósito biomecánico, la técnica exacta y los errores a evitar en cada movimiento.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Buscar por ejercicio, músculo o articulación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                background: category === cat.id ? '#2563eb' : '#ffffff',
                color: category === cat.id ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: category === cat.id ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column layout: Detailed Guide + Exercise List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1.2fr)', gap: '24px' }}>
        {/* Left: Detailed Exercise Breakdown */}
        {selectedExercise ? (
          <div className="card-premium" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className="badge-pill badge-blue" style={{ marginBottom: '6px', textTransform: 'uppercase' }}>
                  {selectedExercise.category} &bull; Nivel {selectedExercise.difficulty}
                </span>
                <h3 style={{ fontSize: '22px', color: '#0f172a', margin: '4px 0 0 0' }}>
                  {selectedExercise.name}
                </h3>
              </div>
            </div>

            {/* Purpose Callout */}
            <div
              style={{
                background: '#eff6ff',
                borderLeft: '4px solid #2563eb',
                padding: '16px 20px',
                borderRadius: '0 10px 10px 0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
                <Info size={16} /> ¿Por qué realizamos este ejercicio?
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#1e3a8a', lineHeight: 1.6 }}>
                {selectedExercise.purpose}
              </p>
            </div>

            {/* Step-by-Step Execution Guide */}
            <div>
              <h4 style={{ fontSize: '15px', color: '#0f172a', margin: '0 0 12px 0' }}>
                Guía Paso a Paso de Ejecución Técnica:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedExercise.executionGuide?.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '13px', color: '#334155' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#dbeafe',
                        color: '#1d4ed8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span style={{ lineHeight: 1.5, paddingTop: '2px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes to Avoid */}
            {selectedExercise.commonMistakes?.length > 0 && (
              <div
                style={{
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  borderRadius: '10px',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>
                  <AlertTriangle size={16} /> Errores Frecuentes a Evitar:
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#78350f', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: 1.5 }}>
                  {selectedExercise.commonMistakes.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Muscle groups & precautions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Grupos y Articulaciones Activas:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {selectedExercise.muscleGroups?.map((mg, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      {mg}
                    </span>
                  ))}
                </div>
              </div>

              {selectedExercise.precautions && (
                <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', marginTop: '4px' }}>
                  💡 <strong>Recomendación de Yessi:</strong> {selectedExercise.precautions}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card-premium" style={{ padding: '40px', textAlign: 'center' }}>
            <p>Selecciona un ejercicio para ver su desglose técnico.</p>
          </div>
        )}

        {/* Right: Exercise Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontSize: '15px', color: '#0f172a', margin: 0 }}>
            Listado de Movimientos ({filtered.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '720px', overflowY: 'auto' }}>
            {filtered.map((ex) => {
              const active = selectedExercise?.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex)}
                  className="card-premium"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    background: active ? '#eff6ff' : '#ffffff',
                    border: `1.5px solid ${active ? '#3b82f6' : '#e2e8f0'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb' }}>
                      {ex.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{ex.difficulty}</span>
                  </div>
                  <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#0f172a', fontWeight: active ? 700 : 600 }}>
                    {ex.name}
                  </h5>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ex.purpose}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

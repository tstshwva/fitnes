/**
 * Page: ManageExercisesPlaceholder (Instructor)
 * CRUD interface for the pedagogical exercise library.
 */

import React, { useEffect, useState } from 'react';
import { exerciseService } from '../../services/exerciseService';
import { Activity, Plus, Trash2, Info, AlertTriangle } from 'lucide-react';

export const ManageExercisesPlaceholder = () => {
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    category: 'fuerza',
    purpose: '',
    executionGuide: '',
    commonMistakes: '',
    precautions: '',
    muscleGroups: '',
    difficulty: 'principiante'
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await exerciseService.getAllExercises();
      setExercises(data);
    } catch (err) {
      console.error('Error loading exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await exerciseService.createExercise({
      name: newExercise.name,
      category: newExercise.category,
      purpose: newExercise.purpose,
      executionGuide: newExercise.executionGuide.split('\n').filter((s) => s.trim().length > 0),
      commonMistakes: newExercise.commonMistakes.split('\n').filter((s) => s.trim().length > 0),
      precautions: newExercise.precautions,
      muscleGroups: newExercise.muscleGroups.split(',').map((s) => s.trim()),
      difficulty: newExercise.difficulty
    });
    setShowModal(false);
    setNewExercise({
      name: '',
      category: 'fuerza',
      purpose: '',
      executionGuide: '',
      commonMistakes: '',
      precautions: '',
      muscleGroups: '',
      difficulty: 'principiante'
    });
    await loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este ejercicio pedagógico?')) {
      await exerciseService.deleteExercise(id);
      await loadData();
    }
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando ejercicios...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>Gestión de Ejercicios Pedagógicos</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Alimenta la biblioteca formativa con biomecánica, pasos técnicos y advertencias.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Agregar Ejercicio
        </button>
      </div>

      {/* Inline Creation Modal */}
      {showModal && (
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a' }}>Nuevo Ejercicio Pedagógico</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Nombre</label>
                <input
                  type="text"
                  required
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  placeholder="Ej. Puente de Glúteo Unilateral"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Categoría</label>
                <select
                  value={newExercise.category}
                  onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="fuerza">Fuerza</option>
                  <option value="movilidad">Movilidad</option>
                  <option value="postura">Postura</option>
                  <option value="resistencia">Estabilidad / Core</option>
                  <option value="respiracion">Respiración</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Dificultad</label>
                <select
                  value={newExercise.difficulty}
                  onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>¿Por qué se realiza este ejercicio? (Propósito Pedagógico)</label>
              <input
                type="text"
                required
                value={newExercise.purpose}
                onChange={(e) => setNewExercise({ ...newExercise, purpose: e.target.value })}
                placeholder="Explicación clara del impacto fisiológico o motor..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Pasos de Ejecución (1 por línea)</label>
              <textarea
                rows={3}
                required
                value={newExercise.executionGuide}
                onChange={(e) => setNewExercise({ ...newExercise, executionGuide: e.target.value })}
                placeholder="Paso 1: Coloca los pies...&#10;Paso 2: Eleva la cadera contraiendo..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Errores Comunes (1 por línea)</label>
                <textarea
                  rows={2}
                  value={newExercise.commonMistakes}
                  onChange={(e) => setNewExercise({ ...newExercise, commonMistakes: e.target.value })}
                  placeholder="Arquear espalda baja&#10;No extender completamente..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Músculos / Articulaciones (separados por coma)</label>
                <textarea
                  rows={2}
                  value={newExercise.muscleGroups}
                  onChange={(e) => setNewExercise({ ...newExercise, muscleGroups: e.target.value })}
                  placeholder="Glúteos, Isquiosurales, Core"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                type="submit"
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Guardar Ejercicio
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Exercises Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Nombre</th>
              <th style={{ padding: '12px 16px' }}>Categoría</th>
              <th style={{ padding: '12px 16px' }}>Propósito</th>
              <th style={{ padding: '12px 16px' }}>Dificultad</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex) => (
              <tr key={ex.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{ex.name}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                    {ex.category}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#475569', maxWidth: '300px' }}>{ex.purpose}</td>
                <td style={{ padding: '12px 16px', textTransform: 'capitalize', color: '#64748b' }}>{ex.difficulty}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(ex.id)}
                    style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

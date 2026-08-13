/**
 * Page: ManageExercisesPage (Instructor - Phase 4)
 * Manage the pedagogical exercise library with biomechanical breakdown in MOVARA.
 */

import React, { useEffect, useState } from 'react';
import { exerciseService } from '../../services/exerciseService';
import {
  Activity,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Search,
  X,
  HelpCircle,
  Dumbbell
} from 'lucide-react';

export const ManageExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Fuerza Consciente',
    purpose: '',
    stepsText: '1. Colócate con los pies al ancho de hombros\n2. Inicia el movimiento flexionando caderas y rodillas\n3. Mantén el pecho erguido y empuja el suelo al subir',
    mistakesText: 'Meter las rodillas hacia adentro (valgo de rodilla)\nCurvar la zona lumbar en la bajada\nDespegar los talones del suelo',
    musclesText: 'Cuádriceps, Glúteos, Core profundo, Isquiotibiales'
  });

  const categories = [
    'Fuerza Consciente',
    'Patrones y Postura',
    'Movilidad Articular',
    'Estabilidad/Core',
    'Respiración & Recuperación'
  ];

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await exerciseService.getExercises();
      setExercises(data);
    } catch (err) {
      console.error('Error loading exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingExercise(null);
    setFormData({
      name: '',
      category: 'Fuerza Consciente',
      purpose: 'Enseñar la biomecánica correcta y proteger las articulaciones.',
      stepsText: '1. Alinea la postura de partida con la columna neutral\n2. Realiza el movimiento de forma controlada inhalando\n3. Exhala al realizar la fase de mayor esfuerzo',
      mistakesText: 'Realizar el movimiento de forma apresurada sin control\nCompensar con hombros o zona lumbar',
      musclesText: 'Core, Glúteos, Espalda'
    });
    setShowModal(true);
  };

  const openEditModal = (ex) => {
    setEditingExercise(ex);
    setFormData({
      name: ex.name,
      category: ex.category || 'Fuerza Consciente',
      purpose: ex.purpose || '',
      stepsText: (ex.steps || []).join('\n'),
      mistakesText: (ex.commonMistakes || []).join('\n'),
      musclesText: (ex.musclesWorked || []).join(', ')
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const steps = formData.stepsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const mistakes = formData.mistakesText
        .split('\n')
        .map((m) => m.trim())
        .filter(Boolean);

      const muscles = formData.musclesText
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        category: formData.category,
        purpose: formData.purpose,
        steps: steps,
        commonMistakes: mistakes,
        musclesWorked: muscles
      };

      if (editingExercise) {
        await exerciseService.updateExercise(editingExercise.id, payload);
      } else {
        await exerciseService.createExercise(payload);
      }

      setShowModal(false);
      await loadExercises();
    } catch (err) {
      console.error('Error saving exercise:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás segura de eliminar este ejercicio pedagógico?')) {
      await exerciseService.deleteExercise(id);
      await loadExercises();
    }
  };

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ex.musclesWorked || []).some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'ALL' || ex.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Header */}
      <div
        className="card-premium animate-fade-up stagger-1"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, #0c3822 0%, #14532d 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#bef264', letterSpacing: '0.05em' }}>
            Enciclopedia Pedagógica
          </span>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', color: '#ffffff' }}>
            Gestión de Ejercicios y Biomecánica
          </h2>
          <p style={{ fontSize: '13px', color: '#dcfce7', margin: '6px 0 0 0' }}>
            Añade y edita movimientos con propósito, instrucciones paso a paso y advertencias de errores comunes.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn-primary" style={{ background: '#ffffff', color: '#14532d' }}>
          <Plus size={16} /> Crear Nuevo Ejercicio
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-premium animate-fade-up stagger-2" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Buscar por nombre de ejercicio o músculo activo (ej. Sentadilla, Glúteos)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
          <button
            onClick={() => setSelectedCategory('ALL')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: selectedCategory === 'ALL' ? '1px solid #15803d' : '1px solid #cbd5e1',
              background: selectedCategory === 'ALL' ? '#f0fdf4' : '#ffffff',
              color: selectedCategory === 'ALL' ? '#15803d' : '#475569',
              fontWeight: selectedCategory === 'ALL' ? 700 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Todas ({exercises.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: selectedCategory === cat ? '1px solid #15803d' : '1px solid #cbd5e1',
                background: selectedCategory === cat ? '#f0fdf4' : '#ffffff',
                color: selectedCategory === cat ? '#15803d' : '#475569',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '8px' }}>🌿</div>
          <p>Cargando ejercicios...</p>
        </div>
      ) : filteredExercises.length === 0 ? (
        <div className="card-premium" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <p>No se encontraron ejercicios con este criterio.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredExercises.map((ex, idx) => (
            <div
              key={ex.id}
              className={`card-premium animate-fade-up stagger-${(idx % 6) + 1}`}
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge-pill badge-green" style={{ fontSize: '11px' }}>
                    {ex.category}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openEditModal(ex)}
                      style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#475569' }}
                      title="Editar ejercicio"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(ex.id)}
                      style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444' }}
                      title="Eliminar ejercicio"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 8px 0' }}>{ex.name}</h3>

                {/* Purpose */}
                <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    ¿Por qué hacemos este ejercicio?
                  </span>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                    {ex.purpose}
                  </p>
                </div>

                {/* Mistakes Warning Box */}
                {ex.commonMistakes && ex.commonMistakes.length > 0 && (
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <AlertTriangle size={14} color="#d97706" />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                        Errores comunes a evitar
                      </span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#92400e', lineHeight: 1.4 }}>
                      {ex.commonMistakes.slice(0, 2).map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Muscles */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Músculos y Articulaciones
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {ex.musclesWorked?.map((m, i) => (
                      <span key={i} style={{ background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create / Edit Exercise */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="card-premium animate-scale-in"
            style={{
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              background: '#ffffff',
              borderRadius: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
                {editingExercise ? 'Editar Ejercicio Pedagógico' : 'Crear Nuevo Ejercicio Pedagógico'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Nombre del Ejercicio
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Sentadilla Goblet Guiada"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  ¿Por qué hacemos este ejercicio? (Propósito Biomecánico y Salud)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Explica qué adaptaciones genera en el cuerpo y por qué es importante..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Pasos de Ejecución Técnica (Uno por línea)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.stepsText}
                  onChange={(e) => setFormData({ ...formData, stepsText: e.target.value })}
                  placeholder="1. Paso uno...\n2. Paso dos..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Errores Comunes a Evitar (Uno por línea)
                </label>
                <textarea
                  rows={3}
                  value={formData.mistakesText}
                  onChange={(e) => setFormData({ ...formData, mistakesText: e.target.value })}
                  placeholder="Error postural 1...\nError 2..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Músculos y Articulaciones Involucradas (Separados por coma)
                </label>
                <input
                  type="text"
                  value={formData.musclesText}
                  onChange={(e) => setFormData({ ...formData, musclesText: e.target.value })}
                  placeholder="Cuádriceps, Glúteos, Core, Espalda"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '13px' }}
                >
                  {editingExercise ? 'Guardar Cambios' : 'Publicar Ejercicio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

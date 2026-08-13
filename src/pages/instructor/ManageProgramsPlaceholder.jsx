/**
 * Page: ManageProgramsPlaceholder (Instructor)
 * CRUD interface for Programs and Modules.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { programService } from '../../services/programService';
import { Layers, Plus, Trash2, Edit2, Check } from 'lucide-react';

export const ManageProgramsPlaceholder = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    level: 'Todos los niveles',
    durationWeeks: 8,
    badge: 'Nuevo Programa',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
  });
  const [loading, setLoading] = useState(true);

  const loadPrograms = async () => {
    try {
      const data = await programService.getPrograms();
      setPrograms(data);
    } catch (err) {
      console.error('Error loading programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) return;
    await programService.createProgram({
      ...newProgram,
      instructorId: user.id
    });
    setShowNewModal(false);
    setNewProgram({
      title: '',
      description: '',
      level: 'Todos los niveles',
      durationWeeks: 8,
      badge: 'Nuevo Programa',
      coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
    });
    await loadPrograms();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás segura de eliminar este programa?')) {
      await programService.deleteProgram(id);
      await loadPrograms();
    }
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando programas...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>Gestión de Programas de Formación</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Crea, edita y organiza los programas y sus módulos temáticos.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
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
          <Plus size={16} /> Crear Nuevo Programa
        </button>
      </div>

      {/* Creation Modal / Inline Form */}
      {showNewModal && (
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a' }}>Nuevo Programa de Formación</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Título del Programa</label>
              <input
                type="text"
                required
                value={newProgram.title}
                onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                placeholder="Ej. Fundamentos de Movilidad y Salud Articular"
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Descripción Pedagógica</label>
              <textarea
                rows={2}
                required
                value={newProgram.description}
                onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                placeholder="¿Qué aprenderán los alumnos en este programa?"
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Nivel</label>
                <input
                  type="text"
                  value={newProgram.level}
                  onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Duración (Semanas)</label>
                <input
                  type="number"
                  value={newProgram.durationWeeks}
                  onChange={(e) => setNewProgram({ ...newProgram, durationWeeks: Number(e.target.value) })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                type="submit"
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Guardar Programa
              </button>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Program list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {programs.map((p) => (
          <div key={p.id} style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src={p.coverImage} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {p.badge} &bull; {p.durationWeeks} sem
                </span>
                <h3 style={{ margin: '8px 0', fontSize: '16px', color: '#0f172a' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.4 }}>{p.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                >
                  <Trash2 size={13} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

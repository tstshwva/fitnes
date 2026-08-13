/**
 * Page: ManageProgramsPage (Instructor - Phase 4)
 * Complete curriculum and program builder for MOVARA.
 */

import React, { useEffect, useState } from 'react';
import { programService } from '../../services/programService';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  PlusCircle,
  FolderPlus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ManageProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedProgramForModules, setSelectedProgramForModules] = useState(null);
  const [expandedProgramId, setExpandedProgramId] = useState(null);
  const [programModules, setProgramModules] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    badge: 'Formación Continua',
    level: 'FUNDAMENTOS',
    durationWeeks: 4,
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    status: 'published'
  });

  const [moduleFormData, setModuleFormData] = useState({
    title: '',
    description: '',
    weekNumber: 1,
    order: 1
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const all = await programService.getPrograms();
      setPrograms(all);
    } catch (err) {
      console.error('Error loading programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      description: '',
      badge: 'Formación Continua',
      level: 'FUNDAMENTOS',
      durationWeeks: 4,
      coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      status: 'published'
    });
    setShowProgramModal(true);
  };

  const openEditModal = (prog) => {
    setEditingProgram(prog);
    setFormData({
      title: prog.title,
      description: prog.description,
      badge: prog.badge || 'Formación Continua',
      level: prog.level || 'FUNDAMENTOS',
      durationWeeks: prog.durationWeeks || 4,
      coverImage: prog.coverImage || '',
      status: prog.status || 'published'
    });
    setShowProgramModal(true);
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await programService.updateProgram(editingProgram.id, formData);
      } else {
        await programService.createProgram(formData);
      }
      setShowProgramModal(false);
      await loadPrograms();
    } catch (err) {
      console.error('Error saving program:', err);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (window.confirm('¿Estás segura de eliminar este programa formativo?')) {
      await programService.deleteProgram(id);
      await loadPrograms();
    }
  };

  const toggleExpand = async (progId) => {
    if (expandedProgramId === progId) {
      setExpandedProgramId(null);
    } else {
      setExpandedProgramId(progId);
      const mods = await programService.getModulesByProgram(progId);
      setProgramModules(mods);
    }
  };

  const openAddModuleModal = (prog) => {
    setSelectedProgramForModules(prog);
    setModuleFormData({
      title: '',
      description: '',
      weekNumber: 1,
      order: (programModules.length || 0) + 1
    });
    setShowModuleModal(true);
  };

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProgramForModules) return;
    try {
      await programService.createModule({
        ...moduleFormData,
        programId: selectedProgramForModules.id
      });
      setShowModuleModal(false);
      const updatedMods = await programService.getModulesByProgram(selectedProgramForModules.id);
      setProgramModules(updatedMods);
    } catch (err) {
      console.error('Error adding module:', err);
    }
  };

  const handleDeleteModule = async (moduleId, programId) => {
    if (window.confirm('¿Eliminar este módulo formativo?')) {
      await programService.deleteModule(moduleId);
      const updatedMods = await programService.getModulesByProgram(programId);
      setProgramModules(updatedMods);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Header Bar */}
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
            Planes de Estudio
          </span>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', color: '#ffffff' }}>
            Gestión de Programas y Módulos
          </h2>
          <p style={{ fontSize: '13px', color: '#dcfce7', margin: '6px 0 0 0' }}>
            Crea, estructura y publica los programas educativos de MOVARA.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn-primary" style={{ background: '#ffffff', color: '#14532d' }}>
          <Plus size={16} /> Crear Nuevo Programa
        </button>
      </div>

      {/* Program Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '8px' }}>🌿</div>
          <p>Cargando programas formativos...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="card-premium" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <p>Aún no has creado ningún programa.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {programs.map((prog, idx) => {
            const isExpanded = expandedProgramId === prog.id;
            return (
              <div
                key={prog.id}
                className={`card-premium animate-fade-up stagger-${(idx % 6) + 1}`}
                style={{ overflow: 'hidden' }}
              >
                {/* Main Card Row */}
                <div style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={prog.coverImage}
                    alt={prog.title}
                    style={{ width: '120px', height: '80px', borderRadius: '10px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge-pill badge-green" style={{ fontSize: '10px' }}>
                        Nivel {prog.level}
                      </span>
                      <span className="badge-pill badge-vitalia" style={{ fontSize: '10px' }}>
                        {prog.durationWeeks} Semanas
                      </span>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
                        {prog.status === 'published' ? '● Publicado' : '● Borrador'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 6px 0' }}>{prog.title}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {prog.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => toggleExpand(prog.id)}
                      className="btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {isExpanded ? 'Ocultar Módulos' : 'Ver Módulos'}
                    </button>
                    <button
                      onClick={() => openEditModal(prog)}
                      className="btn-secondary"
                      title="Editar programa"
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      <Edit2 size={14} /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(prog.id)}
                      className="btn-secondary"
                      title="Eliminar programa"
                      style={{ padding: '8px 12px', fontSize: '12px', color: '#ef4444', borderColor: '#fca5a5' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Modules Section */}
                {isExpanded && (
                  <div style={{ background: '#f8fafc', padding: '20px 24px', borderTop: '1px solid #e2e8f0' }} className="animate-fade">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '14px', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={16} color="#15803d" /> Módulos del Programa ({programModules.length})
                      </h4>
                      <button
                        onClick={() => openAddModuleModal(prog)}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <PlusCircle size={14} /> Añadir Módulo
                      </button>
                    </div>

                    {programModules.length === 0 ? (
                      <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                        Este programa no tiene módulos aún. Haz clic en "Añadir Módulo" para comenzar.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {programModules.map((mod, i) => (
                          <div
                            key={mod.id}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '8px',
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                                  Semana {mod.weekNumber || i + 1}
                                </span>
                                <h5 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>{mod.title}</h5>
                              </div>
                              {mod.description && (
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{mod.description}</p>
                              )}
                            </div>

                            <button
                              onClick={() => handleDeleteModule(mod.id, prog.id)}
                              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                              title="Eliminar módulo"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Program Modal (Create / Edit) */}
      {showProgramModal && (
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
          onClick={() => setShowProgramModal(false)}
        >
          <div
            className="card-premium animate-scale-in"
            style={{
              maxWidth: '600px',
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
                {editingProgram ? 'Editar Programa Formativo' : 'Crear Nuevo Programa'}
              </h3>
              <button
                onClick={() => setShowProgramModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProgramSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Título del Programa
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Movimiento Consciente & Biomecánica"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Descripción Pedagógica
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explica los objetivos, el enfoque de salud y la metodología..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Nivel Formativo
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  >
                    <option value="FUNDAMENTOS">Fundamentos / Principiante</option>
                    <option value="INTERMEDIO">Intermedio</option>
                    <option value="AVANZADO">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Duración (Semanas)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={formData.durationWeeks}
                    onChange={(e) => setFormData({ ...formData, durationWeeks: Number(e.target.value) })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  URL de Imagen de Portada
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
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
                  {editingProgram ? 'Guardar Cambios' : 'Publicar Programa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Module Modal (Add Module to Program) */}
      {showModuleModal && (
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
          onClick={() => setShowModuleModal(false)}
        >
          <div
            className="card-premium animate-scale-in"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              background: '#ffffff',
              borderRadius: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>
                Añadir Módulo a {selectedProgramForModules?.title}
              </h3>
              <button
                onClick={() => setShowModuleModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleModuleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Título del Módulo
                </label>
                <input
                  type="text"
                  required
                  value={moduleFormData.title}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, title: e.target.value })}
                  placeholder="Ej. Semana 1: Bases del Movimiento"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Número de Semana
                </label>
                <input
                  type="number"
                  min={1}
                  value={moduleFormData.weekNumber}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, weekNumber: Number(e.target.value) })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Objetivo del Módulo (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={moduleFormData.description}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, description: e.target.value })}
                  placeholder="¿Qué aprenderá el alumno en esta fase?..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Guardar Módulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

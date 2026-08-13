/**
 * Page: ManageClassesPage (Instructor - Phase 4)
 * Manage live virtual sessions and recorded masterclasses in MOVARA.
 */

import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { programService } from '../../services/programService';
import {
  Video,
  Radio,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  ExternalLink,
  X,
  PlayCircle,
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';

export const ManageClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [modules, setModules] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    programId: '',
    moduleId: '',
    type: 'live', // 'live' or 'recorded'
    durationMinutes: 45,
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    liveLink: 'https://meet.google.com/xyz-movara',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    keyTakeawaysText: 'Postura alineada\nRespiración rítmica\nActivación de abdomen profundo'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allCls, allProgs] = await Promise.all([
        classService.getAllClasses(),
        programService.getPrograms()
      ]);
      setClasses(allCls);
      setPrograms(allProgs);
      if (allProgs.length > 0) {
        const mods = await programService.getModulesByProgram(allProgs[0].id);
        setModules(mods);
      }
    } catch (err) {
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProgramChange = async (pId) => {
    setFormData((prev) => ({ ...prev, programId: pId, moduleId: '' }));
    const mods = await programService.getModulesByProgram(pId);
    setModules(mods);
    if (mods.length > 0) {
      setFormData((prev) => ({ ...prev, moduleId: mods[0].id }));
    }
  };

  const openCreateModal = (type = 'live') => {
    setEditingClass(null);
    const firstProg = programs[0]?.id || '';
    setFormData({
      title: '',
      description: '',
      programId: firstProg,
      moduleId: modules[0]?.id || '',
      type: type,
      durationMinutes: 45,
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      liveLink: 'https://meet.google.com/abc-movara',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      keyTakeawaysText: 'Alineación de columna\nConexión con la respiración\nActivación muscular controlada'
    });
    if (firstProg) {
      handleProgramChange(firstProg);
    }
    setShowModal(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setFormData({
      title: cls.title,
      description: cls.description || '',
      programId: cls.programId,
      moduleId: cls.moduleId,
      type: cls.type,
      durationMinutes: cls.durationMinutes || 45,
      date: cls.date || new Date().toISOString().split('T')[0],
      time: cls.time || '18:00',
      liveLink: cls.liveLink || '',
      videoUrl: cls.videoUrl || '',
      keyTakeawaysText: (cls.keyTakeaways || []).join('\n')
    });
    handleProgramChange(cls.programId);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const takeaways = formData.keyTakeawaysText
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        description: formData.description,
        programId: formData.programId,
        moduleId: formData.moduleId,
        type: formData.type,
        isLive: formData.type === 'live',
        durationMinutes: Number(formData.durationMinutes),
        date: formData.date,
        time: formData.time,
        liveLink: formData.liveLink,
        videoUrl: formData.videoUrl,
        keyTakeaways: takeaways
      };

      if (editingClass) {
        await classService.updateClass(editingClass.id, payload);
      } else {
        await classService.createClass(payload);
      }

      setShowModal(false);
      await loadData();
    } catch (err) {
      console.error('Error saving class:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás segura de eliminar esta clase?')) {
      await classService.deleteClass(id);
      await loadData();
    }
  };

  const filtered = classes.filter((c) => {
    if (filterType === 'live') return c.type === 'live';
    if (filterType === 'recorded') return c.type === 'recorded';
    return true;
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
            Aula y Videoteca
          </span>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', color: '#ffffff' }}>
            Gestión de Clases en Vivo y Grabadas
          </h2>
          <p style={{ fontSize: '13px', color: '#dcfce7', margin: '6px 0 0 0' }}>
            Programa sesiones en directo con enlace a Zoom / Meet o sube lecciones a la videoteca.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => openCreateModal('live')}
            className="btn-primary"
            style={{ background: '#7c3aed', borderColor: '#7c3aed', color: '#ffffff' }}
          >
            <Radio size={16} /> Programar Clase en Vivo
          </button>
          <button
            onClick={() => openCreateModal('recorded')}
            className="btn-primary"
            style={{ background: '#ffffff', color: '#14532d' }}
          >
            <Plus size={16} /> Publicar Clase Grabada
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} className="animate-fade-up stagger-2">
        {[
          { id: 'all', label: `Todas (${classes.length})` },
          { id: 'live', label: `En Vivo (${classes.filter((c) => c.type === 'live').length})` },
          { id: 'recorded', label: `Grabadas (${classes.filter((c) => c.type === 'recorded').length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: filterType === tab.id ? '1px solid #15803d' : '1px solid #cbd5e1',
              background: filterType === tab.id ? '#f0fdf4' : '#ffffff',
              color: filterType === tab.id ? '#15803d' : '#475569',
              fontWeight: filterType === tab.id ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div className="pulse-indicator" style={{ fontSize: '28px', marginBottom: '8px' }}>🌿</div>
          <p>Cargando clases...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-premium" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <p>No se encontraron clases con este filtro.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((cls, idx) => {
            const isLive = cls.type === 'live';
            return (
              <div
                key={cls.id}
                className={`card-premium animate-fade-up stagger-${(idx % 6) + 1}`}
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Badge & Program */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className={isLive ? 'badge-pill badge-purple' : 'badge-pill badge-green'} style={{ fontSize: '11px' }}>
                      {isLive ? <Radio size={12} className="pulse-indicator" /> : <PlayCircle size={12} />}
                      {isLive ? 'En Vivo' : 'Grabada'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {cls.durationMinutes} min
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                    {cls.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                    {cls.description || 'Sin descripción detallada.'}
                  </p>

                  <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                    <div><strong>Programa:</strong> {cls.program?.title || 'No asignado'}</div>
                    {isLive && cls.date && (
                      <div><strong>Fecha:</strong> {new Date(cls.date).toLocaleDateString()} {cls.time && `&bull; ${cls.time}`}</div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  {isLive && cls.liveLink && (
                    <a
                      href={cls.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12px', color: '#7c3aed', borderColor: '#ddd6fe' }}
                    >
                      <ExternalLink size={14} /> Sala
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(cls)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                  >
                    <Edit2 size={14} /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '12px', color: '#ef4444', borderColor: '#fca5a5' }}
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Create or Edit Class */}
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
              maxWidth: '620px',
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
                {editingClass ? 'Editar Clase' : formData.type === 'live' ? 'Programar Clase en Vivo' : 'Publicar Clase Grabada'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Modalidad de Clase
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                >
                  <option value="live">Clase Magistral en Vivo (Directo)</option>
                  <option value="recorded">Lección Grabada en Videoteca</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Título de la Clase
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Clase Magistral: Respiración y Estabilidad Lumbar"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Programa Asociado
                  </label>
                  <select
                    value={formData.programId}
                    onChange={(e) => handleProgramChange(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  >
                    <option value="">Selecciona un programa...</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Módulo Asociado
                  </label>
                  <select
                    value={formData.moduleId}
                    onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                  >
                    <option value="">Selecciona un módulo...</option>
                    {modules.map((m) => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.type === 'live' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Fecha</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Hora</label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Duración (min)</label>
                      <input
                        type="number"
                        min={10}
                        value={formData.durationMinutes}
                        onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Enlace a Sala Virtual (Zoom / Google Meet)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.liveLink}
                      onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                      placeholder="https://meet.google.com/..."
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      URL del Video (YouTube Embed / Vimeo / MP4)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Duración de la lección (minutos)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                    />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Puntos Clave / Aprendizajes (Uno por línea)
                </label>
                <textarea
                  rows={3}
                  value={formData.keyTakeawaysText}
                  onChange={(e) => setFormData({ ...formData, keyTakeawaysText: e.target.value })}
                  placeholder="Escribe cada punto clave en un renglón..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Descripción Pedagógica
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles sobre lo que se trabajará en esta lección..."
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
                  {editingClass ? 'Guardar Cambios' : 'Publicar Clase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

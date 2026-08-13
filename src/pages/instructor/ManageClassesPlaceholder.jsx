/**
 * Page: ManageClassesPlaceholder (Instructor)
 * CRUD interface for live and recorded classes.
 */

import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { programService } from '../../services/programService';
import { Video, Plus, Trash2, Calendar, Radio } from 'lucide-react';

export const ManageClassesPlaceholder = () => {
  const [classes, setClasses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    programId: '',
    moduleId: 'mod_1',
    type: 'recorded', // 'live' | 'recorded'
    date: '',
    durationMinutes: 45,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    liveLink: 'https://meet.google.com/demo-stream'
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [allCls, allProgs] = await Promise.all([
        classService.getAllClasses(),
        programService.getPrograms()
      ]);
      setClasses(allCls);
      setPrograms(allProgs);
      if (allProgs.length > 0 && !newClass.programId) {
        setNewClass((prev) => ({ ...prev, programId: allProgs[0].id }));
      }
    } catch (err) {
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await classService.createClass({
      ...newClass,
      keyTakeaways: ['Concepto clave 1', 'Concepto clave 2']
    });
    setShowModal(false);
    await loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar esta clase?')) {
      await classService.deleteClass(id);
      await loadData();
    }
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando clases...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>Gestión de Clases</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Programa sesiones en directo o sube lecciones grabadas para los programas.
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
          <Plus size={16} /> Programar / Crear Clase
        </button>
      </div>

      {showModal && (
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a' }}>Nueva Clase</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Título de la Clase</label>
              <input
                type="text"
                required
                value={newClass.title}
                onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                placeholder="Ej. Taller: Alineación de Columna en Ejercicios de Empuje"
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Descripción</label>
              <textarea
                rows={2}
                required
                value={newClass.description}
                onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                placeholder="Temario y propósito de la clase..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Tipo de Clase</label>
                <select
                  value={newClass.type}
                  onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="recorded">Clase Grabada (Video)</option>
                  <option value="live">Clase En Vivo (Directo)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Programa Destino</label>
                <select
                  value={newClass.programId}
                  onChange={(e) => setNewClass({ ...newClass, programId: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              {newClass.type === 'live' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Fecha y Hora</label>
                  <input
                    type="datetime-local"
                    value={newClass.date}
                    onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Duración (Minutos)</label>
                  <input
                    type="number"
                    value={newClass.durationMinutes}
                    onChange={(e) => setNewClass({ ...newClass, durationMinutes: Number(e.target.value) })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                type="submit"
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Guardar Clase
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

      {/* Classes Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Título</th>
              <th style={{ padding: '12px 16px' }}>Tipo</th>
              <th style={{ padding: '12px 16px' }}>Programa</th>
              <th style={{ padding: '12px 16px' }}>Duración / Fecha</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{cls.title}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{cls.description}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      background: cls.type === 'live' ? '#f5f3ff' : '#eff6ff',
                      color: cls.type === 'live' ? '#7c3aed' : '#2563eb',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    {cls.type === 'live' ? 'En Vivo' : 'Grabada'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>
                  {cls.program?.title || cls.programId}
                </td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>
                  {cls.type === 'live' && cls.date
                    ? new Date(cls.date).toLocaleDateString()
                    : `${cls.durationMinutes} min`}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(cls.id)}
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

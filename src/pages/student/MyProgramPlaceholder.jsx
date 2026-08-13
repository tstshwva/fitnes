/**
 * Page: MyProgramPlaceholder (Student)
 * Displays the syllabus/curriculum of the student's enrolled program.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import { programService } from '../../services/programService';
import { progressService } from '../../services/progressService';
import {
  Layers,
  CheckCircle,
  Circle,
  Video,
  FileText,
  Clock,
  PlayCircle
} from 'lucide-react';

export const MyProgramPlaceholder = () => {
  const { user } = useAuth();
  const [programData, setProgramData] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCurriculum = async () => {
    if (!user) return;
    try {
      const enrollments = await enrollmentService.getByStudentId(user.id);
      const activeEnr = enrollments.find((e) => e.status === 'active') || enrollments[0];

      if (activeEnr) {
        const [fullProgram, progressList] = await Promise.all([
          programService.getProgramWithCurriculum(activeEnr.programId),
          progressService.getProgressByStudent(user.id)
        ]);
        setProgramData(fullProgram);
        setUserProgress(progressList);
      }
    } catch (err) {
      console.error('Error loading program curriculum:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurriculum();
  }, [user]);

  const handleToggleClass = async (classId) => {
    if (!user || !programData) return;
    await progressService.toggleClassCompleted(user.id, classId, programData.id);
    const updatedProgress = await progressService.getProgressByStudent(user.id);
    setUserProgress(updatedProgress);
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando programa y módulos...</div>;

  if (!programData) {
    return (
      <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
        <h3>No tienes un programa asignado</h3>
        <p style={{ color: '#64748b' }}>Explora los programas disponibles o contacta a la instructora.</p>
      </div>
    );
  }

  const isClassCompleted = (classId) => {
    const item = userProgress.find((p) => p.classId === classId);
    return !!item?.completed;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Program Header */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <img
          src={programData.coverImage}
          alt={programData.title}
          style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div style={{ flex: 1, minWidth: '260px' }}>
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
            {programData.badge} &bull; {programData.level}
          </span>
          <h2 style={{ fontSize: '22px', margin: '8px 0', color: '#0f172a' }}>{programData.title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: '0 0 12px 0' }}>
            {programData.description}
          </p>
          <span style={{ fontSize: '12px', color: '#334155', fontWeight: 600 }}>
            Duración estimada: {programData.durationWeeks} semanas &bull; {programData.modules?.length || 0} módulos temáticos
          </span>
        </div>
      </div>

      {/* Modules & Classes List */}
      <div>
        <h3 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '16px' }}>Módulos del Programa</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {programData.modules?.map((mod) => (
            <div key={mod.id} style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{mod.title}</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{mod.description}</p>
              </div>

              {/* Classes in Module */}
              <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mod.classes?.map((cls) => {
                  const completed = isClassCompleted(cls.id);
                  return (
                    <div
                      key={cls.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        background: completed ? '#f0fdf4' : '#ffffff',
                        border: `1px solid ${completed ? '#bbf7d0' : '#f1f5f9'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => handleToggleClass(cls.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                          title={completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                        >
                          {completed ? <CheckCircle size={20} color="#16a34a" /> : <Circle size={20} color="#94a3b8" />}
                        </button>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                            {cls.title}
                          </p>
                          <span style={{ fontSize: '11px', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            {cls.type === 'live' ? (
                              <span style={{ color: '#8b5cf6', fontWeight: 600 }}>En Vivo</span>
                            ) : (
                              <span style={{ color: '#0284c7' }}>Grabada</span>
                            )}
                            &bull; <Clock size={12} /> {cls.durationMinutes} min
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {cls.type === 'live' && cls.liveLink ? (
                          <a
                            href={cls.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{ background: '#8b5cf6', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
                          >
                            Unirse
                          </a>
                        ) : null}
                      </div>
                    </div>
                  );
                })}

                {/* Resources in Module */}
                {mod.resources?.length > 0 && (
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Material complementario:</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {mod.resources.map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            background: '#f1f5f9',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#334155',
                            textDecoration: 'none'
                          }}
                        >
                          <FileText size={13} color="#2563eb" /> {res.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

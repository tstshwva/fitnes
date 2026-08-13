/**
 * Page: ManageStudentsPlaceholder (Instructor)
 * Displays student directory, enrollments, evaluation status, and progress metrics.
 */

import React, { useEffect, useState } from 'react';
import { authService } from '../../services/authService';
import { enrollmentService } from '../../services/enrollmentService';
import { evaluationService } from '../../services/evaluationService';
import { Users, Mail, CheckCircle, Clock } from 'lucide-react';

export const ManageStudentsPlaceholder = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [studs, enrs, evals] = await Promise.all([
          authService.getStudents(),
          enrollmentService.getAllEnrollments(),
          evaluationService.getAllEvaluations()
        ]);
        setStudents(studs);
        setEnrollments(enrs);
        setEvaluations(evals);
      } catch (err) {
        console.error('Error loading students:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  if (loading) return <div style={{ padding: '24px' }}>Cargando lista de alumnos...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>Gestión de Alumnos</h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Supervisa el estado de inscripción y evaluación inicial de tus estudiantes.
        </p>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Alumno</th>
              <th style={{ padding: '12px 16px' }}>Correo</th>
              <th style={{ padding: '12px 16px' }}>Programa Inscrito</th>
              <th style={{ padding: '12px 16px' }}>Evaluación Inicial</th>
              <th style={{ padding: '12px 16px' }}>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const studentEnr = enrollments.find((e) => e.studentId === student.id);
              const studentEval = evaluations.find((ev) => ev.studentId === student.id);

              return (
                <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{student.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {studentEnr?.program ? (
                      <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                        {studentEnr.program.title}
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>Sin inscripción</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {studentEval ? (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <CheckCircle size={14} /> Completada ({studentEval.currentLevel})
                      </span>
                    ) : (
                      <span style={{ color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> Pendiente
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

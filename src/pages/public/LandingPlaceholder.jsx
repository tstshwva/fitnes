/**
 * Page: LandingPlaceholder (Public)
 * Shows general program information and enrollment entry points.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { programService } from '../../services/programService';
import { BookOpen, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export const LandingPlaceholder = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    programService.getPrograms().then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '48px 32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}
      >
        <span
          style={{
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-block',
            marginBottom: '16px'
          }}
        >
          Formación Continua y Cultura Física
        </span>
        <h2 style={{ fontSize: '28px', margin: '0 0 16px 0', lineHeight: 1.3 }}>
          ¿Te gustaría entender realmente qué sucede en tu cuerpo cuando haces ejercicio?
        </h2>
        <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '750px', lineHeight: 1.6, margin: '0 0 24px 0' }}>
          El conocimiento transforma. En este programa aprenderás, de forma clara y práctica, cómo el ejercicio,
          la alimentación consciente y el descanso trabajan juntos para mejorar tu bienestar y salud con confianza.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/register"
            style={{
              background: '#2563eb',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Comenzar Formación <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            style={{
              background: '#334155',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Acceder a mi cuenta
          </Link>
        </div>
      </div>

      {/* Pillars Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { title: 'Cultura Física & Deporte', desc: 'Fundamentos biomecánicos y propósito de cada movimiento.' },
          { title: 'Alimentación Consciente', desc: 'Aprende cómo nutrir tus células y optimizar tu energía diaria.' },
          { title: 'Descanso Regenerativo', desc: 'Fisiología del sueño y protocolos de recuperación activa.' },
          { title: 'Acompañamiento Continuo', desc: 'Clases en vivo, lecciones grabadas y biblioteca de ejercicios.' }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          >
            <CheckCircle size={20} color="#2563eb" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '16px', margin: '0 0 6px 0', color: '#1e293b' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Available Programs loaded from Service */}
      <div>
        <h3 style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#1e293b' }}>
          Programas Disponibles (Cargados desde `programService`)
        </h3>
        {loading ? (
          <p>Cargando programas disponibles...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {programs.map((p) => (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={p.coverImage}
                  alt={p.title}
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      width: 'fit-content',
                      marginBottom: '8px'
                    }}
                  >
                    {p.badge} &bull; {p.durationWeeks} semanas
                  </span>
                  <h4 style={{ fontSize: '16px', margin: '0 0 8px 0', color: '#0f172a' }}>{p.title}</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0', flex: 1 }}>
                    {p.description}
                  </p>
                  <Link
                    to="/login"
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    Ver detalles e inscribirse
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

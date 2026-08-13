/**
 * Page: LandingPage (Public)
 * High-impact presentation for the "Programa de Educación y Formación Continua".
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { programService } from '../../services/programService';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Activity,
  HeartPulse,
  Moon,
  Video,
  FileText,
  ShieldCheck,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

export const LandingPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    programService.getPrograms().then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }} className="animate-fade">
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '64px 40px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Decorative background glows */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '20%',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#93c5fd',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '24px'
            }}
          >
            <Sparkles size={14} color="#60a5fa" />
            Educación y Formación Continua &bull; Yessi Lizama
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 20px 0',
              color: '#ffffff'
            }}
          >
            ¿Te gustaría entender realmente qué sucede en tu cuerpo cuando haces ejercicio?
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#cbd5e1',
              lineHeight: 1.6,
              margin: '0 0 32px 0'
            }}
          >
            En este programa aprenderás, de forma clara y práctica, cómo el ejercicio consciente, la alimentación adecuada y el descanso reparador trabajan juntos para transformar tu bienestar.
          </p>

          {/* Inspirational block quote */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderLeft: '4px solid #3b82f6',
              padding: '16px 20px',
              borderRadius: '0 12px 12px 0',
              marginBottom: '36px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <p style={{ margin: 0, fontSize: '15px', color: '#e2e8f0', fontStyle: 'italic', fontWeight: 500 }}>
              "El conocimiento transforma. El saber te da el poder para avanzar y cuidar tu salud con confianza."
            </p>
            <span style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600, display: 'block', marginTop: '6px' }}>
              &mdash; Yessi Lizama, Instructora y Educadora de Cultura Física
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/register"
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px', borderRadius: '10px' }}
            >
              Comenzar Ahora <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '14px 24px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Acceso a Alumnos
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 3 FUNDAMENTAL QUESTIONS */}
      <section>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
          <span className="badge-pill badge-blue" style={{ marginBottom: '12px' }}>
            Enfoque Consciente
          </span>
          <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '0 0 12px 0' }}>
            Supera las dudas que frenan tus resultados
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
            La mayoría de las personas repiten rutinas genéricas sin saber su propósito. Nosotros te damos las respuestas con base científica y pedagógica.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: <HeartPulse size={24} color="#2563eb" />,
              badge: 'Fisiología',
              question: '¿Sabes cómo influye la alimentación en tu salud y en tus resultados?',
              answer: 'Aprende qué nutrientes necesita tu cuerpo para rendir, recuperarse y mantener niveles óptimos de energía sin restricciones dañinas.'
            },
            {
              icon: <Activity size={24} color="#059669" />,
              badge: 'Biomecánica',
              question: '¿Estás realizando los ejercicios adecuados para ti o solo repites rutinas?',
              answer: 'Domina los patrones de movimiento esenciales (sentadillas, empujes, tracciones) conociendo el porqué y cómo de cada músculo activado.'
            },
            {
              icon: <Moon size={24} color="#7c3aed" />,
              badge: 'Recuperación',
              question: '¿Comprendes la importancia vital del descanso reparador?',
              answer: 'El entrenamiento estimula, pero el descanso consolida las adaptaciones. Descubre cómo el sueño regenera tu sistema neuromuscular.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="card-premium"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                  {item.badge}
                </span>
                <h3 style={{ fontSize: '17px', color: '#0f172a', margin: '8px 0 12px 0', lineHeight: 1.4 }}>
                  {item.question}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROGRAMS SHOWCASE */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <span className="badge-pill badge-green" style={{ marginBottom: '8px' }}>
              Oferta Académica
            </span>
            <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '4px 0 0 0' }}>
              Programas de Formación Continua
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0' }}>
              Planes estructurados paso a paso con módulos temáticos y acompañamiento.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Cargando programas...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {programs.map((p) => (
              <div
                key={p.id}
                className="card-premium"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', height: '190px' }}>
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {p.badge}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(37, 99, 235, 0.9)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}
                  >
                    {p.durationWeeks} Semanas
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
                      Nivel: {p.level}
                    </span>
                    <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '6px 0 10px 0', lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                      {p.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100"
                        alt="Yessi Lizama"
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Yessi Lizama</span>
                    </div>

                    <Link
                      to="/login"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      Inscribirme <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. INSTRUCTOR & PHILOSOPHY SPOTLIGHT */}
      <section
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        <div>
          <span className="badge-pill badge-purple" style={{ marginBottom: '12px' }}>
            Conoce a tu Instructora
          </span>
          <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '0 0 16px 0' }}>
            Yessi Lizama
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: '0 0 16px 0' }}>
            Especialista en Cultura Física, Deporte y Salud Integral. Su misión pedagógica es democratizar el conocimiento del cuerpo para que cada persona aprenda a entrenar, alimentarse y descansar con criterio propio y máxima seguridad.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Acompañamiento personalizado en clases en vivo',
              'Explicaciones claras y libres de dogmas de internet',
              'Corrección técnica y análisis biomecánico de movimientos'
            ].map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#10b981" />
                {pt}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&auto=format&fit=crop&q=80"
            alt="Yessi Lizama"
            style={{ width: '100%', maxWidth: '340px', height: '360px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
          />
        </div>
      </section>
    </div>
  );
};

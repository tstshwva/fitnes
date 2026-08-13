/**
 * Component: Layout
 * Master layout wrapper with MOVARA brand identity.
 */

import React from 'react';
import { Header } from './Header';
import { DevRoleSwitcher } from './DevRoleSwitcher';
import { Heart, Sparkles, BookOpen, ShieldCheck, Activity } from 'lucide-react';

export const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Dev Role Switcher Toolbar */}
      <DevRoleSwitcher />

      {/* Main Top Navigation Header */}
      <Header />

      {/* Main Container */}
      <main style={{ flex: 1, padding: '32px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: '#0c1a13',
          color: '#f8fafc',
          borderTop: '1px solid #163824',
          padding: '48px 24px 24px 24px',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #15803d, #0c3822)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '18px',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                M
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '0.04em' }}>
                  MOVARA
                </h3>
                <span style={{ fontSize: '11px', color: '#84cc16', fontWeight: 700, textTransform: 'uppercase' }}>
                  Educación &bull; Movimiento &bull; Bienestar
                </span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
              "El conocimiento transforma. El saber te da el poder para avanzar y cuidar tu salud con confianza."
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '14px', color: '#ffffff', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pilares de Formación
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>&bull; Cultura Física &amp; Deporte</li>
              <li>&bull; Biomecánica y Patrones Motores</li>
              <li>&bull; Alimentación con Propósito</li>
              <li>&bull; Fisiología del Sueño y Descanso</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '14px', color: '#ffffff', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Modalidad y Recursos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>&bull; Clases Magistrales en Vivo</li>
              <li>&bull; Videoteca de Lecciones Grabadas</li>
              <li>&bull; Biblioteca Pedagógica de Ejercicios</li>
              <li>&bull; Guías y Manuales Descargables</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            paddingTop: '24px',
            borderTop: '1px solid #163824',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#64748b'
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} MOVARA &bull; Educación, Movimiento y Bienestar &bull; Instructora Yessi Lizama.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#22c55e" />
            <span>Arquitectura desacoplada: Services &bull; Mock Client &bull; LocalStorage</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

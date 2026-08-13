/**
 * Page: LibraryPage (Student - Phase 3)
 * Educational resource repository with downloadable guides, checklists, and articles.
 */

import React, { useEffect, useState } from 'react';
import { resourceService } from '../../services/resourceService';
import {
  FileText,
  Download,
  Search,
  BookOpen,
  CheckSquare,
  FileCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const LibraryPage = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourceService.getAllResources().then((data) => {
      setResources(data);
      setLoading(false);
    });
  }, []);

  const filtered = resources.filter((res) => {
    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <p>Cargando biblioteca de recursos...</p>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText size={20} color="#2563eb" />;
      case 'guide':
        return <CheckSquare size={20} color="#059669" />;
      case 'article':
        return <BookOpen size={20} color="#7c3aed" />;
      default:
        return <FileCheck size={20} color="#3b82f6" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0' }}>
          Biblioteca y Material Educativo
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Descarga manuales prácticos, checklists de postura y lecturas complementarias de formación.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Buscar por tema o título de la guía..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'pdf', 'guide', 'article'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                background: typeFilter === t ? '#2563eb' : '#ffffff',
                color: typeFilter === t ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                textTransform: 'capitalize',
                cursor: 'pointer',
                fontWeight: typeFilter === t ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
            >
              {t === 'all' ? 'Todos los Documentos' : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {filtered.map((res) => (
          <div
            key={res.id}
            className="card-premium"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  {res.type} &bull; {res.fileSize}
                </span>
                {getTypeIcon(res.type)}
              </div>

              <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#0f172a', lineHeight: 1.3 }}>
                {res.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                {res.description}
              </p>
            </div>

            <a
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '8px' }}
            >
              <Download size={14} /> Abrir / Descargar Documento
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

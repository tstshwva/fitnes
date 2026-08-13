/**
 * Page: LibraryPlaceholder (Student)
 * Educational resource repository (PDFs, checklists, guides, articles).
 */

import React, { useEffect, useState } from 'react';
import { resourceService } from '../../services/resourceService';
import { FileText, Download, BookOpen, Search } from 'lucide-react';

export const LibraryPlaceholder = () => {
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
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return <div style={{ padding: '24px' }}>Cargando biblioteca de recursos...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '22px', margin: '0 0 4px 0', color: '#0f172a' }}>
          Biblioteca y Material Educativo
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Descarga guías prácticas, manuales de postura y lecturas complementarias.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Buscar por tema o título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'pdf', 'guide', 'article'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              style={{
                background: typeFilter === type ? '#2563eb' : '#ffffff',
                color: typeFilter === type ? '#ffffff' : '#475569',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                textTransform: 'capitalize',
                cursor: 'pointer',
                fontWeight: typeFilter === type ? 600 : 400
              }}
            >
              {type === 'all' ? 'Todos' : type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map((res) => (
          <div
            key={res.id}
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  {res.type} &bull; {res.fileSize}
                </span>
                <FileText size={18} color="#2563eb" />
              </div>

              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#0f172a' }}>{res.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                {res.description}
              </p>
            </div>

            <a
              href={res.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '8px 12px',
                borderRadius: '6px',
                color: '#1e293b',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <Download size={14} /> Abrir / Descargar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

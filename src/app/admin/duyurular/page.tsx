"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Duyurular() {
  const { data: duyurular, updateData } = useAppStore('duyurular');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addDuyuru = (e: React.FormEvent) => {
    e.preventDefault();
    const newDuyuru = {
      id: Date.now(),
      title: newTitle,
      content: newContent
    };
    updateData([newDuyuru, ...duyurular]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const deleteDuyuru = (id: number) => {
    if (window.confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) {
      updateData(duyurular.filter((d: any) => d.id !== id));
    }
  };

  const filteredDuyurular = duyurular.filter((d: any) => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, color: '#0f172a', fontWeight: '800', letterSpacing: '-0.5px' }}>Duyuru Yönetimi</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Anasayfadaki kayar yazı duyurularını buradan yönetin.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          style={{ background: '#f16101', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(241, 97, 1, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Yeni Duyuru Ekle
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Duyurularda ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }}
          />
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', background: '#f1f5f9', padding: '8px 15px', borderRadius: '8px' }}>
          Toplam: {duyurular.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredDuyurular.length === 0 ? (
          <div style={{ gridColumn: '1/-1', padding: '60px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#94a3b8', margin: 0 }}>Duyuru bulunamadı.</p>
          </div>
        ) : (
          filteredDuyurular.map((d: any) => (
            <div key={d.id} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s' }} className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>AKTİF DUYURU</div>
                <button 
                  onClick={() => deleteDuyuru(d.id)} 
                  style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}
                >
                  Sil
                </button>
              </div>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4' }}>{d.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{d.content}</p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Yeni Duyuru Ekle</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', color: '#64748b' }}>×</button>
            </div>
            <form onSubmit={addDuyuru}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#334155' }}>Duyuru Başlığı</label>
                <input 
                  type="text" 
                  placeholder="Kısa ve öz bir başlık..." 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '1rem' }} 
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#334155' }}>Duyuru İçeriği</label>
                <textarea 
                  placeholder="Duyuru detaylarını buraya yazın..." 
                  value={newContent} 
                  onChange={(e) => setNewContent(e.target.value)} 
                  required 
                  rows={5} 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '1rem', resize: 'vertical' }}
                ></textarea>
              </div>
              <button 
                type="submit" 
                style={{ width: '100%', background: '#f16101', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(241, 97, 1, 0.3)' }}
              >
                Duyuruyu Yayınla
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Duyurular() {
  const { data: duyurular, updateData } = useAppStore('duyurular');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addDuyuru = (e: React.FormEvent) => {
    e.preventDefault();
    const newDuyuru = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      content: newContent
    };
    updateData([newDuyuru, ...duyurular]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const deleteDuyuru = (id: number) => {
    updateData(duyurular.filter((d: any) => d.id !== id));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>Duyuru Yönetimi</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>+ Yeni Duyuru Ekle</button>
      </div>

      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
        {duyurular.length === 0 ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
            Şu anda aktif bir duyuru bulunmamaktadır.
          </div>
        ) : (
          duyurular.map((d: any) => (
            <div key={d.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative', border: '1px solid #e2e8f0' }}>
              <button onClick={() => deleteDuyuru(d.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Sil</button>
              <h3 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '1rem', paddingRight: '40px', fontWeight: '800' }}>{d.title}</h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px', fontWeight: '600' }}>{d.date}</p>
              <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d.content}</p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Duyuru Ekle</h2>
            <form onSubmit={addDuyuru}>
              <input type="text" placeholder="Başlık" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <textarea placeholder="Duyuru İçeriği" value={newContent} onChange={(e) => setNewContent(e.target.value)} required rows={4} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'vertical' }}></textarea>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>İptal</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>Duyuru Yönetimi</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Yeni Duyuru</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {duyurular.length === 0 ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}>
            <p>Şu anda aktif bir duyuru bulunmamaktadır.</p>
          </div>
        ) : (
          duyurular.map((d: any) => (
            <div key={d.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#012237' }}>{d.title}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>{d.date}</p>
              <p style={{ color: '#475569' }}>{d.content}</p>
              <button onClick={() => deleteDuyuru(d.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Sil</button>
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
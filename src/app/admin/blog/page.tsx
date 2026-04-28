"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import ImageUploader from '@/components/ImageUploader';

export default function Blog() {
  const { data: blogs, updateData } = useAppStore('blog');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (url: string) => {
    setNewPhoto(url);
  };

  const handleDeletePhoto = () => {
    setNewPhoto(null);
  };

  const addBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      alert('Başlık ve içerik zorunludur');
      return;
    }
    updateData([
      { id: Date.now(), title: newTitle, author: 'Yönetici', date: new Date().toISOString().split('T')[0], content: newContent, photo: newPhoto },
      ...blogs
    ]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewPhoto(null);
  };

  const deleteBlog = (id: number) => {
    updateData(blogs.filter((b: any) => b.id !== id));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>Etkinlik ve Paylaşımlar</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>+ Yeni Paylaşım</button>
      </div>

      <div className="admin-card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
              <th style={{ padding: '0.75rem 1rem', width: '60px' }}>Görsel</th>
              <th style={{ padding: '0.75rem 1rem' }}>Başlık</th>
              <th style={{ padding: '0.75rem 1rem' }}>Tarih</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (<tr><td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Henüz paylaşım eklenmedi.</td></tr>)}
            {blogs.map((b: any) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '0.75rem 1rem' }}>
                  {b.photo ? (
                    <img src={b.photo} alt="Görsel" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📷</div>
                  )}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e293b' }}>{b.title}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{b.date}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <button onClick={() => deleteBlog(b.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Etkinlik/Paylaşım Ekle</h2>
            <form onSubmit={addBlog}>
              <ImageUploader 
                onImageUpload={handlePhotoUpload}
                onImageDelete={handleDeletePhoto}
                folder="blog"
                label="Paylaşım Görseli (İsteğe Bağlı)"
                currentImage={newPhoto}
              />

              <input 
                type="text" 
                placeholder="Başlık" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box' }} 
              />
              <textarea 
                placeholder="Paylaşım İçeriği / Açıklama" 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)} 
                required 
                rows={5} 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }}
              ></textarea>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); setNewTitle(''); setNewContent(''); setNewPhoto(null); }} style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>İptal</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Yayınla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
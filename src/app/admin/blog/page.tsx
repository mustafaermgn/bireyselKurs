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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>Etkinlik ve Paylaşımlar</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Yeni Paylaşım</button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #cbd5e1', background: '#f8fafc' }}>
              <th style={{ padding: '15px', width: '80px' }}>Görsel</th>
              <th style={{ padding: '15px' }}>Başlık</th>
              <th style={{ padding: '15px' }}>Tarih</th>
              <th style={{ padding: '15px' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (<tr><td colSpan={4} style={{ padding: '15px', textAlign: 'center' }}>Henüz paylaşım eklenmedi.</td></tr>)}
            {blogs.map((b: any) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px' }}>
                  {b.photo ? (
                    <img src={b.photo} alt="Görsel" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📷</div>
                  )}
                </td>
                <td style={{ padding: '15px', fontWeight: '500' }}>{b.title}</td>
                <td style={{ padding: '15px', color: '#64748b' }}>{b.date}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => deleteBlog(b.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
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
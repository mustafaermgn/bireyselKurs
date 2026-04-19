"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import ImageUploader from '@/components/ImageUploader';

export default function Medya() {
  const { data: files, updateData } = useAppStore('medya');
  const [editingId, setEditingId] = useState<number | string | null>(null);

  const handleImageUpload = (url: string) => {
    const newFile = {
      id: Date.now(),
      name: `Görsel ${files.length + 1}`,
      url: url,
      description: '',
      extraImages: [] as { url: string; description: string; }[]
    };
    updateData([...files, newFile]);
  };

  const handleImageDelete = (url: string) => {
    updateData(files.filter((f: any) => f.url !== url));
  };

  const deleteFile = (id: number | string) => {
    updateData(files.filter((f: any) => f.id !== id));
  };

  const updateFileDesc = (id: number | string, name: string, desc: string) => {
    updateData(files.map((f: any) => f.id === id ? { ...f, name, description: desc } : f));
  };

  const addExtraImage = (id: number | string, url: string) => {
    updateData(files.map((f: any) => {
      if (f.id === id) {
        const existing = f.extraImages || [];
        // Mevcut veriler string ise objeye çevir
        const normalized = existing.map((img: any) => typeof img === 'string' ? { url: img, description: '' } : img);
        return { ...f, extraImages: [...normalized, { url, description: '' }] };
      }
      return f;
    }));
  };

  const updateExtraImageDesc = (fileId: number | string, imgIdx: number, desc: string) => {
    updateData(files.map((f: any) => {
      if (f.id === fileId) {
        const updated = (f.extraImages || []).map((img: any, idx: number) => {
          if (idx === imgIdx) {
            const imgObj = typeof img === 'string' ? { url: img, description: '' } : img;
            return { ...imgObj, description: desc };
          }
          return img;
        });
        return { ...f, extraImages: updated };
      }
      return f;
    }));
  };

  const removeExtraImage = (id: number | string, idx: number) => {
    updateData(files.map((f: any) => {
      if (f.id === id) {
        const updated = [...(f.extraImages || [])];
        updated.splice(idx, 1);
        return { ...f, extraImages: updated };
      }
      return f;
    }));
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0f172a' }}>Medya Yönetimi</h1>
      
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <ImageUploader 
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          folder="medya"
          label="Galeri Görseli Yükle"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {files.map((file: any) => (
          <div key={file.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', border: editingId === file.id ? '2px solid var(--primary-color)' : '1px solid #e2e8f0' }}>
            <img src={file.url} alt={file.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
            <input 
              type="text" 
              placeholder="Görsel adı..." 
              value={file.name || ''} 
              onChange={(e) => updateFileDesc(file.id, e.target.value, file.description || '')}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
            />
            <textarea 
              placeholder="Sayfa içeriği / Açıklama..." 
              value={file.description || ''} 
              onChange={(e) => updateFileDesc(file.id, file.name, e.target.value)}
              style={{ width: '100%', height: '80px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '10px', resize: 'vertical' }}
            />

            {/* Ekstra Görseller Yönetimi */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                  Ek Görseller ({(file.extraImages || []).length})
                </span>
                <button
                  onClick={() => setEditingId(editingId === file.id ? null : file.id)}
                  style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '4px', background: editingId === file.id ? 'var(--primary-color)' : '#f1f5f9', color: editingId === file.id ? 'white' : '#64748b', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  {editingId === file.id ? '✓ Tamam' : '+ Yönet'}
                </button>
              </div>

              {editingId === file.id && (
                <div style={{ marginTop: '8px' }}>
                  <ImageUploader
                    onImageUpload={(url: string) => addExtraImage(file.id, url)}
                    onImageDelete={() => {}}
                    folder={`medya/${file.id}`}
                    label="Ek Görsel Yükle"
                  />
                  {(file.extraImages || []).length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                      {(file.extraImages || []).map((img: any, idx: number) => {
                        const imgObj = typeof img === 'string' ? { url: img, description: '' } : img;
                        return (
                          <div key={idx} style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                              <img src={imgObj.url} alt={`Ek ${idx + 1}`} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                              <textarea
                                placeholder="Görsel açıklaması..."
                                value={imgObj.description || ''}
                                onChange={(e) => updateExtraImageDesc(file.id, idx, e.target.value)}
                                style={{ flex: 1, height: '60px', padding: '6px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'none' }}
                              />
                            </div>
                            <button
                              onClick={() => removeExtraImage(file.id, idx)}
                              style={{ width: '100%', padding: '4px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '600' }}
                            >Görseli Kaldır</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => deleteFile(file.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: '18px' }}>×</button>
            <a href={`/medya/${file.id}`} target="_blank" rel="noreferrer" style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', textDecoration: 'none', fontSize: '13px' }}>Sayfayı Gör</a>
          </div>
        ))}
      </div>
    </div>
  );
}
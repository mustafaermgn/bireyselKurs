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
      extraImages: [] as string[]
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
        return { ...f, extraImages: [...existing, url] };
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
            <input 
              type="text" 
              placeholder="Görsel açıklaması..." 
              value={file.description || ''} 
              onChange={(e) => updateFileDesc(file.id, file.name, e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '10px' }}
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '10px' }}>
                      {(file.extraImages || []).map((img: string, idx: number) => (
                        <div key={idx} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', aspectRatio: '1' }}>
                          <img src={img} alt={`Ek ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => removeExtraImage(file.id, idx)}
                            style={{ position: 'absolute', top: '4px', right: '4px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => deleteFile(file.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: '18px' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
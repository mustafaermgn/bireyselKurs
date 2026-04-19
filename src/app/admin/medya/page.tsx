"use client";
import { useAppStore } from '@/lib/store';
import ImageUploader from '@/components/ImageUploader';

export default function Medya() {
  const { data: files, updateData } = useAppStore('medya');

  const handleImageUpload = (url: string) => {
    const newFile = {
      id: Date.now(),
      name: `Görsel ${files.length + 1}`,
      url: url,
      description: ''
    };
    updateData([...files, newFile]);
  };

  const handleImageDelete = (url: string) => {
    updateData(files.filter((f: any) => f.url !== url));
  };

  const deleteFile = (id: number) => {
    const file = files.find((f: any) => f.id === id);
    updateData(files.filter((f: any) => f.id !== id));
  };

  const updateFileDesc = (id: number, name: string, desc: string) => {
    updateData(files.map((f: any) => f.id === id ? { ...f, name, description: desc } : f));
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {files.map((file: any) => (
          <div key={file.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
            <img src={file.url} alt={file.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
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
              style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
            />
            <button onClick={() => deleteFile(file.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: '18px' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
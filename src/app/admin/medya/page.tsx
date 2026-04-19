"use client";
import { useAppStore } from '@/lib/store';

export default function Medya() {
  const { data: files, updateData } = useAppStore('medya');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file)
      };
      updateData([...files, newFile]);
    }
  };

  const deleteFile = (id: number) => {
    updateData(files.filter((f: any) => f.id !== id));
  };

  const updateFileDesc = (id: number, desc: string) => {
    updateData(files.map((f: any) => f.id === id ? { ...f, description: desc } : f));
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0f172a' }}>Medya Yönetimi</h1>
      
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', border: '2px dashed #cbd5e1', marginBottom: '30px', position: 'relative' }}>
        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
        <div style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '10px' }}>📁</div>
        <p style={{ color: '#475569', marginBottom: '10px', fontWeight: 'bold' }}>Görselleri buraya sürükleyip bırakın veya tıklayarak seçin</p>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>PNG, JPG, JPEG desteklenir (Görseller ön tarafta Galeriye eklenecek)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {files.map((file: any) => (
          <div key={file.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
            <img src={file.url} alt={file.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
            <input 
              type="text" 
              placeholder="Görsel açıklaması..." 
              value={file.description || ''} 
              onChange={(e) => updateFileDesc(file.id, e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px' }}
            />
            <button onClick={() => deleteFile(file.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
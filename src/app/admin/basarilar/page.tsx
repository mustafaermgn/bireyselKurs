"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import ImageUploader from '@/components/ImageUploader';

export default function Basarilar() {
  const { data: basarilar, updateData } = useAppStore('basarilar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newExam, setNewExam] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (url: string) => {
    setNewPhoto(url);
  };

  const handleDeletePhoto = () => {
    setNewPhoto(null);
  };

  const addBasari = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newExam || !newResult) {
      alert('Öğrenci adı, sınav türü ve sonuç zorunludur');
      return;
    }
    updateData([...basarilar, { id: Date.now(), name: newName, exam: newExam, result: newResult, year: newYear, photo: newPhoto }]);
    setIsModalOpen(false);
    setNewName('');
    setNewExam('');
    setNewResult('');
    setNewYear(new Date().getFullYear().toString());
    setNewPhoto(null);
  };

  const deleteBasari = (id: number | string) => {
    updateData(basarilar.filter((b: any) => b.id !== id));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>Başarı Yönetimi</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>+ Yeni Başarı Ekle</button>
      </div>

      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {basarilar.length === 0 ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
            Şu anda kayıtlı başarı bulunmamaktadır.
          </div>
        ) : (
          basarilar.map((b: any) => (
            <div key={b.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center', overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
              <button onClick={() => deleteBasari(b.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', color: '#dc2626', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, fontSize: '16px', fontWeight: 'bold' }}>×</button>
              <div style={{ height: '150px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', overflow: 'hidden' }}>
                {b.photo ? (
                  <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ opacity: 0.5 }}>🎓</span>
                )}
              </div>
              <div style={{ padding: '12px' }}>
                <h3 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '0.95rem', fontWeight: '800' }}>{b.name}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#f16101', fontWeight: '700', fontSize: '0.75rem' }}>{b.exam} - {b.year}</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b', background: '#f8fafc', padding: '6px', borderRadius: '4px', fontWeight: '600' }}>{b.result}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Başarı Ekle</h2>
            <form onSubmit={addBasari}>
              <ImageUploader 
                onImageUpload={handlePhotoUpload}
                onImageDelete={handleDeletePhoto}
                folder="basarilar"
                label="Öğrenci Fotoğrafı (İsteğe Bağlı)"
                currentImage={newPhoto}
              />

              <input 
                type="text" 
                placeholder="Öğrenci Adı Soyadı" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box' }} 
              />
              <input 
                type="text" 
                placeholder="Sınav Türü (Örn: YKS, LGS)" 
                value={newExam} 
                onChange={(e) => setNewExam(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box' }} 
              />
              <input 
                type="text" 
                placeholder="Sınav Yılı (Örn: 2024)" 
                value={newYear} 
                onChange={(e) => setNewYear(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box' }} 
              />
              <textarea 
                placeholder="Sonuç/Derece/Kazanılan Yer (Örn: Türkiye 145.si - Hacettepe Tıp)" 
                value={newResult} 
                onChange={(e) => setNewResult(e.target.value)} 
                required 
                rows={3} 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }}
              ></textarea>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => { setIsModalOpen(false); setNewName(''); setNewExam(''); setNewResult(''); setNewYear(new Date().getFullYear().toString()); setNewPhoto(null); }} 
                  style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  İptal
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

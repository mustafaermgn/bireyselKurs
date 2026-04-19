"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Basarilar() {
  const { data: basarilar, updateData } = useAppStore('basarilar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newExam, setNewExam] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewPhoto(URL.createObjectURL(file));
    }
  };

  const addBasari = (e: React.FormEvent) => {
    e.preventDefault();
    updateData([...basarilar, { id: Date.now(), name: newName, exam: newExam, result: newResult, year: newYear, photo: newPhoto }]);
    setIsModalOpen(false);
    setNewName(''); setNewExam(''); setNewResult(''); setNewYear(new Date().getFullYear().toString()); setNewPhoto(null);
  };

  const deleteBasari = (id: number | string) => {
    updateData(basarilar.filter((b: any) => b.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>Öğrenci Başarıları Yönetimi</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Yeni Başarı Ekle</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {basarilar.length === 0 ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}>
            <p>Şu anda kayıtlı başarı bulunmamaktadır.</p>
          </div>
        ) : (
          basarilar.map((b: any) => (
            <div key={b.id} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
              <button onClick={() => deleteBasari(b.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', zIndex: 10 }}>Sil</button>
              <div style={{ height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', overflow: 'hidden' }}>
                {b.photo ? (
                  <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '4rem' }}>🎓</span>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.2rem' }}>{b.name}</h3>
                <p style={{ margin: '0 0 10px 0', color: '#f16101', fontWeight: 'bold' }}>{b.exam} - {b.year}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', background: '#f8fafc', padding: '10px', borderRadius: '4px' }}>{b.result}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Başarı Ekle</h2>
            <form onSubmit={addBasari}>
              <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px dashed #cbd5e1', position: 'relative' }}>
                  {newPhoto ? (
                    <img src={newPhoto} alt="Önizleme" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>🎓</span>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} title="Fotoğraf Yükle" />
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Öğrenci Fotoğrafı (İsteğe bağlı)</p>
              </div>

              <input type="text" placeholder="Öğrenci Adı Soyadı" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="Sınav Türü (Örn: YKS, LGS)" value={newExam} onChange={(e) => setNewExam(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="Sınav Yılı (Örn: 2024)" value={newYear} onChange={(e) => setNewYear(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <textarea placeholder="Sonuç/Derece/Kazanılan Yer (Örn: Türkiye 145.si - Hacettepe Tıp)" value={newResult} onChange={(e) => setNewResult(e.target.value)} required rows={3} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'vertical' }}></textarea>
              
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

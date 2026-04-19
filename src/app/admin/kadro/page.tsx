"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import ImageUploader from '@/components/ImageUploader';

export default function Kadro() {
  const { data: kadro, updateData } = useAppStore('kadro');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBranch, setNewBranch] = useState('');
  const [newAvatar, setNewAvatar] = useState('👨‍🏫');
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handlePhotoUpload = (url: string) => {
    console.log('📸 Fotoğraf yüklendi:', url);
    setNewPhoto(url);
  };

  const handleDeletePhoto = () => {
    console.log('🗑️ Fotoğraf silindi');
    setNewPhoto(null);
  };

  const addTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBranch) {
      alert('Ad soyad ve branş zorunludur');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      console.log('👨‍🏫 Yeni eğitmen kaydediliyor:', { newName, newBranch, newPhoto });
      const newTeacher = { id: Date.now(), name: newName, branch: newBranch, avatar: newAvatar, photo: newPhoto };
      await updateData([...kadro, newTeacher]);
      
      console.log('✅ Eğitmen başarıyla kaydedildi');
      setIsModalOpen(false);
      setNewName('');
      setNewBranch('');
      setNewAvatar('👨‍🏫');
      setNewPhoto(null);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen hata';
      setSaveError(errorMsg);
      console.error('❌ Kaydetme hatası:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTeacher = async (id: number) => {
    if (!confirm('Eğitmeni silmek istediğinizden emin misiniz?')) return;
    
    try {
      console.log('🗑️ Eğitmen siliniyor:', id);
      await updateData(kadro.filter((k: any) => k.id !== id));
      console.log('✅ Eğitmen başarıyla silindi');
    } catch (error) {
      console.error('❌ Silme hatası:', error);
      alert('Silme sırasında hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>Eğitim Kadrosu</h1>
        <button onClick={() => setIsModalOpen(true)} disabled={isSaving} style={{ background: '#f16101', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1, fontSize: '0.9rem', fontWeight: '700' }}>+ Yeni Eğitmen Ekle</button>
      </div>

      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
        {kadro.length === 0 ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
            Şu anda kayıtlı eğitmen bulunmamaktadır.
          </div>
        ) : (
          kadro.map((k: any) => (
            <div key={k.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center', overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => deleteTeacher(k.id)} 
                disabled={isSaving} 
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', color: '#dc2626', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, fontSize: '16px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >×</button>
              <div style={{ height: '140px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', overflow: 'hidden' }}>
                {k.photo ? (
                  <img src={k.photo} alt={k.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ opacity: 0.5 }}>{k.avatar}</span>
                )}
              </div>
              <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '0 0 2px 0', color: '#0f172a', fontSize: '0.9rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.name}</h3>
                <p style={{ margin: 0, color: '#f16101', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase' }}>{k.branch}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Eğitmen Ekle</h2>

            {saveError && (
              <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                ❌ Hata: {saveError}
              </div>
            )}

            <form onSubmit={addTeacher}>
              <ImageUploader 
                onImageUpload={handlePhotoUpload}
                onImageDelete={handleDeletePhoto}
                folder="kadro"
                label="Eğitmen Fotoğrafı (İsteğe Bağlı)"
                currentImage={newPhoto}
              />

              <input 
                type="text" 
                placeholder="Ad Soyad" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                disabled={isSaving}
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box', opacity: isSaving ? 0.6 : 1 }} 
              />
              <input 
                type="text" 
                placeholder="Branşı (Örn: Matematik)" 
                value={newBranch} 
                onChange={(e) => setNewBranch(e.target.value)} 
                disabled={isSaving}
                required 
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box', opacity: isSaving ? 0.6 : 1 }} 
              />
              <select 
                value={newAvatar} 
                onChange={(e) => setNewAvatar(e.target.value)} 
                disabled={isSaving}
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px', boxSizing: 'border-box', opacity: isSaving ? 0.6 : 1 }}>
                <option value="👨‍🏫">👨‍🏫 Erkek Avatar (Fotoğraf yoksa)</option>
                <option value="👩‍🏫">👩‍🏫 Kadın Avatar (Fotoğraf yoksa)</option>
              </select>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => { setIsModalOpen(false); setNewName(''); setNewBranch(''); setNewAvatar('👨‍🏫'); setNewPhoto(null); setSaveError(''); }} 
                  disabled={isSaving}
                  style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}>
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  style={{ padding: '10px 20px', background: isSaving ? '#cbd5e1' : '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                  {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

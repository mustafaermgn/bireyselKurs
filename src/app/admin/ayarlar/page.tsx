"use client";
import { useAppStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function Ayarlar() {
  const { data: ayarlar, updateData } = useAppStore('ayarlar');
  const [successMessage, setSuccessMessage] = useState('');

  // Debug: Ayarlar yüklendi mi?
  useEffect(() => {
    console.log('🔍 Ayarlar sayfası yüklendi');
    console.log('📦 ayarlar data:', ayarlar);
    console.log('🔧 updateData var mı?', typeof updateData);
  }, [ayarlar, updateData]);

  const handleHeroImageUpload = (url: string) => {
    console.log('=== BAŞLADI: Slayt fotoğrafı yükleniyor ===');
    console.log('📸 URL:', url);
    console.log('📦 Şu anki ayarlar:', ayarlar);
    
    try {
      if (!ayarlar) {
        console.error('❌ HATA: ayarlar null/undefined!');
        return;
      }

      const currentImages = ayarlar?.heroImages || [];
      console.log('✅ Mevcut görseller:', currentImages);
      
      const newImages = [...currentImages, url];
      console.log('➕ Yeni görseller:', newImages);
      
      console.log('💾 updateData çağırılıyor...');
      updateData({ ...ayarlar, heroImages: newImages });
      
      console.log('✅ updateData tamamlandı!');
      setSuccessMessage('Slayt fotoğrafı başarıyla kaydedildi!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('❌ HATA YAKALANDI:', error);
    }
  };

  const removeHeroImage = (indexToRemove: number) => {
    const currentImages = ayarlar?.heroImages || [];
    const newImages = currentImages.filter((_: string, index: number) => index !== indexToRemove);
    updateData({ ...ayarlar, heroImages: newImages });
    setSuccessMessage('Fotoğraf kaldırıldı!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBgImageUpload = (url: string) => {
    console.log('🌅 Arka plan fotoğrafı yüklendi:', url);
    // Otomatik olarak Firebase'e kaydet
    const currentBg = ayarlar?.heroArkaplanlar || [];
    const newBg = [...currentBg, url];
    updateData({ ...ayarlar, heroArkaplanlar: newBg });
    setSuccessMessage('Arka plan fotoğrafı başarıyla kaydedildi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const removeBgImage = (indexToRemove: number) => {
    const currentBg = ayarlar?.heroArkaplanlar || [];
    const newBg = currentBg.filter((_: string, index: number) => index !== indexToRemove);
    updateData({ ...ayarlar, heroArkaplanlar: newBg });
    setSuccessMessage('Arka plan silindi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogoUpload = (url: string) => {
    console.log('🎯 Logo yüklendi:', url);
    // Otomatik olarak Firebase'e kaydet
    updateData({ ...ayarlar, logo: url });
    setSuccessMessage('Logo başarıyla kaydedildi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ ...ayarlar, [name]: value });
  };

  const saveTextChanges = () => {
    setSuccessMessage('Metin değişiklikleri başarıyla kaydedildi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '15px',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#334155',
    fontSize: '14px'
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#0f172a', fontWeight: '800' }}>Site Ayarları</h1>
        <button onClick={saveTextChanges} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
          💾 Değişiklikleri Kaydet
        </button>
      </div>

      {successMessage && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, background: '#dcfce3', color: '#166534', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #bbf7d0' }}>
          ✅ {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px', alignItems: 'start' }}>
        
        {/* Görsel Ayarları */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', color: '#1e293b', fontWeight: '700' }}>📸 Görsel Ayarları</h2>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={labelStyle}>
              Anasayfa Slayt Fotoğrafları (Yuvarlak Alan)
            </label>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
              Anasayfada açılışta sağ tarafta bulunan yuvarlak alana birden fazla fotoğraf ekleyebilirsiniz. Slayt otomatik olarak döner.
            </p>

            <ImageUploader 
              onImageUpload={handleHeroImageUpload}
              folder="ayarlar-hero"
              label="Slayt Fotoğrafı Seç"
            />

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {(!ayarlar?.heroImages || ayarlar.heroImages.length === 0) && (
                <div style={{ padding: '15px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', width: '100%', textAlign: 'center', fontSize: '13px' }}>
                  Henüz fotoğraf yüklenmemiş.
                </div>
              )}
              
              {ayarlar?.heroImages?.map((img: string, index: number) => (
                <div key={index} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f16101', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '2px solid white' }}>
                  <img src={img} alt={`Kapak ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => removeHeroImage(index)}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(220, 38, 38, 0.8)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    SİL
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '15px', borderTop: '1px solid #f1f5f9', marginBottom: '20px' }}>
            <label style={labelStyle}>Kurum Logosu</label>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
                {ayarlar?.logo ? (
                  <img src={ayarlar.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>LOGO</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <ImageUploader 
                  onImageUpload={handleLogoUpload}
                  onImageDelete={() => {
                    updateData({ ...ayarlar, logo: '' });
                    setSuccessMessage('Logo silindi!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                  }}
                  folder="ayarlar-logo"
                  label="Logo Değiştir"
                  currentImage={ayarlar?.logo}
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
            <label style={labelStyle}>Anasayfa Arka Plan Slaytı</label>
            <ImageUploader onImageUpload={handleBgImageUpload} folder="ayarlar-bg" label="Fotoğraf Ekle" />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {ayarlar?.heroArkaplanlar?.map((img: string, index: number) => (
                <div key={index} style={{ position: 'relative', width: '100px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => removeBgImage(index)} style={{ position: 'absolute', inset: 0, background: 'rgba(220, 38, 38, 0.8)', color: 'white', border: 'none', opacity: 0, cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0"}>SİL</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metin Ayarları */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', color: '#1e293b', fontWeight: '700' }}>✍️ Site Metinleri</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '12px', color: '#334155', fontWeight: '700' }}>Açılış (Hero) Bölümü</h3>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Üst Başlık</label>
                  <input type="text" name="heroUstBaslik" value={ayarlar?.heroUstBaslik || ''} onChange={handleChange} style={{...inputStyle, marginBottom: '8px'}} />
                </div>
                <div>
                  <label style={labelStyle}>Ana Başlık</label>
                  <input type="text" name="heroAnaBaslik" value={ayarlar?.heroAnaBaslik || ''} onChange={handleChange} style={{...inputStyle, marginBottom: '8px'}} />
                </div>
              </div>
              <label style={labelStyle}>Açıklama</label>
              <textarea name="heroAciklama" value={ayarlar?.heroAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '60px', resize: 'none', marginBottom: 0}} />
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '12px', color: '#334155', fontWeight: '700' }}>Bilgi Kutucukları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '10px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i}>
                    <label style={labelStyle}>{i}. Başlık</label>
                    <input type="text" name={`kutu${i}Baslik`} value={(ayarlar as any)?.[`kutu${i}Baslik`] || ''} onChange={handleChange} style={{...inputStyle, padding: '8px', fontSize: '13px'}} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '12px', color: '#334155', fontWeight: '700' }}>Kurum & Kayıt Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={labelStyle}>Kurum Başlığı</label>
                  <input type="text" name="kurumBaslik" value={ayarlar?.kurumBaslik || ''} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Kayıt Başlığı</label>
                  <input type="text" name="ctaBaslik" value={ayarlar?.ctaBaslik || ''} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <label style={labelStyle}>Kurum Açıklama</label>
              <textarea name="kurumAciklama" value={ayarlar?.kurumAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px', marginBottom: '10px'}} />
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={ayarlar?.kurumGorsel} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <ImageUploader onImageUpload={(url) => updateData({ ...ayarlar, kurumGorsel: url })} folder="kurum" label="Görsel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

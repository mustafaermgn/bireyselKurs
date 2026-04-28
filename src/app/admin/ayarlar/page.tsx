"use client";
import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function Ayarlar() {
  const { data: ayarlar, updateData } = useAppStore('ayarlar');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('genel');

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleHeroImageUpload = (url: string) => {
    const currentImages = ayarlar?.heroImages || [];
    updateData({ ...ayarlar, heroImages: [...currentImages, url] });
    showSuccess('Slayt fotoğrafı başarıyla kaydedildi!');
  };

  const removeHeroImage = (indexToRemove: number) => {
    const currentImages = ayarlar?.heroImages || [];
    updateData({ ...ayarlar, heroImages: currentImages.filter((_: string, index: number) => index !== indexToRemove) });
    showSuccess('Fotoğraf kaldırıldı!');
  };

  const handleBgImageUpload = (url: string) => {
    const currentBg = ayarlar?.heroArkaplanlar || [];
    updateData({ ...ayarlar, heroArkaplanlar: [...currentBg, url] });
    showSuccess('Arka plan fotoğrafı başarıyla kaydedildi!');
  };

  const removeBgImage = (indexToRemove: number) => {
    const currentBg = ayarlar?.heroArkaplanlar || [];
    updateData({ ...ayarlar, heroArkaplanlar: currentBg.filter((_: string, index: number) => index !== indexToRemove) });
    showSuccess('Arka plan silindi!');
  };

  const handleLogoUpload = (url: string) => {
    updateData({ ...ayarlar, logo: url });
    showSuccess('Logo başarıyla kaydedildi!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ ...ayarlar, [name]: value });
  };

  const saveTextChanges = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Tüm değişiklikler başarıyla kaydedildi!');
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

  const tabStyle = (isActive: boolean) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #f16101' : '3px solid transparent',
    color: isActive ? '#f16101' : '#64748b',
    fontWeight: isActive ? '800' : '600',
    fontSize: '15px',
    transition: 'all 0.2s',
    background: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none'
  });

  if (!ayarlar) return <div style={{ padding: '40px', textAlign: 'center' }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, color: '#0f172a', fontWeight: '800' }}>Genel Site Ayarları</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Sitedeki tüm metinleri ve görselleri buradan profesyonelce yönetin.</p>
        </div>
        <button onClick={saveTextChanges} style={{ background: '#f16101', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(241, 97, 1, 0.3)' }}>
          💾 Tüm Değişiklikleri Kaydet
        </button>
      </div>

      {successMessage && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, background: '#dcfce3', color: '#166534', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #bbf7d0' }}>
          ✅ {successMessage}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '25px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <button style={tabStyle(activeTab === 'genel')} onClick={() => setActiveTab('genel')}>Genel / İletişim</button>
        <button style={tabStyle(activeTab === 'gorsel')} onClick={() => setActiveTab('gorsel')}>Görseller & Medya</button>
        <button style={tabStyle(activeTab === 'anasayfa')} onClick={() => setActiveTab('anasayfa')}>Anasayfa Metinleri</button>
        <button style={tabStyle(activeTab === 'hakkimizda')} onClick={() => setActiveTab('hakkimizda')}>Hakkımızda Metinleri</button>
        <button style={tabStyle(activeTab === 'kurslar')} onClick={() => setActiveTab('kurslar')}>Kurs Eğitim Metinleri</button>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        
        {/* TAB 1: GENEL & İLETİŞİM */}
        {activeTab === 'genel' && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '25px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>İletişim Bilgileri</h3>
              <label style={labelStyle}>E-posta Adresi</label>
              <input type="text" name="eposta" value={ayarlar.eposta || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Telefon Numarası</label>
              <input type="text" name="telefon" value={ayarlar.telefon || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Açık Adres</label>
              <textarea name="adres" value={ayarlar.adres || ''} onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'vertical'}} />
              
              <label style={labelStyle}>Google Haritalar Embed URL</label>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', marginTop: '-5px' }}>Haritayı değiştirmek için Google Haritalar&apos;dan "Harita Yerleştir" src kodunu buraya yapıştırın.</p>
              <input type="text" name="googleMapsUrl" value={ayarlar.googleMapsUrl || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
               <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>Logo</h3>
               <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
                  {ayarlar.logo ? (
                    <img src={ayarlar.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>LOGO</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <ImageUploader 
                    onImageUpload={handleLogoUpload}
                    onImageDelete={() => {
                      updateData({ ...ayarlar, logo: '' });
                      showSuccess('Logo silindi!');
                    }}
                    folder="ayarlar-logo"
                    label="Logo Değiştir"
                    currentImage={ayarlar.logo}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GÖRSELLER */}
        {activeTab === 'gorsel' && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1e293b' }}>Anasayfa Slayt Fotoğrafları</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Açılışta sağ tarafta bulunan yuvarlak alana fotoğraf ekleyin.</p>
              <ImageUploader onImageUpload={handleHeroImageUpload} folder="ayarlar-hero" label="Fotoğraf Seç" />
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                {ayarlar.heroImages?.map((img: string, index: number) => (
                  <div key={index} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f16101', overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => removeHeroImage(index)} style={{ position: 'absolute', inset: 0, background: 'rgba(220, 38, 38, 0.8)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>SİL</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1e293b' }}>Anasayfa Arka Planları</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Tüm sitenin arka planında yavaşça değişen fotoğraflar.</p>
              <ImageUploader onImageUpload={handleBgImageUpload} folder="ayarlar-bg" label="Fotoğraf Ekle" />
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                {ayarlar.heroArkaplanlar?.map((img: string, index: number) => (
                  <div key={index} style={{ position: 'relative', width: '100px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => removeBgImage(index)} style={{ position: 'absolute', inset: 0, background: 'rgba(220, 38, 38, 0.8)', color: 'white', border: 'none', opacity: 0, cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0"}>SİL</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1e293b' }}>Kurumumuz Tanıtım Görseli</h3>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '150px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                  <img src={ayarlar.kurumGorsel} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <ImageUploader onImageUpload={(url) => updateData({ ...ayarlar, kurumGorsel: url })} folder="kurum" label="Yeni Görsel Yükle" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANASAYFA METİNLERİ */}
        {activeTab === 'anasayfa' && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '30px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b' }}>Açılış (Hero) Bölümü</h3>
              <label style={labelStyle}>Üst Başlık (Küçük)</label>
              <input type="text" name="heroUstBaslik" value={ayarlar.heroUstBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Ana Başlık (Büyük)</label>
              <input type="text" name="heroAnaBaslik" value={ayarlar.heroAnaBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Ana Açıklama</label>
              <textarea name="heroAciklama" value={ayarlar.heroAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px'}} />
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b' }}>Kurumu Tanıyın & CTA</h3>
              <label style={labelStyle}>Kurum Bölümü Başlığı</label>
              <input type="text" name="kurumBaslik" value={ayarlar.kurumBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Kurum Açıklaması</label>
              <textarea name="kurumAciklama" value={ayarlar.kurumAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px'}} />
              
              <hr style={{ margin: '20px 0', borderColor: '#e2e8f0' }} />
              
              <label style={labelStyle}>Hızlı Kayıt (Alt Kısım) Başlığı</label>
              <input type="text" name="ctaBaslik" value={ayarlar.ctaBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Hızlı Kayıt (Alt Kısım) Açıklaması</label>
              <textarea name="ctaAciklama" value={ayarlar.ctaAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '60px'}} />
            </div>

            <div style={{ gridColumn: '1 / -1', background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b' }}>Öne Çıkan 3 Özellik Kutusu</h3>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '15px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <label style={labelStyle}>{i}. Kutu Başlığı</label>
                    <input type="text" name={`kutu${i}Baslik`} value={(ayarlar as any)[`kutu${i}Baslik`] || ''} onChange={handleChange} style={inputStyle} />
                    <label style={labelStyle}>{i}. Kutu Açıklama</label>
                    <textarea name={`kutu${i}Aciklama`} value={(ayarlar as any)[`kutu${i}Aciklama`] || ''} onChange={handleChange} style={{...inputStyle, height: '80px', marginBottom: 0}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HAKKIMIZDA METİNLERİ */}
        {activeTab === 'hakkimizda' && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b' }}>Sayfa Üst Kısmı</h3>
              <label style={labelStyle}>Üst Etiket (Örn: BİZ KİMİZ?)</label>
              <input type="text" name="hakkimizdaUstBaslik" value={ayarlar.hakkimizdaUstBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Ana Başlık</label>
              <input type="text" name="hakkimizdaAnaBaslik" value={ayarlar.hakkimizdaAnaBaslik || ''} onChange={handleChange} style={inputStyle} />
              
              <label style={labelStyle}>Açıklama Paragraf 1</label>
              <textarea name="hakkimizdaP1" value={ayarlar.hakkimizdaP1 || ''} onChange={handleChange} style={{...inputStyle, height: '100px'}} />
              
              <label style={labelStyle}>Açıklama Paragraf 2</label>
              <textarea name="hakkimizdaP2" value={ayarlar.hakkimizdaP2 || ''} onChange={handleChange} style={{...inputStyle, height: '100px'}} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#1e293b' }}>Vizyon & Misyon</h3>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <label style={labelStyle}>Vizyon Başlığı</label>
                <input type="text" name="vizyonBaslik" value={ayarlar.vizyonBaslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Vizyon Açıklaması</label>
                <textarea name="vizyonAciklama" value={ayarlar.vizyonAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px', marginBottom: 0}} />
              </div>
              
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <label style={labelStyle}>Misyon Başlığı</label>
                <input type="text" name="misyonBaslik" value={ayarlar.misyonBaslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Misyon Açıklaması</label>
                <textarea name="misyonAciklama" value={ayarlar.misyonAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px', marginBottom: 0}} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: KURSLAR (EĞİTİM PROGRAMLARI) */}
        {activeTab === 'kurslar' && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '30px' }}>
            <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '12px', border: '1px solid #fee2e2' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#b91c1c' }}>YKS Programı</h3>
              <label style={labelStyle}>Program Başlığı</label>
              <input type="text" name="yksBaslik" value={ayarlar.yksBaslik || ''} onChange={handleChange} style={inputStyle} />
              <label style={labelStyle}>Program Açıklaması</label>
              <textarea name="yksAciklama" value={ayarlar.yksAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px', marginBottom: 0}} />
            </div>

            <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1d4ed8' }}>LGS Programı</h3>
              <label style={labelStyle}>Program Başlığı</label>
              <input type="text" name="lgsBaslik" value={ayarlar.lgsBaslik || ''} onChange={handleChange} style={inputStyle} />
              <label style={labelStyle}>Program Açıklaması</label>
              <textarea name="lgsAciklama" value={ayarlar.lgsAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px', marginBottom: 0}} />
            </div>

            <div style={{ background: '#fdf4ff', padding: '20px', borderRadius: '12px', border: '1px solid #fae8ff' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#a21caf' }}>Yabancı Dil Eğitimleri</h3>
              <label style={labelStyle}>Program Başlığı</label>
              <input type="text" name="dilOkuluBaslik" value={ayarlar.dilOkuluBaslik || ''} onChange={handleChange} style={inputStyle} />
              <label style={labelStyle}>Program Açıklaması</label>
              <textarea name="dilOkuluAciklama" value={ayarlar.dilOkuluAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px', marginBottom: 0}} />
            </div>

            <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '1px solid #dcfce3' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#15803d' }}>Ara Sınıf Takviye</h3>
              <label style={labelStyle}>Program Başlığı</label>
              <input type="text" name="araSinifBaslik" value={ayarlar.araSinifBaslik || ''} onChange={handleChange} style={inputStyle} />
              <label style={labelStyle}>Program Açıklaması</label>
              <textarea name="araSinifAciklama" value={ayarlar.araSinifAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '100px', marginBottom: 0}} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

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
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0f172a' }}>Site Ayarları</h1>

      {successMessage && (
        <div style={{ position: 'sticky', top: '20px', zIndex: 1000, background: '#dcfce3', color: '#166534', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          ✅ {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1" style={{ gap: '30px' }}>
        
        {/* Görsel Ayarları */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: 'var(--primary-color)' }}>📸 Görsel Ayarları</h2>
          
          <div style={{ marginBottom: '40px' }}>
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

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {(!ayarlar?.heroImages || ayarlar.heroImages.length === 0) && (
                <div style={{ padding: '20px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', width: '100%', textAlign: 'center' }}>
                  Henüz fotoğraf yüklenmemiş.
                </div>
              )}
              
              {ayarlar?.heroImages?.map((img: string, index: number) => (
                <div key={index} style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#f16101', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '3px solid white' }}>
                  <img src={img} alt={`Kapak ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => removeHeroImage(index)}
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(220, 38, 38, 0.7)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s', cursor: 'pointer', fontWeight: 'bold' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    SİL
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <label style={labelStyle}>
              Kurum Logosu (Üst Menü ve Açılış Ekranı)
            </label>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '15px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e1', overflow: 'hidden' }}>
                {ayarlar?.logo ? (
                  <img src={ayarlar.logo} alt="Logo Önizleme" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  "LOGO"
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
                  label="Logo Yükle"
                  currentImage={ayarlar?.logo}
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <label style={labelStyle}>
              Anasayfa Arka Plan Görselleri (Slayt)
            </label>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
              Anasayfanın en üstündeki düz lacivert alan yerine, birden fazla arka plan fotoğrafı ekleyerek otomatik dönen ve elle kaydırılabilen bir slayt oluşturabilirsiniz.
            </p>

            <ImageUploader 
              onImageUpload={handleBgImageUpload}
              folder="ayarlar-bg"
              label="Arka Plan Fotoğrafı Seç"
            />

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {(!ayarlar?.heroArkaplanlar || ayarlar.heroArkaplanlar.length === 0) && (
                <div style={{ padding: '20px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', width: '100%', textAlign: 'center' }}>
                  Hiç arka plan yüklenmemiş. Standart lacivert renk gösterilecek.
                </div>
              )}
              
              {ayarlar?.heroArkaplanlar?.map((img: string, index: number) => (
                <div key={index} style={{ position: 'relative', width: '200px', height: '120px', borderRadius: '8px', backgroundColor: '#012237', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #cbd5e1' }}>
                  <img src={img} alt={`Arka Plan ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => removeBgImage(index)}
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(220, 38, 38, 0.7)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s', cursor: 'pointer', fontWeight: 'bold' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    SİL
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metin Ayarları */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: 'var(--primary-color)' }}>✍️ Anasayfa Metinleri</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '25px' }}>
            Sitenizin anasayfasında görünen tüm kurumsal yazıları buradan istediğiniz gibi değiştirebilirsiniz. Yapay zeka izlenimi bırakmamak için kendi samimi ve profesyonel dilinizi kullanabilirsiniz.
          </p>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>Açılış (Hero) Bölümü</h3>
            <label style={labelStyle}>Üst Küçük Başlık</label>
            <input type="text" name="heroUstBaslik" value={ayarlar?.heroUstBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="SİLOPİ BİREYSEL KURS MERKEZİ" />
            
            <label style={labelStyle}>Ana Büyük Başlık</label>
            <input type="text" name="heroAnaBaslik" value={ayarlar?.heroAnaBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="Geleceğinizi Şansa Bırakmayın." />
            
            <label style={labelStyle}>Açıklama Metni</label>
            <textarea name="heroAciklama" value={ayarlar?.heroAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'vertical'}} placeholder="25 yıllık tecrübemizle..." />
          </div>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>3&apos;lü Bilgi Kutucukları (Özelliklerimiz)</h3>
            
            <div className="grid grid-cols-3" style={{ gap: '15px' }}>
              <div>
                <label style={labelStyle}>1. Kutu Başlık</label>
                <input type="text" name="kutu1Baslik" value={ayarlar?.kutu1Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>1. Kutu Açıklama</label>
                <textarea name="kutu1Aciklama" value={ayarlar?.kutu1Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
              <div>
                <label style={labelStyle}>2. Kutu Başlık</label>
                <input type="text" name="kutu2Baslik" value={ayarlar?.kutu2Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>2. Kutu Açıklama</label>
                <textarea name="kutu2Aciklama" value={ayarlar?.kutu2Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
              <div>
                <label style={labelStyle}>3. Kutu Başlık</label>
                <input type="text" name="kutu3Baslik" value={ayarlar?.kutu3Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>3. Kutu Açıklama</label>
                <textarea name="kutu3Aciklama" value={ayarlar?.kutu3Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>Kayıt Çağrısı (En Alt Bölüm)</h3>
            <label style={labelStyle}>Kayıt Başlığı</label>
            <input type="text" name="ctaBaslik" value={ayarlar?.ctaBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="Kaydınızı Şimdi Yaptırın" />
            
            <label style={labelStyle}>Kayıt Açıklaması</label>
            <textarea name="ctaAciklama" value={ayarlar?.ctaAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} placeholder="Erken kayıt avantajlarından..." />
          </div>

          <button onClick={saveTextChanges} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
            💾 Metin Değişikliklerini Kaydet ve Uygula
          </button>
        </div>

      </div>
    </div>
  );
}

          <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <label style={labelStyle}>
              Anasayfa Arka Plan Görselleri (Slayt)
            </label>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
              Anasayfanın en üstündeki düz lacivert alan yerine, birden fazla arka plan fotoğrafı ekleyerek otomatik dönen ve elle kaydırılabilen bir slayt oluşturabilirsiniz.
            </p>
            
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
              <button style={{ background: '#1e293b', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>+</span> Yeni Arka Plan(lar) Ekle
              </button>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const files = Array.from(e.target.files);
                    const newUrls = files.map(file => URL.createObjectURL(file));
                    const currentBg = ayarlar?.heroArkaplanlar || [];
                    updateData({ ...ayarlar, heroArkaplanlar: [...currentBg, ...newUrls] });
                    setSuccessMessage(`${files.length} arka plan eklendi!`);
                    setTimeout(() => setSuccessMessage(''), 3000);
                  }
                }} 
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {(!ayarlar?.heroArkaplanlar || ayarlar.heroArkaplanlar.length === 0) && (
                <div style={{ padding: '20px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', width: '100%', textAlign: 'center' }}>
                  Hiç arka plan yüklenmemiş. Standart lacivert renk gösterilecek.
                </div>
              )}
              
              {ayarlar?.heroArkaplanlar?.map((img: string, index: number) => (
                <div key={index} style={{ position: 'relative', width: '200px', height: '120px', borderRadius: '8px', backgroundColor: '#012237', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #cbd5e1' }}>
                  <img src={img} alt={`Arka Plan ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => {
                      const currentBg = ayarlar?.heroArkaplanlar || [];
                      const newBg = currentBg.filter((_: string, i: number) => i !== index);
                      updateData({ ...ayarlar, heroArkaplanlar: newBg });
                      setSuccessMessage('Arka plan silindi!');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    }}
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(220, 38, 38, 0.7)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s', cursor: 'pointer', fontWeight: 'bold' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    SİL
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metin Ayarları */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: 'var(--primary-color)' }}>✍️ Anasayfa Metinleri</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '25px' }}>
            Sitenizin anasayfasında görünen tüm kurumsal yazıları buradan istediğiniz gibi değiştirebilirsiniz. Yapay zeka izlenimi bırakmamak için kendi samimi ve profesyonel dilinizi kullanabilirsiniz.
          </p>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>Açılış (Hero) Bölümü</h3>
            <label style={labelStyle}>Üst Küçük Başlık</label>
            <input type="text" name="heroUstBaslik" value={ayarlar?.heroUstBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="SİLOPİ BİREYSEL KURS MERKEZİ" />
            
            <label style={labelStyle}>Ana Büyük Başlık</label>
            <input type="text" name="heroAnaBaslik" value={ayarlar?.heroAnaBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="Geleceğinizi Şansa Bırakmayın." />
            
            <label style={labelStyle}>Açıklama Metni</label>
            <textarea name="heroAciklama" value={ayarlar?.heroAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'vertical'}} placeholder="25 yıllık tecrübemizle..." />
          </div>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>3&apos;lü Bilgi Kutucukları (Özelliklerimiz)</h3>
            
            <div className="grid grid-cols-3" style={{ gap: '15px' }}>
              <div>
                <label style={labelStyle}>1. Kutu Başlık</label>
                <input type="text" name="kutu1Baslik" value={ayarlar?.kutu1Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>1. Kutu Açıklama</label>
                <textarea name="kutu1Aciklama" value={ayarlar?.kutu1Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
              <div>
                <label style={labelStyle}>2. Kutu Başlık</label>
                <input type="text" name="kutu2Baslik" value={ayarlar?.kutu2Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>2. Kutu Açıklama</label>
                <textarea name="kutu2Aciklama" value={ayarlar?.kutu2Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
              <div>
                <label style={labelStyle}>3. Kutu Başlık</label>
                <input type="text" name="kutu3Baslik" value={ayarlar?.kutu3Baslik || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>3. Kutu Açıklama</label>
                <textarea name="kutu3Aciklama" value={ayarlar?.kutu3Aciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#334155' }}>Kayıt Çağrısı (En Alt Bölüm)</h3>
            <label style={labelStyle}>Kayıt Başlığı</label>
            <input type="text" name="ctaBaslik" value={ayarlar?.ctaBaslik || ''} onChange={handleChange} style={inputStyle} placeholder="Kaydınızı Şimdi Yaptırın" />
            
            <label style={labelStyle}>Kayıt Açıklaması</label>
            <textarea name="ctaAciklama" value={ayarlar?.ctaAciklama || ''} onChange={handleChange} style={{...inputStyle, height: '80px'}} placeholder="Erken kayıt avantajlarından..." />
          </div>

          <button onClick={saveTextChanges} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
            💾 Metin Değişikliklerini Kaydet ve Uygula
          </button>
        </div>

      </div>
    </div>
  );
}

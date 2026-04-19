"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function GaleriDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: medya, isLoaded } = useAppStore('medya');

  const item = medya?.find((m: any) => String(m.id) === String(id));

  const extraImages: any[] = item?.extraImages || [];
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!isLoaded) {
    return (
      <div className="main-container">
        <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ margin: 0 }}>Yükleniyor...</h1>
          </div>
        </section>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="main-container">
        <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ margin: 0 }}>Görsel Bulunamadı</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
              <Link href="/galeri" style={{ color: 'var(--primary-color)' }}>Galeriye Dön</Link>
            </p>
          </div>
        </section>
      </div>
    );
  }


  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % extraImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + extraImages.length) % extraImages.length);
  };

  return (
    <div className="main-container">
      {/* Page Header */}
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{item.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
            <Link href="/galeri" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Galeri</Link> / {item.name}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Ana Tanıtım Alanı */}
          <div className="grid grid-cols-2 grid-cols-mobile-1" style={{ gap: '40px', alignItems: 'start', marginBottom: '60px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
              <img src={item.url} alt={item.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px', color: 'var(--heading-color)' }}>Kurumumuzdan Detaylar</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-line' }}>{item.description || 'Bu etkinlik/alan hakkında detaylı bilgi girilmemiştir.'}</p>
            </div>
          </div>

          {/* Slider Alanı */}
          {extraImages.length > 0 && (
            <div style={{ marginTop: '40px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--heading-color)', margin: 0 }}>Görsel Galerisi</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px' }}>
                    {activeIndex + 1} / {extraImages.length}
                  </span>
                </div>
              </div>

              <div style={{ position: 'relative', background: '#f8fafc', borderRadius: '32px', padding: '30px', boxShadow: '0 4px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                {/* Main Slider Content */}
                <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '16/9', marginBottom: '25px' }}>
                  {extraImages.map((img: any, idx: number) => {
                    const imgObj = typeof img === 'string' ? { url: img, description: '' } : img;
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          opacity: activeIndex === idx ? 1 : 0,
                          visibility: activeIndex === idx ? 'visible' : 'hidden',
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: activeIndex === idx ? 'scale(1)' : 'scale(1.05)'
                        }}
                      >
                        <img src={imgObj.url} alt={`Slide ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    );
                  })}

                  {/* Navigation Arrows */}
                  <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 10 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 10 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>

                {/* Description for active slide */}
                <div style={{ minHeight: '80px', padding: '0 10px' }}>
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#334155', margin: 0, whiteSpace: 'pre-line', textAlign: 'center' }}>
                    {(typeof extraImages[activeIndex] === 'string' ? '' : extraImages[activeIndex].description) || 'Bu görsel için açıklama girilmemiş.'}
                  </p>
                </div>

                {/* Thumbnails */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '30px', overflowX: 'auto', paddingBottom: '10px', justifyContent: 'center' }}>
                  {extraImages.map((img: any, idx: number) => {
                    const imgUrl = typeof img === 'string' ? img : img.url;
                    return (
                      <div 
                        key={idx} 
                        onClick={() => setActiveIndex(idx)}
                        style={{ 
                          width: '80px', 
                          height: '50px', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          cursor: 'pointer',
                          border: activeIndex === idx ? '3px solid var(--primary-color)' : '3px solid transparent',
                          opacity: activeIndex === idx ? 1 : 0.6,
                          transition: 'all 0.3s ease',
                          flexShrink: 0
                        }}
                      >
                        <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Geri dön */}
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Link href="/galeri" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#64748b', fontWeight: '700', fontSize: '1.1rem', textDecoration: 'none', background: '#f1f5f9', padding: '15px 40px', borderRadius: '15px', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.background = '#f1f5f9'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Galeri Listesine Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

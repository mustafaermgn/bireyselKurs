"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function GaleriDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: medya, isLoaded } = useAppStore('medya');

  const item = medya?.find((m: any) => String(m.id) === String(id));
  
  if (!isLoaded) {
    return (
      <div className="main-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="main-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--secondary-color)', marginBottom: '15px' }}>Görsel Bulunamadı</h1>
          <Link href="/galeri" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>← Galeriye Dön</Link>
        </div>
      </div>
    );
  }

  const extraImages: any[] = item?.extraImages || [];
  // Kapak fotoğrafını ve eklenen diğer fotoğrafları tek bir dizide birleştiriyoruz
  const allImages = [
    { url: item.url, description: 'Kapak Fotoğrafı' },
    ...extraImages.map(img => typeof img === 'string' ? { url: img, description: '' } : img)
  ];

  return (
    <div className="main-container" style={{ backgroundColor: '#fff', color: '#1e293b', paddingBottom: '100px' }}>
      {/* Üst Navigasyon */}
      <div style={{ borderBottom: '1px solid #f1f5f9', padding: '15px 0' }}>
        <div className="container">
          <Link href="/galeri" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Galeriye Dön
          </Link>
        </div>
      </div>

      <section style={{ paddingTop: '50px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {/* Başlık ve Açıklama Bölümü */}
          <div style={{ marginBottom: '50px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', color: 'var(--secondary-color)', marginBottom: '20px' }}>{item.name}</h1>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#475569', whiteSpace: 'pre-line' }}>
                {item.description || 'Bu etkinlik veya alan hakkında henüz bir açıklama eklenmemiş.'}
              </p>
            </div>
            <div style={{ width: '40px', height: '3px', background: 'var(--primary-color)', margin: '30px auto 0', borderRadius: '2px' }}></div>
          </div>

          {/* Birleşik Fotoğraf Galerisi */}
          <div className="gallery-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '25px' 
          }}>
            {allImages.map((img: any, idx: number) => (
              <div key={idx} style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                backgroundColor: '#f8fafc',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img 
                    src={img.url} 
                    alt={`${item.name} - ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                {img.description && img.description !== 'Kapak Fotoğrafı' && (
                  <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9', background: '#fff' }}>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{img.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      ` }} />
    </div>
  );
}

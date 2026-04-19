"use client";

import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function GaleriDetay({ params }: { params: { id: string } }) {
  const { data: medya, isLoaded } = useAppStore('medya');

  const item = medya?.find((m: any) => String(m.id) === String(params.id));

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

  const extraImages: string[] = item.extraImages || [];

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
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Ana Görsel */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <img src={item.url} alt={item.name} style={{ width: '100%', height: 'auto', maxHeight: '550px', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Açıklama */}
          {item.description && (
            <div style={{ padding: '24px 0', marginBottom: '30px' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#334155', margin: 0 }}>{item.description}</p>
            </div>
          )}

          {/* Ekstra Görseller */}
          {extraImages.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.4rem', fontWeight: '800', color: 'var(--heading-color)' }}>Diğer Görseller</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {extraImages.map((img: string, idx: number) => (
                  <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', aspectRatio: '4/3' }}>
                    <img src={img} alt={`${item.name} - ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geri dön */}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #e2e8f0' }}>
            <Link href="/galeri" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Galeriye Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

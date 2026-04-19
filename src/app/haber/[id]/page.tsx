"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function HaberDetay() {
  const params = useParams();
  const { data: blogs, isLoaded } = useAppStore('blog');

  const blog = blogs?.find((b: any) => String(b.id) === String(params.id));

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

  if (!blog) {
    return (
      <div className="main-container">
        <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ margin: 0 }}>Haber Bulunamadı</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
              <Link href="/" style={{ color: 'var(--primary-color)' }}>Anasayfaya Dön</Link>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Page Header */}
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{blog.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Anasayfa</Link> / Haberler / Detay
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Meta bilgiler */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {blog.date && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', background: 'rgba(241,97,1,0.1)', color: 'var(--primary-color)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                📅 {blog.date}
              </span>
            )}
            {blog.author && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', background: '#f1f5f9', color: '#64748b', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                ✍️ {blog.author}
              </span>
            )}
          </div>

          {/* Görsel */}
          {blog.photo && (
            <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src={blog.photo} alt={blog.title} style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          {/* İçerik */}
          <div style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#334155' }}>
            <p>{blog.content}</p>
          </div>

          {/* Geri dön */}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #e2e8f0' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

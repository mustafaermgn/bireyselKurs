"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function MediaPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: files, isLoaded } = useAppStore('medya');
  const [item, setItem] = useState<any>(null);
  const [slides, setSlides] = useState<Array<{ url: string; description?: string }>>([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      const found = (files || []).find((f: any) => String(f.id) === String(id));
      if (!found) return;
      setItem(found);
      const base = { url: found.url, description: found.description || '' };
      const extras = (found.extraImages || []).map((e: any) => typeof e === 'string' ? { url: e, description: '' } : e);
      setSlides([base, ...extras]);
    }
  }, [isLoaded, files, id]);

  if (!item) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p>Yükleniyor veya içerik bulunamadı...</p>
        <button onClick={() => router.back()} style={{ marginTop: 12, padding: '8px 14px' }}>Geri</button>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.name}</h1>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>{item.description}</p>

      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#f8fafc', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <img src={slides[index]?.url} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />

        <button onClick={prev} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>&larr;</button>
        <button onClick={next} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>&rarr;</button>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '20px', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)', color: 'white' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{slides[index]?.description ? `Detay ${index + 1}` : item.name}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{slides[index]?.description || item.description}</p>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{ width: 64, height: 44, borderRadius: 6, overflow: 'hidden', border: index === i ? '2px solid var(--primary-color)' : '1px solid #e2e8f0', padding: 0, background: 'white', cursor: 'pointer' }}>
              <img src={s.url} alt={`thumb ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}

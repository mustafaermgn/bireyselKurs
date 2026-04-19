"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function Galeri() {
  const { data: medya } = useAppStore('medya');

  return (
    <div className="main-container">
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>Galeri</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Kurumumuzdan Kareler</p>
        </div>
      </section>
      <section className="section container">
        {medya.length === 0 ? (
          <p className="text-center">Henüz görsel eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-3 grid-cols-mobile-2">
            {medya.map((item: any) => (
              <Link key={item.id} href={`/galeri/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '300px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                  <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', padding: '20px 15px 15px', textAlign: 'center' }}>
                    {item.description || item.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
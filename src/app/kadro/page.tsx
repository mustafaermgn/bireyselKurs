"use client";

import { useAppStore } from '@/lib/store';

export default function KadroPage() {
  const { data: kadro, isLoaded } = useAppStore('kadro');

  return (
    <div className="main-container">
      {/* Page Header */}
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>Eğitim Kadromuz</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Anasayfa / Eğitim Kadrosu</p>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container text-center">
          <span className="section-subtitle">GÜÇLÜ KADRO</span>
          <h2 className="section-title">Alanında Uzman Öğretmenlerimiz</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 50px auto', fontSize: '1.1rem', color: '#64748b' }}>
            Öğrencilerimizin başarısı için gece gündüz demeden çalışan, tecrübeli ve dinamik eğitim kadromuzla tanışın.
          </p>
          
          <div className="responsive-grid">
            {isLoaded && kadro.length > 0 ? kadro.map((k: any) => (
              <div key={k.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 10px' }}>
                <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--accent-teal)', boxShadow: '0 4px 16px rgba(45,163,151,0.2)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', fontSize: '3rem' }}>
                  {k.photo ? (
                    <img src={k.photo} alt={k.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    k.avatar
                  )}
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: 'var(--heading-color)', fontWeight: '800' }}>{k.name}</h4>
                <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{k.branch}</p>
              </div>
            )) : (
              <p style={{ gridColumn: '1 / -1' }}>{isLoaded ? 'Kadro bilgisi bulunamadı.' : 'Yükleniyor...'}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

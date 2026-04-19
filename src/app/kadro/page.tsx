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
          
          <div className="grid grid-cols-4 grid-cols-mobile-2">
            {isLoaded && kadro.length > 0 ? kadro.map((k: any) => (
              <div key={k.id} className="card" style={{ textAlign: 'center', overflow: 'hidden', borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '240px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', overflow: 'hidden' }}>
                  {k.photo ? (
                    <img src={k.photo} alt={k.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    k.avatar
                  )}
                </div>
                <div style={{ padding: '25px 20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: 'var(--heading-color)', fontWeight: '800' }}>{k.name}</h4>
                  <p style={{ color: 'var(--primary-color)', fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>{k.branch}</p>
                </div>
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

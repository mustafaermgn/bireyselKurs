export default function Kurslar() {
      return (
        <div className="main-container">
          <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="container">
              <h1 style={{ margin: 0 }}>Tüm Kurslarımız</h1>
            </div>
          </section>
          <section className="section container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--primary-color)', borderRadius: '8px' }}>
                <h2 style={{ marginTop: 0 }}>YKS Hazırlık</h2>
                <p>Üniversiteye giriş sınavları için kapsamlı hazırlık programı.</p>
                <a href="/kurslar/yks" className="btn btn-outline" style={{marginTop: '20px', color: 'black'}}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--accent-teal)', borderRadius: '8px' }}>
                <h2 style={{ marginTop: 0 }}>LGS Hazırlık</h2>
                <p>Nitelikli liselere giriş için yeni nesil sorularla LGS hazırlık.</p>
                <a href="/kurslar/lgs" className="btn btn-outline" style={{marginTop: '20px', color: 'black'}}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--accent-red)', borderRadius: '8px' }}>
                <h2 style={{ marginTop: 0 }}>Ara Sınıf Etüt</h2>
                <p>9, 10 ve 11. sınıflar için okula destek ve sınava temel atma programı.</p>
                <a href="/kurslar/ara-sinif" className="btn btn-outline" style={{marginTop: '20px', color: 'black'}}>Detaylar</a>
              </div>
            </div>
          </section>
        </div>
      );
    }
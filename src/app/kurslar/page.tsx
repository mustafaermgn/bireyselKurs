export default function Kurslar() {
      return (
        <div className="main-container">
          <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="container">
              <h1 style={{ margin: 0 }}>Tüm Kurslarımız</h1>
            </div>
          </section>
          <section className="section container">
            <div className="grid grid-cols-3 grid-cols-mobile-2">
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--primary-color)' }}>
                <h2>YKS Hazırlık</h2>
                <p>Üniversiteye giriş sınavları için kapsamlı hazırlık programı.</p>
                <a href="/kurslar/yks" className="btn btn-outline" style={{marginTop: '20px'}}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--accent-teal)' }}>
                <h2>LGS Hazırlık</h2>
                <p>Nitelikli liselere giriş için yeni nesil sorularla LGS hazırlık.</p>
                <a href="/kurslar/lgs" className="btn btn-outline" style={{marginTop: '20px'}}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '30px', textAlign: 'center', borderTop: '4px solid var(--accent-red)' }}>
                <h2>Ara Sınıf Etüt</h2>
                <p>9, 10 ve 11. sınıflar için okula destek ve sınava temel atma programı.</p>
                <a href="/kurslar/ara-sinif" className="btn btn-outline" style={{marginTop: '20px'}}>Detaylar</a>
              </div>
            </div>
          </section>
        </div>
      );
    }
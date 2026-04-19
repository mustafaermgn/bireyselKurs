export default function Kurslar() {
      return (
        <div className="main-container">
          <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="container">
              <h1 style={{ margin: 0 }}>Tüm Kurslarımız</h1>
            </div>
          </section>
          <section className="section container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
              <div className="row-card" style={{ borderLeft: '6px solid var(--primary-color)' }}>

                <div style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0, marginBottom: '6px', fontSize: '1.4rem' }}>YKS Hazırlık</h2>
                  <p style={{ margin: 0, color: '#64748b' }}>Üniversiteye giriş sınavları için kapsamlı hazırlık programı.</p>
                </div>
                <a href="/kurslar/yks" className="btn btn-outline" style={{ flexShrink: 0, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Detaylar</a>
              </div>
              <div className="row-card" style={{ borderLeft: '6px solid var(--accent-teal)' }}>

                <div style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0, marginBottom: '6px', fontSize: '1.4rem' }}>LGS Hazırlık</h2>
                  <p style={{ margin: 0, color: '#64748b' }}>Nitelikli liselere giriş için yeni nesil sorularla LGS hazırlık.</p>
                </div>
                <a href="/kurslar/lgs" className="btn btn-outline" style={{ flexShrink: 0, color: 'var(--accent-teal)', borderColor: 'var(--accent-teal)' }}>Detaylar</a>
              </div>
              <div className="row-card" style={{ borderLeft: '6px solid var(--accent-red)' }}>

                <div style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0, marginBottom: '6px', fontSize: '1.4rem' }}>Ara Sınıf Etüt</h2>
                  <p style={{ margin: 0, color: '#64748b' }}>9, 10 ve 11. sınıflar için okula destek ve sınava temel atma programı.</p>
                </div>
                <a href="/kurslar/ara-sinif" className="btn btn-outline" style={{ flexShrink: 0, color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}>Detaylar</a>
              </div>
            </div>
          </section>
        </div>
      );
    }
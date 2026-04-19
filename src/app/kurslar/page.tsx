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
              <div className="card" style={{ padding: '32px 36px', display: 'flex', alignItems: 'center', gap: '28px', borderLeft: '6px solid var(--primary-color)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'rgba(241,97,1,0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0, marginBottom: '6px', fontSize: '1.4rem' }}>YKS Hazırlık</h2>
                  <p style={{ margin: 0, color: '#64748b' }}>Üniversiteye giriş sınavları için kapsamlı hazırlık programı.</p>
                </div>
                <a href="/kurslar/yks" className="btn btn-outline" style={{ flexShrink: 0, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '32px 36px', display: 'flex', alignItems: 'center', gap: '28px', borderLeft: '6px solid var(--accent-teal)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'rgba(45,163,151,0.1)', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0, marginBottom: '6px', fontSize: '1.4rem' }}>LGS Hazırlık</h2>
                  <p style={{ margin: 0, color: '#64748b' }}>Nitelikli liselere giriş için yeni nesil sorularla LGS hazırlık.</p>
                </div>
                <a href="/kurslar/lgs" className="btn btn-outline" style={{ flexShrink: 0, color: 'var(--accent-teal)', borderColor: 'var(--accent-teal)' }}>Detaylar</a>
              </div>
              <div className="card" style={{ padding: '32px 36px', display: 'flex', alignItems: 'center', gap: '28px', borderLeft: '6px solid var(--accent-red)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
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
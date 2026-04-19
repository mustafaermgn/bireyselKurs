import ApplicationButton from '@/components/ApplicationButton';

export default function LGS() {
      return (
        <div className="main-container">
          <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="container">
              <h1 style={{ margin: 0 }}>LGS Hazırlık</h1>
            </div>
          </section>
          <section className="section container text-center">
            <h2 style={{ color: 'var(--accent-teal)' }}>Nitelikli Liselere Açılan Kapı</h2>
            <p>8. Sınıf öğrencileri için yeni nesil sorulara tam uyumlu, analitik düşünme becerisini geliştiren özel eğitim programımızla LGS&apos;de fark yaratın.</p>
            <ApplicationButton style={{ marginTop: '20px' }}>Hemen Başvur</ApplicationButton>
          </section>
        </div>
      );
    }
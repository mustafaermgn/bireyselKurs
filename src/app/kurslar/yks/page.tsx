import ApplicationButton from '@/components/ApplicationButton';

export default function YKS() {
      return (
        <div className="main-container">
          <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="container">
              <h1 style={{ margin: 0 }}>YKS Hazırlık (TYT - AYT)</h1>
            </div>
          </section>
          <section className="section container text-center">
            <h2 style={{ color: 'var(--primary-color)' }}>Üniversite Hayallerinize Giden Yol</h2>
            <p>12. Sınıf ve Mezun grupları için yoğunlaştırılmış YKS hazırlık programımızla hedeflerinize emin adımlarla ilerleyin. Bol soru çözümü, Türkiye geneli denemeler ve birebir rehberlik desteği.</p>
            <ApplicationButton style={{ marginTop: '20px' }}>Hemen Başvur</ApplicationButton>
          </section>
        </div>
      );
    }
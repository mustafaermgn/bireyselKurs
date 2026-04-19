"use client";

export default function Hakkimizda() {
  return (
    <div className="main-container">
      {/* Page Header */}
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>Hakkımızda</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Anasayfa / Kurumsal / Hakkımızda</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 mobile-reverse responsive-gap" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">BİZ KİMİZ?</span>
              <h2 style={{ marginBottom: '20px' }}>Geleceğe Değer Katan<br/>Bir Eğitim Yuvası</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                Şırnak Silopi&apos;de yılların verdiği tecrübe ile eğitim sektöründe öncü olan Bireysel Kurs Merkezi, 
                öğrencilerini sadece sınavlara değil, hayata hazırlayan bir kuruluştur.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Alanında uzman, yenilikçi ve dinamik öğretmen kadromuzla, her öğrencinin bireysel farklılıklarını 
                göz önünde bulundurarak onlara özel çalışma programları hazırlıyoruz. Çeyrek asırlık tecrübemizle, binlerce öğrencimizi hayallerindeki üniversite ve liselere ulaştırmanın gururunu yaşıyoruz.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--heading-color)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>✔</span> 25 Yıllık Deneyim
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--heading-color)' }}>
                  <span style={{ color: 'var(--accent-teal)' }}>✔</span> Uzman Eğitim Kadrosu
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--heading-color)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>✔</span> Yüksek Başarı Oranı
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 mobile-mt" style={{ gap: '30px' }}>
              <div className="card" style={{ padding: '30px', borderLeft: '4px solid var(--accent-teal)' }}>
                <h3 style={{ color: 'var(--accent-teal)' }}>Vizyonumuz</h3>
                <p style={{ margin: 0 }}>
                  Bölgenin en prestijli ve en başarılı eğitim kurumu olmak, modern eğitim yaklaşımlarını kullanarak öğrencilerimizi Türkiye&apos;nin en iyi üniversitelerine ve liselerine yerleştirmek.
                </p>
              </div>
              <div className="card" style={{ padding: '30px', borderLeft: '4px solid var(--primary-color)' }}>
                <h3 style={{ color: 'var(--primary-color)' }}>Misyonumuz</h3>
                <p style={{ margin: 0 }}>
                  Atatürk ilke ve inkılaplarına bağlı, çağdaş, analitik düşünebilen, özgüveni yüksek, ahlaki değerlere sahip ve geleceği şekillendirecek başarılı bireyler yetiştirmek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

"use client";
import ApplicationButton from '@/components/ApplicationButton';
import { useAppStore } from '@/lib/store';

export default function LGS() {
  const { data: ayarlar, isLoaded } = useAppStore('ayarlar');

  if (!isLoaded) return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>;

  return (
    <div className="main-container">
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>{ayarlar?.lgsBaslik || 'LGS Hazırlık'}</h1>
        </div>
      </section>
      <section className="section container text-center">
        <h2 style={{ color: 'var(--primary-color)' }}>Geleceğinize Doğru Bir Başlangıç</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          {ayarlar?.lgsAciklama || '8. Sınıf öğrencilerine özel, yeni nesil sorularla tam uyumlu LGS hazırlık programımız.'}
        </p>
        <ApplicationButton style={{ marginTop: '30px' }}>Hemen Başvur</ApplicationButton>
      </section>
    </div>
  );
}
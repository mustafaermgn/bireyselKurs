"use client";
import ApplicationButton from '@/components/ApplicationButton';
import { useAppStore } from '@/lib/store';

export default function DilOkulu() {
  const { data: ayarlar, isLoaded } = useAppStore('ayarlar');

  if (!isLoaded) return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>;

  return (
    <div className="main-container">
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>{ayarlar?.dilOkuluBaslik || 'Yabancı Dil Eğitimleri'}</h1>
        </div>
      </section>
      <section className="section container text-center">
        <h2 style={{ color: 'var(--primary-color)' }}>Dünya Dillerini Keşfedin</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          {ayarlar?.dilOkuluAciklama || 'Genel İngilizce, Kids, Teenage ve Sınav İngilizcesi programlarımızla dünya dillerini kalıcı öğrenin.'}
        </p>
        <ApplicationButton style={{ marginTop: '30px' }}>Hemen Başvur</ApplicationButton>
      </section>
    </div>
  );
}
"use client";
import { useAppStore } from '@/lib/store';

export default function CallToAction() {
  const { data: ayarlar } = useAppStore('ayarlar');

  return (
    <section style={{ background: '#012237', padding: '60px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '10%', top: '20%', width: '120px', height: '120px', borderRadius: '50%', background: '#f16101', opacity: '0.15', filter: 'blur(20px)' }}></div>
      <div style={{ position: 'absolute', right: '10%', bottom: '20%', width: '180px', height: '180px', borderRadius: '50%', background: '#2da393', opacity: '0.15', filter: 'blur(30px)' }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ marginBottom: '20px', fontWeight: '800', color: 'white', margin: '0 0 20px 0' }}>
          {ayarlar?.ctaBaslik || 'Kaydınızı Şimdi Yaptırın'}
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 30px auto', lineHeight: '1.8' }}>
          {ayarlar?.ctaAciklama || 'Erken kayıt avantajlarından yararlanmak ve sınırlı kontenjanımızda yerinizi ayırtmak için hemen iletişime geçin.'}
        </p>
        <button 
          onClick={() => window.dispatchEvent(new Event('open-application-modal'))} 
          style={{ 
            padding: '15px 40px', 
            fontSize: '1rem', 
            background: '#f16101', 
            color: 'white',
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer', 
            fontWeight: '600',
            boxShadow: '0 8px 25px rgba(241,97,1,0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.background = '#e84e00';
            target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.background = '#f16101';
            target.style.transform = 'translateY(0)';
          }}
        >
          Ön Başvuru Formu
        </button>
      </div>
    </section>
  );
}

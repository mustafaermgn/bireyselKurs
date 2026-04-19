"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const pathname = usePathname();
  const { data: ayarlar, isLoaded } = useAppStore('ayarlar');

  // Don't show footer on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer style={{ background: '#1e293b', color: 'white', padding: '60px 0 30px 0', marginTop: '80px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Logo & Description */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              {isLoaded && ayarlar?.logo ? (
                <>
                  <img src={ayarlar.logo} alt="SİLOPİ BİREYSEL KURS" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginBottom: '15px' }} />
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', fontWeight: '800' }}>Silopi Bireysel Kurs</h3>
                </>
              ) : (
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', fontWeight: '800' }}>Silopi Bireysel Kurs</h3>
              )}
            </div>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
              25 yıllık eğitim deneyimiyle Şırnak Silopi'de YKS, LGS ve Yabancı Dil eğitiminde en iyi hizmeti sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-color)' }}>Hızlı Linkler</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  Kurumsal
                </Link>
              </li>
              <li>
                <Link href="/kurslar" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  Kurslar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-color)' }}>Kurslarımız</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/kurslar/yks" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  YKS Hazırlık
                </Link>
              </li>
              <li>
                <Link href="/kurslar/lgs" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  LGS Hazırlık
                </Link>
              </li>
              <li>
                <Link href="/dil-okulu" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  Dil Okulu & YDS
                </Link>
              </li>
              <li>
                <Link href="/kurslar/ara-sinif" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                  Ara Sınıflar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-color)' }}>İletişim</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ayarlar?.telefon && (
                <li>
                  <a href={`tel:${ayarlar.telefon}`} style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                    <span>📞</span> {ayarlar.telefon}
                  </a>
                </li>
              )}
              {ayarlar?.email && (
                <li>
                  <a href={`mailto:${ayarlar.email}`} style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}>
                    <span>✉️</span> {ayarlar.email}
                  </a>
                </li>
              )}
              {ayarlar?.adres && (
                <li style={{ color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span>📍</span>
                  <span>{ayarlar.adres}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #334155', margin: '40px 0', opacity: 0.5 }}></div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Silopi Bireysel Kurs Merkezi. Tüm hakları saklıdır.
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem' }}>
            Tasarım ve Geliştirme: <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Web Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

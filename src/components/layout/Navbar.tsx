"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: ayarlar, isLoaded } = useAppStore('ayarlar');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class for styling when not at top
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide/Show logic based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setHidden(true);
      } else {
        // Scrolling up
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Admin routes should not show the public navbar
  if (pathname.startsWith('/admin')) return null;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${hidden ? 'header-hidden' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoaded && ayarlar?.logo && (
            <img src={ayarlar.logo} alt="SİLOPİ BİREYSEL KURS" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '16px', fontWeight: '800' }}>SİLOPİ BİREYSEL</span>
            <span style={{ fontSize: '14px', color: 'var(--primary-color)', fontWeight: '700' }}>KURS MERKEZİ</span>
          </div>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(7px, -8px)' : 'none' }}></span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Anasayfa</Link>
          <Link href="/hakkimizda" className={`nav-link ${pathname === '/hakkimizda' ? 'active' : ''}`}>Kurumsal</Link>
          <Link href="/kadro" className={`nav-link ${pathname === '/kadro' ? 'active' : ''}`}>Eğitim Kadrosu</Link>
          <Link href="/kurslar" className={`nav-link ${pathname === '/kurslar' ? 'active' : ''}`}>Kurslar</Link>
          <Link href="/basarilar" className={`nav-link ${pathname === '/basarilar' ? 'active' : ''}`}>Başarılarımız</Link>
          <Link href="/galeri" className={`nav-link ${pathname === '/galeri' ? 'active' : ''}`}>Galeri</Link>
          <Link href="/iletisim" className={`nav-link ${pathname === '/iletisim' ? 'active' : ''}`}>İletişim</Link>
          <a href="https://www.eysis.io/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 24px', boxShadow: '0 4px 14px rgba(241, 97, 1, 0.4)' }}>
            Öğrenci Girişi
          </a>
        </nav>
      </div>
    </header>
  );
}

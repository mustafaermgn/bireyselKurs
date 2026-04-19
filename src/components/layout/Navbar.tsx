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
        <Link href="/" className="logo">
          {isLoaded && ayarlar?.logo ? (
            <>
              <img src={ayarlar.logo} alt="SİLOPİ BİREYSEL KURS" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <span style={{ whiteSpace: 'nowrap' }}>Silopi Bireysel <span>Kurs</span></span>
            </>
          ) : (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-color)"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="var(--secondary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ whiteSpace: 'nowrap' }}>Silopi Bireysel <span>Kurs</span></span>
            </>
          )}
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

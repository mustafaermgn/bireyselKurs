"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { data: duyurular, isLoaded } = useAppStore('duyurular');
  const { data: kampanyalar } = useAppStore('kampanyalar');
  const { data: blogs } = useAppStore('blog');
  const { data: ayarlar, isLoaded: ayarlarLoaded } = useAppStore('ayarlar');
  const { data: basarilar } = useAppStore('basarilar');

  const [currentDuyuru, setCurrentDuyuru] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const successCarouselRef = useRef<HTMLDivElement>(null);
  const newsCarouselRef = useRef<HTMLDivElement>(null);

  // News auto-scroll cycle
  useEffect(() => {
    if (blogs && blogs.length > 1) {
      const interval = setInterval(() => {
        if (newsCarouselRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = newsCarouselRef.current;
          if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 20) {
            newsCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            newsCarouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [blogs]);

  // Success auto-scroll cycle
  useEffect(() => {
    if (basarilar && basarilar.length > 1) {
      const interval = setInterval(() => {
        if (successCarouselRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = successCarouselRef.current;
          if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 20) {
            successCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            successCarouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
          }
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [basarilar]);


  // Background Slider States
  const [bgIndex, setBgIndex] = useState(0);
  const [bgTouchStart, setBgTouchStart] = useState(0);
  const [bgTouchEnd, setBgTouchEnd] = useState(0);

  // Announcement cycle
  useEffect(() => {
    if (duyurular && duyurular.length > 1) {
      const interval = setInterval(() => {
        setCurrentDuyuru(prev => (prev + 1) % duyurular.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [duyurular]);

  // Hero Image auto-scroll cycle
  useEffect(() => {
    if (ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 1) {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
          }
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [ayarlarLoaded, ayarlar?.heroImages]);

  // Background auto-scroll cycle
  useEffect(() => {
    if (ayarlarLoaded && ayarlar?.heroArkaplanlar && ayarlar.heroArkaplanlar.length > 1) {
      const interval = setInterval(() => {
        setBgIndex(prev => (prev + 1) % ayarlar.heroArkaplanlar.length);
      }, 5000); // 5 seconds
      return () => clearInterval(interval);
    }
  }, [ayarlarLoaded, ayarlar?.heroArkaplanlar]);

  // Background swipe logic
  const handleBgTouchStart = (e: React.TouchEvent) => setBgTouchStart(e.targetTouches[0].clientX);
  const handleBgTouchMove = (e: React.TouchEvent) => setBgTouchEnd(e.targetTouches[0].clientX);
  const handleBgTouchEnd = () => {
    if (!bgTouchStart || !bgTouchEnd || !ayarlarLoaded || !ayarlar?.heroArkaplanlar) return;
    const distance = bgTouchStart - bgTouchEnd;

    // Ignore small swipes
    if (Math.abs(distance) < 50) return;

    if (distance > 50 && ayarlar?.heroArkaplanlar) {
      setBgIndex((prev) => (prev + 1) % ayarlar.heroArkaplanlar.length);
    }
    if (distance < -50 && ayarlar?.heroArkaplanlar) {
      setBgIndex((prev) => (prev - 1 + ayarlar.heroArkaplanlar.length) % ayarlar.heroArkaplanlar.length);
    }

    setBgTouchStart(0);
    setBgTouchEnd(0);
  };

  // Splash Screen & Popup logic
  useEffect(() => {
    // Only run this logic once on mount
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      // Show campaign popup 500ms after splash screen disappears
      setTimeout(() => {
        setShowCampaignPopup(true);
      }, 500);
    }, 1500); // Shorter splash screen (1.5s)

    return () => clearTimeout(splashTimer);
  }, []);

  const activeKampanyalar = kampanyalar?.filter((k: { active: boolean; name: string; discount: string; date: string }) => k.active) || [];

  return (
    <>
      {/* 1. Splash / Onboard Screen */}
      {showSplash && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeOut 0.4s ease 1.1s forwards' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes smoothReveal {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; visibility: visible; }
              to { opacity: 0; visibility: hidden; }
            }
          `}} />
          <div style={{ animation: 'smoothReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}>
            {ayarlar?.logo ? (
              <img src={ayarlar.logo} alt="Bireysel Kurs Logo" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
            ) : (
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                BKM
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Campaign Advertisement Popup */}
      {showCampaignPopup && activeKampanyalar.length > 0 && !showSplash && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(1, 34, 55, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)', animation: 'fadeIn 0.3s ease' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}} />
          <div style={{ background: 'white', width: '100%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <button
              onClick={() => setShowCampaignPopup(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.1)', border: 'none', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer', zIndex: 10, color: '#333' }}
              aria-label="Kapat"
            >
              ✕
            </button>
            <div style={{ background: 'var(--primary-color)', padding: '40px 30px', textAlign: 'center', color: 'white', position: 'relative' }}>
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🎁</div>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>Özel Fırsat!</h2>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '500' }}>{activeKampanyalar[0].name}</h3>
            </div>
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '10px' }}>
                Sınırlı süreliğine <strong>{activeKampanyalar[0].discount}</strong> indirim fırsatını kaçırmayın.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '30px' }}>
                Son Geçerlilik: {activeKampanyalar[0].date}
              </p>
              <button onClick={() => { setShowCampaignPopup(false); window.dispatchEvent(new Event('open-application-modal')); }} className="btn btn-primary" style={{ display: 'block', width: '100%', padding: '15px', fontSize: '1.1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                Hemen Başvur ve Fırsatı Yakala
              </button>
              <button onClick={() => setShowCampaignPopup(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', textDecoration: 'underline', marginTop: '15px', cursor: 'pointer', fontSize: '0.9rem' }}>
                Hayır, teşekkürler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        {/* Top Banner for Announcements */}
        {isLoaded && duyurular && duyurular.length > 0 && (
          <div style={{ background: 'var(--accent-red)', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.3s ease' }}>
            <span style={{ marginRight: '10px' }}>📢 {duyurular.length > 1 ? `DUYURULAR (${currentDuyuru + 1}/${duyurular.length}):` : 'YENİ DUYURU:'}</span>
            {duyurular[currentDuyuru]?.title} - {duyurular[currentDuyuru]?.date}
          </div>
        )}

        {/* Hero Section */}
        <section
          className="bg-navy"
          onTouchStart={handleBgTouchStart}
          onTouchMove={handleBgTouchMove}
          onTouchEnd={handleBgTouchEnd}
          style={{
            padding: '120px 0 160px 0',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Images Slider - Show only after ayarlar is loaded */}
          {ayarlarLoaded && ayarlar?.heroArkaplanlar && ayarlar.heroArkaplanlar.length > 0 && (
            <>
              {ayarlar.heroArkaplanlar.map((bg: string, idx: number) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: idx === bgIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    zIndex: 0
                  }}
                />
              ))}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(1, 34, 55, 0.85)', zIndex: 1 }}></div>
            </>
          )}

          <div className="floating-shape" style={{ position: 'absolute', right: '-100px', top: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '40px solid rgba(255,255,255,0.03)', zIndex: 2 }}></div>
          <div className="floating-shape" style={{ position: 'absolute', left: '-50px', bottom: '-50px', width: '250px', height: '250px', borderRadius: '50%', border: '25px solid rgba(241, 97, 1, 0.08)', animationDelay: '2s', zIndex: 2 }}></div>
          <div className="floating-shape" style={{ position: 'absolute', left: '40%', top: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-teal)', opacity: '0.1', filter: 'blur(30px)', zIndex: 2 }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="grid grid-cols-2 mobile-reverse" style={{ alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
                  {ayarlar?.heroUstBaslik || 'SİLOPİ BİREYSEL KURS MERKEZİ'}
                </span>
                <h1 className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '25px', lineHeight: '1.15', fontWeight: '800' }}>
                  {ayarlar?.heroAnaBaslik || 'Geleceğinizi Şansa Bırakmayın.'}
                </h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '45px', color: 'rgba(255,255,255,0.85)', maxWidth: '550px', lineHeight: '1.8' }}>
                  {ayarlar?.heroAciklama || "25 yıllık eğitim tecrübemizle Silopi'de YKS, LGS ve Yabancı Dil eğitiminde yeni bir sayfa açıyoruz."}
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="btn btn-primary" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>Ön Başvuru</button>
                  <Link href="/kurslar" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Kurslarımız</Link>
                </div>
              </div>

              <div style={{ position: 'relative' }} className="mobile-mt">
                <div className="hero-image-circle" style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div
                    ref={carouselRef}
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <style dangerouslySetInnerHTML={{
                      __html: `
                      .hero-image-circle div::-webkit-scrollbar { display: none; }
                    `}} />
                    {ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 0 ? (
                      ayarlar.heroImages.map((img: string, idx: number) => (
                        <div key={idx} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', position: 'relative' }}>
                          <img
                            src={img}
                            alt={`Bireysel Kurs Merkezi Kapak ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            draggable="false"
                          />
                        </div>
                      ))
                    ) : (
                      <div style={{ flex: '0 0 100%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f16101 0%, #ff8c42 100%)', color: 'white', fontSize: '4rem' }}>
                        {ayarlarLoaded ? '📸' : '⏳'}
                      </div>
                    )}
                  </div>

                  {/* Manual Navigation Buttons for Desktop */}
                  {ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 1 && (
                    <>
                      <button
                        onClick={() => carouselRef.current?.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' })}
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'var(--primary-color)', fontSize: '20px', boxShadow: 'var(--shadow-md)' }}
                      >
                        &larr;
                      </button>
                      <button
                        onClick={() => carouselRef.current?.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' })}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'var(--primary-color)', fontSize: '20px', boxShadow: 'var(--shadow-md)' }}
                      >
                        &rarr;
                      </button>
                    </>
                  )}
                </div>
                <div className="card mobile-hide glass-badge floating-shape" style={{ position: 'absolute', bottom: '30px', left: '-30px', padding: '20px 25px', width: 'auto', zIndex: 10, animationDelay: '1s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '26px', boxShadow: '0 5px 15px rgba(45, 163, 151, 0.4)' }}>🏆</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>25 Yıllık</h4>
                      <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>Köklü Deneyim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overlapping Info Boxes */}
        <section style={{ position: 'relative', zIndex: 20, marginTop: '-80px', paddingBottom: '30px' }}>
          <div className="container">
            <div className="info-boxes-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--accent-teal)', borderBottom: '6px solid var(--accent-teal)' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu1Baslik || 'Uzman Kadro'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu1Aciklama || 'Alanında deneyimli kadromuzla yanınızdayız.'}</p>
              </div>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--primary-color)', borderBottom: '6px solid var(--primary-color)', animationDelay: '0.5s' }}>
                <div style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu2Baslik || 'Hedef Odaklı'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu2Aciklama || 'Öğrencilerimizi hedeflerine adım adım ulaştırıyoruz.'}</p>
              </div>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--accent-purple)', borderBottom: '6px solid var(--accent-purple)', animationDelay: '1s' }}>
                <div style={{ color: 'var(--accent-purple)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu3Baslik || 'Gelişim Takibi'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu3Aciklama || 'Düzenli analizlerle gelişiminizi anlık ölçüyoruz.'}</p>
              </div>

            </div>
          </div>
        </section>



        {/* Events / Posts Section */}
        {blogs && blogs.length > 0 && (
          <section className="bg-alt" style={{ padding: '60px 0' }}>
            <div className="container">
              <div className="text-center" style={{ marginBottom: '40px' }}>
                <span className="section-subtitle" style={{ background: 'white', display: 'inline-block', padding: '5px 15px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>HABERLER</span>

              </div>

              <div 
                ref={newsCarouselRef}
                style={{ 
                  display: 'flex', 
                  gap: '30px', 
                  overflowX: 'auto', 
                  scrollSnapType: 'x mandatory', 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none', 
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: '20px',
                  margin: '0 -15px',
                  padding: '10px 15px 30px 15px'
                }}
              >
                {blogs.map((b: any) => (
                  <div key={b.id} className="card course-card" style={{ flex: '0 0 320px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, border: 'none', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <div style={{ height: '220px', backgroundColor: '#e2e8f0', position: 'relative', overflow: 'hidden' }}>
                      {b.photo ? (
                        <img src={b.photo} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        {b.date}
                      </div>
                    </div>
                    <div style={{ padding: '35px 30px', flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
                      <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--heading-color)', fontWeight: '800', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.title}</h4>
                      <p style={{
                        margin: 0,
                        color: '#64748b',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {b.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Courses Section */}
        <section className="bg-alt" style={{ padding: '60px 0', borderTop: '1px solid #f1f5f9' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle" style={{ background: 'white', display: 'inline-block', padding: '10px 25px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>EĞİTİM PROGRAMLARI</span>
            </div>

            <div className="grid grid-cols-4" style={{ gap: '30px', paddingBottom: '20px' }}>

              {/* Card 1: LGS */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-teal)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>

                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(45, 163, 151, 0.1)', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    <path d="M8 7h6"></path><path d="M8 11h8"></path>
                  </svg>
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/lgs" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>LGS Hazırlık</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Sınav formatına uygun, yeni nesil soru teknikleriyle donatılmış özel LGS hazırlık programı (5, 6, 7 ve 8. Sınıflar).
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/lgs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-teal)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 2: YKS */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--primary-color)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>

                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(241, 97, 1, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/yks" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>YKS Hazırlık</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Üniversite hayalinize ulaşmanız için kapsamlı konu anlatımları ve Türkiye geneli deneme sınavları.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/yks" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 3: Dil Okulu */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-purple)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>

                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(124, 75, 192, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/dil-okulu" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>Dil Okulu & YDS</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Genel İngilizce, Kids, Teenage ve Sınav İngilizcesi programlarımızla dünya dillerini kalıcı öğrenin.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/dil-okulu" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 4: Ara Sınıflar */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-red)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>

                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/ara-sinif" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>9. 10. 11. Sınıflar</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Okul derslerine destek ve YKS&apos;ye güçlü bir temel için özel ara sınıf etüt programları.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/ara-sinif" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Gurur Tablomuz (Başarılarımız) */}
        {basarilar && basarilar.length > 0 && (
          <section className="bg-white" style={{ padding: '80px 0' }}>
            <div className="container">
              <div className="text-center" style={{ marginBottom: '50px' }}>
                <span className="section-subtitle" style={{ background: '#f1f5f9', display: 'inline-block', padding: '10px 25px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>GURUR TABLOMUZ</span>
                <h2 className="section-title" style={{ marginTop: '15px' }}>Öğrenci Başarılarımız</h2>
              </div>

              <div 
                ref={successCarouselRef}
                style={{ 
                  display: 'flex', 
                  gap: '25px', 
                  overflowX: 'auto', 
                  scrollSnapType: 'x mandatory', 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none', 
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: '20px',
                  margin: '0 -15px',
                  padding: '10px 15px 30px 15px'
                }}
              >
                <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
                {basarilar.map((b: any) => (
                  <div key={b.id} className="card" style={{ flex: '0 0 280px', scrollSnapAlign: 'start', padding: '30px 20px', textAlign: 'center', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#f8fafc', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      {b.photo ? (
                        <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '3rem' }}>🎓</span>
                      )}
                    </div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: 'var(--heading-color)', fontWeight: '800' }}>{b.name}</h4>
                    <span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(241, 97, 1, 0.1)', color: 'var(--primary-color)', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
                      {b.exam} - {b.year}
                    </span>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: '1.5' }}>{b.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="floating-shape" style={{ position: 'absolute', left: '10%', top: '20%', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary-color)', opacity: '0.15', filter: 'blur(20px)' }}></div>
          <div className="floating-shape" style={{ position: 'absolute', right: '10%', bottom: '20%', width: '180px', height: '180px', borderRadius: '50%', background: 'var(--accent-teal)', opacity: '0.15', filter: 'blur(30px)', animationDelay: '3s' }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: '3.2rem', marginBottom: '25px', fontWeight: '800' }}>{ayarlar?.ctaBaslik || 'Kaydınızı Şimdi Yaptırın'}</h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '45px', color: 'rgba(255,255,255,0.85)', maxWidth: '750px', margin: '0 auto 40px auto', lineHeight: '1.8' }}>
              {ayarlar?.ctaAciklama || 'Erken kayıt avantajlarından yararlanmak ve sınırlı kontenjanımızda yerinizi ayırtmak için hemen iletişime geçin.'}
            </p>
            <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="btn btn-primary" style={{ padding: '18px 45px', fontSize: '18px', boxShadow: '0 8px 25px rgba(241,97,1,0.4)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              Ön Başvuru Formu
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
